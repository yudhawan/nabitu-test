import React, { ReactNode, useEffect } from 'react'
import style from './InputComponent.module.scss'
import { FormControl, InputAdornment, MenuItem, OutlinedInput, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { input_type } from '@/constants/input_type'
import { useFormContext, Controller, useWatch } from 'react-hook-form'
import dayjs, { Dayjs } from 'dayjs'

type OptionsType = {
  value: string
  label: string
}

type InputComponentType = {
  required?: boolean
  label?: string
  icon?: {
    position: 'start' | 'end'
    src: string | ReactNode
  }
  type?: 'dropdown' | input_type | 'currency'
  options?: OptionsType[] | string[]
  width?: number
  placeholder: string
  name: string
  error?: boolean
  prefix?: string
  currencySymbol?: string // NEW: Currency symbol for currency inputs
}

function formatNumberWithThousandSeparator(value: string) {
  return value?.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

function InputComponent({
  type = 'text',
  label,
  required = false,
  icon,
  options,
  width,
  placeholder,
  name,
  error,
  prefix,
  currencySymbol = 'Rp'
}: InputComponentType) {
  const { control, setValue } = useFormContext()
  const fieldValue = useWatch({ control, name }) || ''

  useEffect(() => {
    if (prefix && !fieldValue.startsWith(prefix)) {
      setValue(name, `${prefix}${fieldValue.replace(prefix, '')}`, { shouldValidate: true })
    }
  }, [fieldValue, prefix, setValue, name])

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/[^0-9]/g, '') // Remove non-numeric characters
    const formattedValue = formatNumberWithThousandSeparator(rawValue)
    setValue(name, formattedValue, { shouldValidate: true })
  }

  return (
    <div style={{ width: width ? `${width}px` : '100%' }} className={`${style.main}`}>
      {name && (
        <span className="semi-sm">
          {name} {required && <span className="text-red-500">*</span>}
        </span>
      )}
      {type !== 'dropdown' && type !== 'date' && !icon?.position && type !== 'currency' && (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={error}
              label={label}
              type={type === 'number' ? 'text' : type}
              placeholder={placeholder}
              fullWidth
            />
          )}
        />
      )}
      {type === 'currency' && (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <OutlinedInput
                {...field}
                startAdornment={<InputAdornment position="start">{currencySymbol}</InputAdornment>}
                label={label}
                placeholder={placeholder}
                error={error}
                onChange={handleNumberChange}
                value={formatNumberWithThousandSeparator(field.value)}
              />
            </FormControl>
          )}
        />
      )}
      {icon?.position && type !== 'dropdown' && type !== 'date' && (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <OutlinedInput
                {...field}
                startAdornment={<InputAdornment position={icon?.position}>{icon?.src}</InputAdornment>}
                label={label}
                placeholder={placeholder}
                error={error}
              />
            </FormControl>
          )}
        />
      )}
      {type === 'dropdown' && (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <TextField {...field} select fullWidth defaultValue="default" error={error}>
              {placeholder && (
                <MenuItem value="default" disabled>
                  {placeholder}
                </MenuItem>
              )}
              {options?.map((option, i) => (
                <MenuItem key={i} value={typeof option === 'string' ? option : option.value}>
                  {typeof option === 'string' ? option : option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      )}
      {type === 'date' && (
        <Controller
          name={name}
          control={control}
          render={({ field:{onChange,value} }) => (
            <DatePicker 
            className={`${error ? style.datepickerError : ''}`}
            value={value ? dayjs(value) : null} // Convert stored value to Day.js
            onChange={(date: Dayjs | null) => onChange(date ? date.toISOString() : '')} />
          )}
        />
      )}
    </div>
  )
}

export default InputComponent
