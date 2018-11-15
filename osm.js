const Axios = require('axios')

const baseUrl = 'https://photon.komoot.de/api/'

module.exports = async ({q, limit}) => {
  try {
    const response = await Axios.get(`${baseUrl}?q=${encodeURIComponent(q)}&limit=${encodeURIComponent(limit)}`)
    return Promise.resolve(response.data)
  }
  catch (error) {
    return Promise.reject(error)
  }
}
