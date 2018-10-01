function onLoad () {
  initMapboxGL();
  loadMap(onCategoriesChanged, onAveragePriceChanged);
  handleCategoriesSelected();
  handleTypeSelector();
}

let neighbourhoodFilter = '';
let roomTypeFilter = '';

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

function onAveragePriceChanged (averagePrice) {
  const formulaTextElement = document.getElementById('formula-number');
  const formattedText = `${averagePrice.toFixed(2)}€`;
  formulaTextElement.textContent = formattedText;
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
  combineFilters(neighbourhoodFilter);
}

// Applying filter to viz
function applyFilter(filter) {
  const color = 'rgb(0,0,255)';
  const opacity = '0.25';
  let colorExp = `opacity(${color}, ${opacity})`;

  if (!viz) {
    return;
  }

  if (filter) {
    colorExp = `opacity(${color}, ${filter} * ${opacity})`;
  }
  viz.color.blendTo(colorExp);
}

// Event handling
function handleTypeSelector () {
  const entireSwitch = document.getElementById('entire-switch');
  const privateSwitch = document.getElementById('private-switch');
  const sharedSwitch = document.getElementById('shared-switch');

  entireSwitch.addEventListener('change', (event) => {
    filterByType();
  });
  privateSwitch.addEventListener('change', (event) => {
    filterByType();
  });
  sharedSwitch.addEventListener('change', (event) => {
    filterByType();
  });
}

function filterByType () {
  const entireSwitch = document.getElementById('entire-switch');
  const privateSwitch = document.getElementById('private-switch');
  const sharedSwitch = document.getElementById('shared-switch');
  const entireValue = "'Entire home/apt'";
  const privateValue = "'Private room'";
  const sharedValue = "'Shared room'";
  const filterValues = [];

  if (entireSwitch.checked) {
    filterValues.push(entireValue);
  }
  if (privateSwitch.checked) {
    filterValues.push(privateValue);
  }
  if (sharedSwitch.checked) {
    filterValues.push(sharedValue);
  }
  if (filterValues.length === 3) {
    roomTypeFilter = '';
  } else if (filterValues.length > 0) {
    roomTypeFilter = `$room_type in [${filterValues.join(',')}]`;
  } else {
    roomTypeFilter = `$room_type in ['wadus']`;
  }
  combineFilters(roomTypeFilter);
}

function combineFilters () {
  let combinedFilter = '';
  if (neighbourhoodFilter && roomTypeFilter) {
    combinedFilter = `${neighbourhoodFilter} and ${roomTypeFilter}`;
  } else if (neighbourhoodFilter) {
    combinedFilter = neighbourhoodFilter;
  } else if (roomTypeFilter) {
    combinedFilter = roomTypeFilter
  }
  applyFilter(combinedFilter);
}

window.onload = onLoad;
