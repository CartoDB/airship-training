function onLoad () {
  initMapboxGL();
  loadMap(onCategoriesChanged);
  handleCategoriesSelected();
}

let neighbourhoodFilter = '';

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

function handleCategoriesSelected () {
  const categoriesWidget = document.getElementById('neighbourhoods');
  categoriesWidget.addEventListener('categoriesSelected', async (event) => {
    const selected = await categoriesWidget.getSelectedCategories();
    filterNeighbourhood(selected);
  });
}

function filterNeighbourhood (neighbourhoods) {
  if (neighbourhoods.length > 0) {
    const formattedData = neighbourhoods.map((neighbourhood) => {
      // We need to pass the categories into apostrophes
      return `'${neighbourhood}'`;
    });
    neighbourhoodFilter = `$neighbourhood_group in [${formattedData.join(',')}]`;
  } else {
    neighbourhoodFilter = '';
  }
  applyFilter(neighbourhoodFilter);
}

function applyFilter(filter) {
  if (!viz) {
    return;
  }

  if (filter) {
    viz.filter.blendTo(filter, 0);
  } else {
    viz.filter.blendTo(1, 0);
  }
}

window.onload = onLoad;