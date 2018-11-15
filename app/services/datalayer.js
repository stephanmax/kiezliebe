export const getOSMData = query => fetch(`/search?q=${query}`).then(res => res.json())
