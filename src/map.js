let viz; // Having viz outside the loadMap function will be convenient in a future step.
let account = {
  username: 'cartovl',
  apiKey: 'default_public',
  dataset: 'madrid_listings'
};

function initMapboxGL () {
  map = new mapboxgl.Map({
    container: 'map',
    style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
    center: [-3.7038, 40.4168],
    zoom: 11,
    scrollZoom: false,
    dragRotate: false,
    touchZoomRotate: false
  });

  const nav = new mapboxgl.NavigationControl({
    showCompass: false
  });
  map.addControl(nav, 'bottom-left');
}

function loadMap (categoriesCb) {
  const { username, apiKey, dataset } = account;
  carto.setDefaultAuth({
    user: username,
    apiKey: apiKey
  });

  const source = new carto.source.Dataset(dataset);
  viz = new carto.Viz(`
    width: 8,
    color: opacity(rgb(0,0,255), 0.25),
    strokeWidth: 0
  `);

  layer = new carto.Layer(dataset, source, viz);
  layer.addTo(map);
}
