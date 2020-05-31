const header = (contenttype) => {
    let token = localStorage.getItem("token")
    if (!token) return {}
    token = token.replace(/\"/gi, '')
    const headers = {
        'Content-Type': contenttype ? contenttype : 'application/json',
        'Authorization': "Bearer " + token
    }
    return {headers: headers}

}
export default header
