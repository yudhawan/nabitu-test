import React from 'react'
import style from './ToastComponent.module.scss'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ErrorIcon from '@mui/icons-material/Error';
interface ToastComponentType{
    status: string | "success"|"error",
    title: string
    desc?:string
}
function ToastComponent(prop:ToastComponentType) {
    console.log(style[prop.status])
  return (
    <div className={`${style.main} ${style[prop.status]}`}>
        {
            prop.status==='success'&&<CheckBoxIcon sx={{color:'#34D399'}} />
        }
        {
            prop.status==='error'&&<ErrorIcon sx={{color:'#b91c1c'}}/>
        }
        <div className='flex flex-col gap-2'>
            <span className={`bold-base ${prop.status==='success'?'text-[#004434]':'text-red-700'}`}>{prop.title}</span>
            {prop.desc&&<span className={`normal-base ${prop.status==='success'?'text-[#637381]':'text-red-500'} `}>{prop.desc}</span>}
        </div>
    </div>
  )
}

export default ToastComponent