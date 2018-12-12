function onLoad () {
  changeToolbarColor();
  initMapboxGL();
  loadMap(onCategoriesChanged, onAveragePriceChanged, onPriceChanged, onLegendCalculated);
  handleCategoriesSelected();
  handleTypeSelector();
}

function rgbToHex (rgb) { 
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
};

let neighbourhoodFilter = '';
let roomTypeFilter = '';
let ramp = '';

function onCategoriesChanged (categories) {
  const categoriesWidget = document.getElementById('neighbourhoods');
  const data = categories.map((category) => {
    // We need to map { x, y } (the format returned by VL) to { name, value } (the format needed by Airship)
    const { x, y } = category;
    let obj = {
      name: x,
      value: y
    };
    if (ramp[obj.name]) {
      obj.color = ramp[obj.name];
    }
    return obj;
  });
  categoriesWidget.categories = data;
}

function onAveragePriceChanged (averagePrice) {
  const formulaTextElement = document.getElementById('formula-number');
  const formattedText = `${averagePrice.toFixed(2)}$`;
  formulaTextElement.textContent = formattedText;
}

function onPriceChanged (price) {
  var histogramWidget = document.getElementById('price');
  const data = price.map(bin => {
    // We need to map the format returned by VL to the format needed by Airship
    return {
      start: bin.x[0],
      end: bin.x[1],
      value: bin.y
    };
  });
  histogramWidget.data = data;
}

function onLegendCalculated (legend) {
  if (!ramp) {
    ramp = {};
    legend.data.forEach(entry => {
      let hex = '#';
      hex += rgbToHex(entry.value.r);
      hex += rgbToHex(entry.value.g);
      hex += rgbToHex(entry.value.b);

      ramp[entry.key] = hex;
    });
  }
}

function handleCategoriesSelected () {
  const categoriesWidget = document.getElementById('neighbourhoods');
  categoriesWidget.addEventListener('categoriesSelected', async (event) => {
    const selected = await categoriesWidget.getSelectedCategories();
    filterNeighbourhood(selected);
  });
}

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
    // With all switches off, we filter by a non-existent value, so no points are returned.
    roomTypeFilter = `$room_type in ['wadus']`;
  }
  combineFilters(roomTypeFilter);
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
  combineFilters(neighbourhoodFilter);
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

function combineFilters () {
  let combinedFilter = '';
  const filters = [];
  if (neighbourhoodFilter) {
    filters.push(neighbourhoodFilter);
  }
  if (roomTypeFilter) {
    filters.push(roomTypeFilter);
  }
  combinedFilter = filters.join(' and ');
  applyFilter(combinedFilter);
}

function changeToolbarColor() {
  const toolbar = document.querySelector('.as-toolbar');
  toolbar.style.setProperty('--as-toolbar--background-color', '#0284A8');
}

const responsiveContent = document.querySelector('as-responsive-content');
responsiveContent.addEventListener('ready', onLoad);
