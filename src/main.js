function onLoad () {
  initMapboxGL();
  loadMap();
  feedWidget();
}

function feedWidget () {
  const categoryWidget = document.querySelector('as-category-widget');
  categoryWidget.showHeader = true;
  categoryWidget.showClearButton = true;
  categoryWidget.useTotalPercentage = false;
  categoryWidget.visibleCategories = Infinity;
  categoryWidget.categories = [
    { name: 'Bars & Restaurants', value: 1000, color: '#FABADA' },
    { name: 'Fashion', value: 900 },
    { name: 'Grocery', value: 800 },
    { name: 'Health', value: 400 },
    { name: 'Shopping mall', value: 250 },
    { name: 'Transportation', value: 1000 },
    { name: 'Leisure', value: 760 }
  ];
}

window.onload = onLoad;
