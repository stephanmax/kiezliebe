import { h, Component } from 'preact';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

export default class Map extends Component {

  constructor(props) {
    super(props);

    this.markerOptions = {
      color: '#f38eff',
      radius: 16,
      weight: 4
    };
  }

  updateSpots(spots) {
    this.spotsLayer.clearLayers();
    spots.forEach(spot => L.circle(spot, this.markerOptions).addTo(this.spotsLayer));
  }

  componentDidMount() {
    this.map = L.map('map', {
      center: [53.557008396861626, 9.944000244140627],
      zoom: 17,
      layers: [
        L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
          attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          minZoom: 3,
          maxZoom: 20
        })
      ]
    });

    this.spotsLayer = L.layerGroup().addTo(this.map);
    this.updateSpots(this.props.spots);

    this.map.on('click', (e) => {
      this.props.onClick(e.latlng);
    });
  }

  componentDidUpdate({spots}) {
    // const {coordinates: newCoords} = this.props;
    // if (!oldCoords || oldCoords[0] != newCoords[0] || oldCoords[1] != newCoords[1]) {
    //   this.map.setView(newCoords);
    //   if (!this.search) {
    //     this.search = Leaflet.marker(newCoords, { icon: this.markerIcon }).addTo(this.map);
    //   }
    //   else {
    //     this.search.setLatLng(newCoords);
    //   }
    // }
    if (this.props.spots !== spots) {
      this.updateSpots(this.props.spots);
    }
  }

  render() {
    return <div id="map"></div>;
  }
}
