import { ValidationType } from "@/libs/types/InputValidation"

type InputWithValidationType={
    state:Record<string,any>
    setState?: React.Dispatch<React.SetStateAction<any>>
    validation: ValidationType[]
    setValidation: React.Dispatch<React.SetStateAction< ValidationType[]>>
}
export function InputWithValidation({state,setState,validation,setValidation}:InputWithValidationType):ValidationType[]{
    if(Object.keys(state).length) {
        let tmp:ValidationType[] = [...validation]
        Object.entries(state).map(([key,value])=>{
            if(!value) {
                let is_already_validated = validation.some(item=>item.key===key)
                if(!is_already_validated) tmp = [...(tmp as ValidationType[]), { key, msg: `${key} is required` }]
            }else{
                if(key==='Number'&&value.includes('INV-')&&value.length<5) tmp = [...(tmp as ValidationType[]), { key, msg: `${key} is required` }]
                else tmp = tmp.filter((item) =>
                    typeof item === "string" ? item !== key : item.key !== key
                  )
            }
        })
        setValidation(tmp)
        return tmp
    }
    return validation
}