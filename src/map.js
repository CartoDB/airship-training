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

function loadMap (categoriesCb, formulaCb, priceCb, legendCb) {
  const { username, apiKey, dataset } = account;
  carto.setDefaultAuth({
    user: username,
    apiKey: apiKey
  });

  const source = new carto.source.SQL( `SELECT * from ${dataset} WHERE price < 500`);
  viz = new carto.Viz(`
    width: 8,
    @ncolors: ramp($neighbourhood_group, vivid),
    color: opacity(@ncolors, 0.35),
    strokeWidth: 0,
    @categories: viewportHistogram($neighbourhood_group),
    @roomType: $room_type,
    @averagePrice: viewportAvg($price),
    @price: viewportHistogram($price, 10)
  `);

  layer = new carto.Layer(dataset, source, viz);
  layer.addTo(map);
  layer.on('updated', () => {
    const categories = layer.viz.variables.categories.value;
    const averagePrice = layer.viz.variables.averagePrice.value;
    const price = layer.viz.variables.price.value;
    const ramp = layer.viz.variables.ncolors.getLegendData();
    categoriesCb && categoriesCb(categories);
    formulaCb && formulaCb(averagePrice);
    priceCb && priceCb(price);
    legendCb && legendCb(ramp);
  });
}
