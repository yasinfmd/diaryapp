import {useState} from "react"
import {emailValidator} from "../utils/appvalidator";

function useInput(initialVal, validation, defaultvalidation) {
    const [value, setValue] = useState(initialVal)
    const [validate, setValidate] = useState(defaultvalidation ? defaultvalidation : false)
    const reset = () => {
        setValue(initialVal)
    }
    const bind = {
        value: value,
        onChange: (e) => {
            if (validation(e.target.value)) {
                setValidate(true)
            } else {
                setValidate(false)
            }
            setValue(e.target.value)
        }
    }
    return [value, bind, reset, validate]
}

export default useInput
