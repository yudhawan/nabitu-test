import React, { useContext, useEffect, useRef, useState } from 'react'
import style from './HeaderComponent.module.scss'
import { AppMainContext } from '@/hooks/AppMainContext'
import { AppMainContextType } from '@/libs/types/AppMainContextType'
import { Avatar, Box, IconButton, Stack, Switch, Typography } from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
function HeaderComponent() {
  const headerRef=useRef<HTMLDivElement|null>(null)
  const [darkMode, setDarkMode] = useState(false)
  const context = useContext(AppMainContext) as AppMainContextType
  useEffect(()=>{
    if (headerRef.current) context?.set_header_height?.(headerRef.current.offsetHeight)
  },[context?.screen_window,headerRef])
  return (
    <div ref={headerRef} style={{left:`${context?.sidebar_weight}px`}} className={style.main}>
        <div className='flex gap-7'>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          height={1}
        >
          {/* Left: Toggle Switch */}
          <Switch
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            sx={{ '& .MuiSwitch-thumb': { backgroundColor: darkMode ? '#000' : '#ddd' },marginRight:'12px' }}
          />

          {/* Center: Icons */}
          <Stack direction="row" alignItems="center" marginRight={4}>
            {/* Notification Icon */}
            <Box sx={{ position: 'relative' }}>
              <IconButton>
                <NotificationsNoneIcon />
              </IconButton>
            </Box>
            <Box sx={{ position: 'relative' }}>
              <IconButton>
                <ChatBubbleOutlineIcon />
              </IconButton>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  bgcolor: 'red',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: 6,
                  right: 6,
                }}
              />
            </Box>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box>
              <Typography fontWeight="bold" className='text-black'>John Doe</Typography>
              <Typography fontSize={12} color="gray">Verified Member</Typography>
            </Box>
            <Avatar
              src="https://i.pravatar.cc/300"
              sx={{ width: 40, height: 40 }}
            />
            <KeyboardArrowDownIcon sx={{color:'#768490'}} />
          </Stack>
        </Stack>`
        </div>
    </div>
  )
}

export default HeaderComponent