import 'leaflet/dist/leaflet.css'

import { h, Component } from 'preact'
import L from 'leaflet'

export default class MapLeaflet extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.map = L.map('map')

    L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      ext: 'png'
    }).addTo(this.map)

    this.map.locate({
      setView: true,
      maxZoom: 16
    })

    this.map.on('locationfound', (e) => {
      const radius = e.accuracy / 2

      L.marker(e.latlng).addTo(this.map)
      L.circle(e.latlng, {
        radius
      }).addTo(this.map)
    })

    this.map.on('locationerror', () => {
      this.map.setView([53.5313392, 9.9475252], 12)
    })
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.search.geometry || prevProps.search.geometry.coordinates[0] != this.props.search.geometry.coordinates[0] || prevProps.search.geometry.coordinates[1] != this.props.search.geometry.coordinates[1]) {
      this.map.flyTo(this.props.search.geometry.coordinates.reverse())
    }
  }

  render() {
    return <div id="map"></div>
  }
}
