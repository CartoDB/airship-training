function onLoad () {
  initMapboxGL();
  loadMap(onCategoriesChanged, onAveragePriceChanged, onPriceChanged, onLegendCalculated);
  handleCategoriesSelected();
  handleTypeSelector();
  handleHistogramFilter();
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
let priceGtFilter = '';
let priceLtFilter = '';
let ramp = '';

function onCategoriesChanged (categories) {
  const categoriesWidget = document.getElementById('neighbourhoods');
  const data = categories.map((category) => {
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
  console.log('feed');
  categoriesWidget.categories = data;
}

function onAveragePriceChanged (averagePrice) {
  const formulaTextElement = document.getElementById('formula-number');
  const formattedText = `${averagePrice.toFixed(2)}€`;
  formulaTextElement.textContent = formattedText;
}

function onPriceChanged (price) {
  var histogramWidget = document.getElementById('price');
  const data = price.map(bin => {
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

// Event handling
function handleCategoriesSelected () {
  const categoriesWidget = document.getElementById('neighbourhoods');
  categoriesWidget.addEventListener('categoriesSelected', (event) => {
    setTimeout(async function () {
      const selected = await categoriesWidget.getSelectedCategories();
      filterNeighbourhood(selected);
    }, 500);
  });
}

function handleHistogramFilter () {
  var histogramWidget = document.getElementById('price');
  histogramWidget.addEventListener('selectionChanged', (event) => {
    filterPrice(event.detail);
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

function filterPrice (priceRange) {
  if (priceRange) {
    priceGtFilter = `$price >= ${priceRange[0]}`;
    priceLtFilter = `$price <= ${priceRange[1]}`;
  } else {
    priceGtFilter = '';
    priceLtFilter = '';
  }
  combineFilters();
}

// Applying filter to viz
function applyFilter(filter) {
  if (!viz) {
    return;
  }

  if (filter) {
    viz.filter.blendTo(filter);
  } else {
    viz.filter.blendTo(1);
  }
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
  const filters = [];
  if (neighbourhoodFilter) {
    filters.push(neighbourhoodFilter);
  }
  if (roomTypeFilter) {
    filters.push(roomTypeFilter);
  }
  if (priceGtFilter) {
    filters.push(priceGtFilter);
  }
  if (priceLtFilter) {
    filters.push(priceLtFilter);
  }
  combinedFilter = filters.join(' and ');
  console.log(combinedFilter);
  applyFilter(combinedFilter);
}

const responsiveContent = document.querySelector('as-responsive-content');
responsiveContent.addEventListener('ready', onLoad);
