import { h, Component } from 'preact'
import Leaflet from 'leaflet'

import 'leaflet/dist/leaflet.css'

export default class MapLeaflet extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.map = Leaflet.map('map')

    this.markerIcon = Leaflet.icon({
      iconUrl: '../assets/img/marker.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    })

    Leaflet.tileLayer('https://tiles4-bc7b4da77e971c12cb0e069bffcf2771.skobblermaps.com/TileService/tiles/2.0/01021113210/0/{z}/{x}/{y}.{ext}{r}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      minZoom: 3,
      maxZoom: 18,
      ext: 'png'
    }).addTo(this.map)

    this.map.locate({
      setView: true,
      maxZoom: 16
    })

    this.map.on('locationfound', (e) => {
      const radius = e.accuracy / 2
      Leaflet.circle(e.latlng, { radius }).addTo(this.map)
    })

    this.map.on('locationerror', () => {
      this.map.setView([53.5313392, 9.9475252], 12)
    })
  }

  componentDidUpdate({coordinates: oldCoords}) {
    const {coordinates: newCoords} = this.props
    if (!oldCoords || oldCoords[0] != newCoords[0] || oldCoords[1] != newCoords[1]) {
      this.map.setView(newCoords)
      if (!this.search) {
        this.search = Leaflet.marker(newCoords, { icon: this.markerIcon }).addTo(this.map)
      }
      else {
        this.search.setLatLng(newCoords)
      }
    }
  }

  render() {
    return <div id="map"></div>
  }
}
