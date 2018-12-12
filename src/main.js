function onLoad () {
  initMapboxGL();
  loadMap(onCategoriesChanged);
  handleCategoriesSelected();
  handleTypeSelector();
}

let neighbourhoodFilter = '';
let roomTypeFilter = '';

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
  applyFilter(roomTypeFilter);
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