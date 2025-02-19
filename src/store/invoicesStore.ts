import { create } from 'zustand'
import {z} from 'zod'
import { AddInvoiceSchema } from '@/libs/schemas/AddInvoiceSchema'
import { persist } from 'zustand/middleware'
import { v4 as uuid } from 'uuid'
export type InvoiceType = z.infer<typeof AddInvoiceSchema>&{ID:string}

interface InvoiceInterface {
  invoices: InvoiceType[]
  status:string
  text:{
    title:string
    desc:string
  }
  resetStatus:()=>void
  addInvoice: (val: Omit<InvoiceType,'ID'>,isEdit?:boolean) => void
}

export const InvoiceStore = create<InvoiceInterface>()(persist(
    (set,get) => ({
    invoices: [],
    status:'',
    text:{title:'',desc:''},
    resetStatus:()=>set({status:'',
      text:{title:'',desc:''}}),
    addInvoice: (value,isEdit=false) => {
        let tmp = get().invoices
        if(tmp.some(a=>a.Number===value.Number)&&!isEdit) {
            set({ status: 'error', text: {title:'Invoice sudah pernah dimasukkan',desc:''} })
            return
        }
        else if(tmp.some(a=>a.Number===value.Number)&&isEdit){
            let newTmp = tmp.map(a=>{
                if(a.Number===value.Number) return { ...a, "Due Date":value['Due Date'],Amount:value.Amount,Name:value.Name,Number:value.Number,Status:value.Status}
                return a
            })
            set({invoices:newTmp,text:{title:'Invoice added successfully!',desc:`You can view and manage your invoice in the 'My Invoices' section.`},status:'success'})
            return
        }
        else {
            set({invoices:[...tmp,{...value,ID:uuid()}],text:{title:'Invoice added successfully!',desc:`You can view and manage your invoice in the 'My Invoices' section.`},status:'success'})
        }
    },
  
  }),
  {
    name: 'invoice-storage'
  }
))