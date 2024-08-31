mapboxgl.accessToken = mapToken;

  const map = new mapboxgl.Map({
      container: 'map',
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12',
      center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
      zoom: 9 // starting zoom
  });

  //console.log(coordinates);

  // Create a  Marker and add it to the map.
  const marker = new mapboxgl.Marker( { color: 'red', rotation: 45 })
  .setLngLat(listing.geometry.coordinates) //listing.geomatry.coordinates
  .setPopup(new mapboxgl.Popup({offset: 25 }).setHTML(
   `<h4>${listing.title}</h4><p>Exact Location provided after booking</p>`
  )
)
  .addTo(map);
