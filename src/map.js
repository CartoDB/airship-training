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
