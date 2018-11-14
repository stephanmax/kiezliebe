import 'leaflet/dist/leaflet.css'

import L from 'leaflet'

const map = L.map('map')

L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
}).addTo(map)

map.locate({
  setView: true,
  maxZoom: 16
})

map.on('locationfound', (e) => {
  const radius = e.accuracy / 2

  L.marker(e.latlng).addTo(map)
  L.circle(e.latlng, {
    radius
  }).addTo(map)
})

map.on('locationerror', () => {
  map.setView([53.5313392, 9.9475252], 12)
})
