import React, { ReactNode, useContext } from 'react'
import style from './ContainerLabel.module.scss'
import { AppMainContext } from '@/hooks/AppMainContext'
import { AppMainContextType } from '@/libs/types/AppMainContextType'
type ContainerLabelType={
    label:string
    classname?:string
    children: ReactNode
}
function ContainerLabel({label,classname,children}:ContainerLabelType) {
    const {theme}=useContext(AppMainContext) as AppMainContextType
  return (
    <div 
    style={{backgroundColor:theme}} 
    className={`${style.main} ${classname}`}>
      <div className='flex py-[15px] px-[26px] border-b border-[#f0f3f7]'>
        <span className='semi-base text-[#1C2434]'>{label}</span>
      </div>
      {children}
    </div>
  )
}

export default ContainerLabel