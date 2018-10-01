function onLoad () {
  initMapboxGL();
  loadMap(onCategoriesChanged);
  handleCategoriesSelected();
}

function onCategoriesChanged (categories) {
  const categoriesWidget = document.getElementById('neighbourhoods');
  const data = categories.map((category) => {
    const { x, y } = category;
    return {
      name: x,
      value: y
    };
  });
  categoriesWidget.categories = data;
}

// Event handling
function handleCategoriesSelected () {
  const categoriesWidget = document.getElementById('neighbourhoods');
  categoriesWidget.addEventListener('categoriesSelected', (event) => {
    filterNeighbourhood(event.detail);
  });
}

// Getting the filter
function filterNeighbourhood (neighbourhoods) {
  if (neighbourhoods.length > 0) {
    const formattedData = neighbourhoods.map((neighbourhood) => {
      return `'${neighbourhood}'`;
    });
    neighbourhoodFilter = `$neighbourhood_group in [${formattedData.join(',')}]`;
  } else {
    neighbourhoodFilter = '';
  }
  applyFilter(neighbourhoodFilter);
}

// Applying filter to viz
function applyFilter(neighbourhoodFilter) {
  const color = 'rgb(0,0,255)';
  const opacity = '0.25';
  let colorExp = `opacity(${color}, ${opacity})`;

  if (!viz) {
    return;
  }

  if (neighbourhoodFilter) {
    colorExp = `opacity(${color}, ${neighbourhoodFilter} * ${opacity})`;
  }
  viz.color.blendTo(colorExp);
}


window.onload = onLoad;
