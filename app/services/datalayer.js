export const getOSMData = query => fetch(`/search?q=${encodeURIComponent(query)}`).then(res => res.json())
