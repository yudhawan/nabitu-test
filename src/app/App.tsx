'use client'
import HeaderComponent from '@/components/HeaderComponent/HeaderComponent'
import SidebarComponent from '@/components/SidebarComponent/SidebarComponent'
import AppMainProvider, { AppMainContext } from '@/hooks/AppMainContext';
import { AppMainContextType } from '@/libs/types/AppMainContextType';
import { notFound } from 'next/navigation';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useContext, useEffect } from 'react'
import style from './App.module.scss'
function App({children}:{children:React.ReactNode}) {
  
  return (
    <div className='w-full max-w-[1660px] flex h-screen bg-[#f1f5f9] m-auto'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SidebarComponent/>
        <div className={style.main}>
          <HeaderComponent/>
          <div style={{height:'-webkit-fill-available'}} className='grid place-content-center'>
            <AppMainProvider>
              {children}
            </AppMainProvider>
          </div>
        </div>
      </LocalizationProvider>
    </div>
  )
}

export default App