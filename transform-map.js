module.exports = {
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
}
