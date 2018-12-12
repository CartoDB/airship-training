let viz;
let account = {
  username: 'cartovl',
  apiKey: 'default_public',
  dataset: 'ny_listings'
};

function initMapboxGL () {
  map = new mapboxgl.Map({
    container: 'map',
    style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
    center: [-74, 40.7128],
    zoom: 10,
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

  const source = new carto.source.SQL( `SELECT * from ${dataset} WHERE price < 500`);
  viz = new carto.Viz(`
    width: 8,
    color: opacity(rgb(0, 0, 255), 0.35),
    strokeWidth: 0,
    @categories: viewportHistogram($neighbourhood_group),
    @roomType: $room_type
  `);

  layer = new carto.Layer(dataset, source, viz);
  layer.addTo(map);
  layer.on('updated', () => {
    const categories = layer.viz.variables.categories.value;
    categoriesCb && categoriesCb(categories);
  });
}
