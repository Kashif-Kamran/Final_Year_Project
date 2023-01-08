const storeToken = (value) =>
{
    if (value)
    {
        sessionStorage.setItem('token',value)
    }
}

const getToken = () =>
{
    let access_token = sessionStorage.getItem('token')
    return access_token
}

const removeToken = () =>
{
    sessionStorage.removeItem('token')
}

export { storeToken,getToken,removeToken }