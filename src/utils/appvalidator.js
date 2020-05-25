export const emailValidator = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
}
export const passwordValidator = (password) => {
    if (password.trim().length < 8) return false
    return true
}

export const nameValidator = (name) => {
    if (name.trim().length < 3) return false
    return true
}

export const surnameValidator = (surname) => {
    if (surname.trim().length < 2) return false
    return true
}
