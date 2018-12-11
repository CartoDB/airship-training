function onLoad () {
  initMapboxGL();
  loadMap(onCategoriesChanged);
}

function onCategoriesChanged (categories) {
  const categoriesWidget = document.getElementById('neighbourhoods');
  const data = categories.map((category) => {
    // We need to map { x, y } (the format returned by VL) to { name, value } (the format needed by Airship)
    const { x, y } = category;
    return {
      name: x,
      value: y
    };
  });
  categoriesWidget.categories = data;
}

window.onload = onLoad;