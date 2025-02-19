const key_currency = {
    "en-US":"USD",
    "id-ID":"IDR",
    "de-DE":"EUR"
} as const

export const FormatMoney = (value:string,currency:keyof typeof key_currency="id-ID"):string=>{
    const val = parseFloat(value)
    if(isNaN(val)) return "Value should be number"
    const result = new Intl.NumberFormat(currency,{
        style:'currency',
        currency:key_currency[currency],
        minimumFractionDigits:0,
        maximumFractionDigits:0
    }).format(val).replace(/\s/g,'')
    return result
}


type DateFormatTypes={
    month?: "numeric" | "2-digit" | "long" | "short" | "narrow"
    day?: "numeric" | "2-digit"
    year?: "numeric" | "2-digit"
}

export const FormatDate = (date:string | Date,format:DateFormatTypes={month:'short',day:'2-digit',year:'numeric'}):string=>{
    const parseDate = new Date(date)
    if(isNaN(parseDate.getTime())) return "Unsupported Date Format"
    const result = new Intl.DateTimeFormat('en-US',format).format(parseDate).replace(',','')
    return result
}

