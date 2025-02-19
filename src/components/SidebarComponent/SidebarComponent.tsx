import { AppMainContext } from '@/hooks/AppMainContext'
import { AppMainContextType } from '@/libs/types/AppMainContextType'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext, useEffect, useRef } from 'react'
import IconComponent from '../IconComponent/IconComponent'

function SidebarComponent() {
  const pathname = usePathname()
  const sidebarRef=useRef<HTMLDivElement|null>(null)
  const context = useContext(AppMainContext) as AppMainContextType
  useEffect(()=>{
    if (sidebarRef.current) context?.set_sidebar_weight?.(sidebarRef.current.offsetWidth)
  },[context?.screen_window,sidebarRef])
  return (
    <div ref={sidebarRef} className='max-w-[280px] w-full bg-[#1C2434] h-screen py-[27px] px-[38px] gap-[121px] flex flex-col'>
      <div className='flex gap-[11px] items-center'>
        <IconComponent src={'/logo.svg'} width={42} height={42} />
        <span className='text-[#F4F4F4] font-bold text-2xl'>InvoiceHub</span>
      </div>
      <div className='flex flex-col gap-[17px]'>
        <span className='text-[#9D9D9D] semi-sm'>Menu</span>
        <ul className='flex flex-col gap-8 list-none'>
          <li>
            <Link href={'/invoices/add'} className={`flex gap-2 items-center ${pathname==='/invoices/add'?`text-[#F4F4F4]`:'text-[#9D9D9D]'}`}>
              <IconComponent src={'/add.svg'} classname={`${pathname==='/invoices/add'?'icon-white':'icon-gray'}`} width={18} height={18} />
              <span className='semi-base'>Add Invoice</span>
            </Link>
          </li>
          <li>
            <Link href={'/invoices/list'} className={`flex gap-2 items-center ${pathname==='/invoices/list'?`text-[#F4F4F4]`:'text-[#9D9D9D]'}`}>
              <IconComponent src={'/list.svg'} classname={`${pathname==='/invoices/list'?'icon-white':'icon-gray'}`} width={18} height={18} />
              <span className='semi-base'>My Invoices</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SidebarComponent