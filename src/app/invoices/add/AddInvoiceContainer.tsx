'use client'
import React, { useEffect, useState } from 'react'
import style from './AddInvoice.module.scss'
import InputComponent from '@/components/InputComponent/InputComponent'
import ContainerLabel from '@/components/ContainerLabel/ContainerLabel'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { Button } from '@mui/material'
import { ValidationType } from '@/libs/types/InputValidation'
import { InputWithValidation } from '@/utils/InputServices'
import { zodResolver } from '@hookform/resolvers/zod'
import { AddInvoiceSchema } from '@/libs/schemas/AddInvoiceSchema'
import { InvoiceStore, InvoiceType } from '@/store/invoicesStore'
import ToastComponent from '@/components/ToastComponent/ToastComponent'

function AddInvoiceContainer() {
  const form_provider = useForm({
    defaultValues:{
      Name:'',
      'Due Date':'',
      Status:'',
      Number:'',
      Amount:''
    },
    // resolver:zodResolver(AddInvoiceSchema)
  })
  const {addInvoice,status,text,resetStatus} = InvoiceStore()
  const {control}=form_provider
  const formValues = useWatch({ control })
  const [validation,setValidation]=useState<ValidationType[]>([])
  function onSubmit(data:any){
    const checkValidation = InputWithValidation({state:data,validation:validation,setValidation:setValidation})
    if(checkValidation.length) return
    addInvoice({
      "Due Date":data?.['Due Date'],
      Amount:data.Amount,
      Name:data.Name,
      Number:data.Number,
      Status:data.Status
    })
  }
  useEffect(()=>{
    if(status) resetStatus()
  },[])
  useEffect(() => {
    const updatedValidation = validation.filter(v => formValues[v.key as keyof typeof formValues]==='') 
    if (updatedValidation.length !== validation.length) {
      setValidation(updatedValidation)
    }
  }, [formValues, validation])
  return (
    <div className={style.main}>
      <FormProvider {...form_provider}>
        <ContainerLabel label='Invoice'>
          <form onSubmit={form_provider.handleSubmit(onSubmit)} className='flex flex-col justify-between'>
            <div className='flex gap-[35px]'>
              <div className='w-[538px] flex flex-col gap-[18px]'>
                <InputComponent required error={validation.some(a=>a.key==='Name')} name={"Name"} placeholder='Enter your invoice name' />
                <InputComponent required error={validation.some(a=>a.key==='Due Date')} name={"Due Date"} placeholder='DD/MM/YYYY' type='date' />
                <InputComponent required error={validation.some(a=>a.key==='Status')} name={"Status"} placeholder='Choose the status' type='dropdown' options={["Paid","Unpaid","Pending"]} />
              </div>
              <div className='w-[473px] flex flex-col gap-[18px]'>
                <InputComponent required error={validation.some(a=>a.key==='Number')} name={"Number"} placeholder='Enter your invoice number' prefix='INV-' />
                <InputComponent required error={validation.some(a=>a.key==='Amount')} name={"Amount"} type='currency' placeholder='Enter your invoice amount'  />
              </div>
            </div>
            <Button type='submit' className='bg-[#3C50E0] text-[#EFF4FB] w-[259px] self-end'>+ Add Invoice</Button>
          </form>
        </ContainerLabel>
      </FormProvider>
      {
        status&&<ToastComponent status={status} {...text}  />
      }
    </div>
  )
}

export default AddInvoiceContainer