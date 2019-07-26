import { h, Component } from 'preact'

import Map from './Map'
import { spotsToString, stringToSpots } from '../services/helper';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      spots: []
    };
  }

  componentDidMount() {
    const hash = window.location.hash.substr(1);
    if (hash) {
      this.setState({
        spots: stringToSpots(hash)
      });
    }
  }

  addSpot = (spot) => {
    this.setState({
      spots: [...this.state.spots, spot]
    });
    window.location.hash = `#${btoa(spotsToString(this.state.spots))}`;
  }

  render(props, { spots }) {
    return (
      <main>
        <Map spots={spots} onClick={this.addSpot} />
      </main>
    )
  }
}
