const header = () => {
    let token = localStorage.getItem("token")
    if (!token) return {}
    token = token.replace(/\"/gi, '')
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
    }
    return {headers: headers}

}
export default header
