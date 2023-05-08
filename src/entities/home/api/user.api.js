const getUserLocation = async () => {
    const response = await fetch('https://ipapi.co/json/')

    const data = await response.json()

    return data
}

export default {
    getUserLocation,
}
