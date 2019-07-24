export const getOSMData = query => fetch(`/.netlify/functions/search?q=${encodeURIComponent(query)}`).then(res => res.json())
