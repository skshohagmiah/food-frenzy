'use client'
import Map from 'react-map-gl';

function MapCompnent() {
  return (
    <Map
      mapboxAccessToken="pk.eyJ1Ijoic2hvaGFnLW1pYWgiLCJhIjoiY2xwcmt4MzA3MDl3cDJycDhiY2poOTFnbyJ9.aMMUoVKyevSez0wp8KDW_g"
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{width:'100%', }}
      mapStyle="mapbox://styles/shohag-miah/clprphjtk017001p96q473ams"
    />
  );
}

export default MapCompnent;