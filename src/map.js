let viz;
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

function loadMap (categoriesCb, formulaCb) {
  const { username, apiKey, dataset } = account;
  carto.setDefaultAuth({
    user: username,
    apiKey: apiKey
  });

  const source = new carto.source.Dataset(dataset);
  viz = new carto.Viz(`
    width: 8,
    color: opacity(rgb(0,0,255), 0.25),
    strokeWidth: 0,
    @categories: viewportHistogram($neighbourhood_group, 1, 12),
    @roomType: $room_type
    @averagePrice: viewportAvg($price)
  `);

  layer = new carto.Layer(dataset, source, viz);
  layer.addTo(map);
  layer.on('updated', () => {
    console.log(layer.viz.variables.averagePrice.value);
    const categories = layer.viz.variables.categories.value;
    const averagePrice = layer.viz.variables.averagePrice.value;
    categoriesCb && categoriesCb(categories);
    formulaCb && formulaCb(averagePrice);

  }); 
}
