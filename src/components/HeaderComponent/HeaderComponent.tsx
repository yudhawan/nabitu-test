import React, { useContext, useEffect, useRef } from 'react'
import style from './HeaderComponent.module.scss'
import { AppMainContext } from '@/hooks/AppMainContext'
import { AppMainContextType } from '@/libs/types/AppMainContextType'
function HeaderComponent() {
  const headerRef=useRef<HTMLDivElement|null>(null)
  const context = useContext(AppMainContext) as AppMainContextType
  useEffect(()=>{
    if (headerRef.current) context?.set_header_height?.(headerRef.current.offsetHeight)
  },[context?.screen_window,headerRef])
  return (
    <div ref={headerRef} style={{left:`${context?.sidebar_weight}px`}} className={style.main}>
        <div className='flex gap-7'>
            
        </div>
    </div>
  )
}

export default HeaderComponent