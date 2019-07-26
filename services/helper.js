export const spotsToString = (spots) => spots
  .map(({lat, lng}) => `${lat},${lng}`)
  .join(';');

export const stringToSpots = (string) => atob(string)
  .split(';')
  .map(latlng => latlng.split(','))
  .map(latlngArr => ({
    lat: latlngArr[0],
    lng: latlngArr[1]
  }));
