const Axios = require('axios');
const DataTransform = require('node-json-transform').DataTransform;

const baseUrl = 'https://photon.komoot.de/api/';
const map = {
  list: 'features',
  item: {
    id: 'properties.osm_id',
    latlng: 'geometry.coordinates',
    name: 'properties.name',
    country: 'properties.country',
    state: 'properties.state',
    city: 'properties.city',
    zipcode: 'properties.postcode',
    street: 'properties.street',
    housenumber: 'properties.housenumber',
    type: 'properties.osm_value'
  },
  operate: [{
    on: 'latlng',
    run: coordinates => [...coordinates].reverse()
  }]
};

const osm = async ({ q, limit }) => {
  try {
    const response = await Axios.get(`${baseUrl}?q=${encodeURIComponent(q)}&limit=${encodeURIComponent(limit)}`);
    return Promise.resolve(response.data);
  }
  catch (error) {
    return Promise.reject(error);
  }
}

exports.handler = (event, context, callback) => {
  osm(event.queryStringParameters)
    .then(res => callback(null, {
      statusCode: 200,
      body: JSON.stringify(DataTransform(res, map).transform())
    }))
    .catch(callback)
};
