export const emailValidator = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
}
export const passwordValidator = (password) => {
    if (password.trim().length < 8) return false
    return true
}

export const nameValidator = (name) => {
    const regex = /\d+/g;
    let matches = name.match(regex);
    if (name.trim().length < 3 || matches != null) return false
    return true
}

export const diarTitleValidator = (title) => {
    if (title.trim().length < 1) return false
    return true
}

export const diarContentValidator = (content) => {
    if (content.trim().length < 1) return false
    return true
}

export const surnameValidator = (surname) => {
    const regex = /\d+/g;
    let matches = surname.match(regex);
    if (surname.trim().length < 2 || matches != null) return false
    return true
}
