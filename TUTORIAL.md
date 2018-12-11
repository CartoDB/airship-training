## TUTORIAL

**0. Show documentation**

https://carto.com/developers/airship

**1. Boilerplate**

We're going to add three files:

- `index.html`: just a basic boilerplate where we'll add our page.
- `main.css`: the stylesheet where we'll add our custom CSS.
- `main.js`: the JS entry point to start adding our code.

At this point you should see a pink page.

Commit https://github.com/CartoDB/airship-training/commit/e573165589faec80f77c5f0fa6264b327f829e64

`git checkout 01-boilerplate`

**2. Add Airship**

Let's copy the code snippet from [Usage from a CDN](http://airship-integration.developers.carto-staging.com/developers/airship/guides/getting-started/#usage-from-a-cdn) from the guides.

Let's make one little change. Let's move the components library, the `js` one, to the bottom of the HTML file.

Let's go to the [flag reference](http://airship-integration.developers.carto-staging.com/developers/airship/reference/#/styles/flag) and copy the default example in our code.

This way we can check that styles and icons are being loaded properly.

Let's add a component. Go to the [switch component](http://airship-integration.developers.carto-staging.com/developers/airship/reference/#/components/switch) and copy paste into the HTML file. The switch should appear when refreshing the page.

At this point you should see a notification flag and a switch.

![image](https://user-images.githubusercontent.com/1078228/46360664-343d4b80-c66c-11e8-9b31-a6060bc52042.png)

Commit https://github.com/CartoDB/airship-training/commit/b76dfdff40b9ae9eeadfc682de9223a8262a3a05

`git checkout 02-include-airship`

**3. Adding layout (toolbar)**

Take a look on the different components we have for the layout. There's [one section on the guides](http://airship-integration.developers.carto-staging.com/developers/airship/guides/layout/) and [another one on the reference](http://airship-integration.developers.carto-staging.com/developers/airship/reference/#/layout).

Copy the [basic layout](http://airship-integration.developers.carto-staging.com/developers/airship/reference/#/layout?a=basic-layout) snippet on the reference section. This will be enough for our training. The snippet creates a toolbar, the map area and a sidebar.

Spoiler alert: later on the tutorial we'll add a floating panel.

At this point you should see a blank page with a blue toolbar on top and a white sidebar at the right.

Commit https://github.com/CartoDB/airship-training/commit/3ebb6a6341f89208977e306f5f36a88b2fc5b858

`git checkout 03-add-layout`

**4. Integrating MapboxGL**

Copy-pasted from `guides/Integrating CARTO-VL/Including CARTO-VL`

Last version of CARTO-VL is not updated. Let's go for the 0.8.0.

Create a file `map.js` to tackle map creation and instantiation.

Add a function called `initMapboxGL` to render a basemap. This code is the first section of the code snippet that appears in the guide, in the section `Setting a basic layout`. For now, we'll take care only of the basemap rendering.

Add the call to that function in the window `onload` event in the `main.js` file.

At this point you should see the content area of the page filled with a basemap.

![image](https://user-images.githubusercontent.com/1078228/46361098-1e7c5600-c66d-11e8-8082-ac65ce8d587e.png)

Commit https://github.com/CartoDB/airship-training/commit/495501b77df88f2e90a56885acdf501231df6b52

`git checkout 04-add-mapbox`

**5. Integrating CARTO-VL**

We've split map loading from CARTO-VL instantiation in two functions. The first one, already coded in the previous step, tackles the MapboxGL instantiation.

Now we'll address the CARTO-VL part, adding the credentials and rendering a dataset. Again, this code is available in the `Integrating CARTO-VL`code.

`viz` is located outside the function for a future use.

At this point you should see a cloud of blue point on top of the map.

![image](https://user-images.githubusercontent.com/1078228/46361310-8cc11880-c66d-11e8-9673-e733167acff2.png)

Commmit https://github.com/CartoDB/airship-training/commit/06a04ee98ff67b3cc9e72e3f429e5954a3041f83

`git checkout 05-add-cartovl`

**6. Add logo to toolbar**

Create a new folder with an img.

[CARTO LOGO IMAGE](https://raw.githubusercontent.com/CartoDB/airship-training/master/img/carto.svg)

If we just put the image in the toolbar, see what happens.

Add the img wrapped in a `as-toolbar__item`.

Take a look on the other options to group items in a toolbar. See the toolbar reference.

At this point you should see a logo in the toolbar.

Commit https://github.com/CartoDB/airship-training/commit/6388ff3dff7151f4d52faa9cfc8b8f9e6a06b8aa

`git checkout 06-add-logo`

**7. Add a category widget**

Let's copy paste the code from the Category widget reference. First the HTML code. Then the feeding code.

Take a look on the options of the category widget.

At this point you should see a widget in the sidebar, with no relation with the visualization.

![image](https://user-images.githubusercontent.com/1078228/46361623-68197080-c66e-11e8-8aea-daf0c99d9eab.png)

Commit https://github.com/CartoDB/airship-training/commit/87342b802e83c09993e58c9eb49b5ab83e3938a8

`git checkout 07-add-widget`

**8. Feeding widget**

Let's wrap the widget in a container. Take a look on the sidebar containers section of the layout reference.

Then, go to `map.js` and add the `viewportHistogram` expression to get data from viz.

Then, add in `main.js` the callback function to map the histogram data and feed the widget.

At this point you should see the neighbourhood data with the widget reacting to map panning.

![image](https://user-images.githubusercontent.com/1078228/46361891-158c8400-c66f-11e8-87f5-019f08f6cb11.png)

Commit https://github.com/CartoDB/airship-training/commit/ca863ec30f03ff7023f5764dc3f6f035d9ebf5c2

`git checkout 08-feed-widget`

**9. Filter from widget**

Now things get serious.

We need to hook up the widget interactivity (clicking on a category) to the visualization, to filter it accordingly.

Let's add three functions.

First one, an event handler to the component. This will show that web components are just like other page element. The code is the same as handling a simple click in a button.

Next, we need to form the filter expression. It's just creating a string with the right expression.

Last, we pass that string to an `applyFilter` function that modifies the `viz` object.

This example is using the CARTO-VL string API. Using the JS API will be similar.

At this point, clicking on a category should filter the visualization.

Commit https://github.com/CartoDB/airship-training/commit/aa228da8dab36544fb3a2b97d1a8b2f58604a21b

`git checkout 09-filter-widget`

**10. Add floating panel**

Let's add the simplest floating to the markup. Take a look on the Map Panels section of the layout reference.

At this point you should see a floating panel with just a text.

![image](https://user-images.githubusercontent.com/1078228/46362428-82544e00-c670-11e8-8b88-40d59d09f620.png)

commit https://github.com/CartoDB/airship-training/commit/af02959659e0c605ddacdfb6ae5108f2dbed1cfa

`git checkout 10-add-panel`

**11. Add switches**

Let's add three switches to the previous panel.

First, we'll do it putting a switch and a label to see that the elements are not well aligned.

To avoid this, we'll add some custom CSS code. This shows how Airship approach allows the developer to add its own code where it falls short.

At this point you should see three widgets in the floating panel.

![image](https://user-images.githubusercontent.com/1078228/46362487-afa0fc00-c670-11e8-939a-ba84bab30733.png)

commit https://github.com/CartoDB/airship-training/commit/09262a2c65d88e337b6491c2843850001ba7f618

`git checkout 11-add-switches`

**12. Add filtering to switches**

To add filtering via switches we'll do the same thing as with the category widget.

First, add an event handler function. This is trickier because we need to add a listener per switch but we need to filter taking all of them into account.

Then we'll add a function to form the filter expression, just as we did before but with three values.

Then we call to the existing `applyFilter` function.

At this point, clicking on the switches should have an impact on the visualization but the two filters are not combined.

Commit https://github.com/CartoDB/airship-training/commit/9439c97654677a2bae5bc9ec746763da6bd9555c

`git checkout 12-add-filtering`

**13. Combine filters**

Filters are not working because they're not combined. Let's do it.

This has nothing to do with Airship. It's a result of using CARTO-VL.

First important thing here is to add `$room_type` to a viz variable. I forgot to do it before and that's why we see glitched while filtering via switches, because that data doesn't come in the MVTs. Now it does so the filtering is way smoother, we avoid network roundtrips.

It's a simple function that combines the previous filter expressions via `and` and then it calls to the existing `applyFilter` function.

At this point the filtering should behave properly.

Commit https://github.com/CartoDB/airship-training/commit/64010db3b9650bcbc5a5d87d8c90263f099fd42e

`git checkout 13-combine-filters`

**14. Exercise: add a formula widget**

Add a formula widget that shows the price average.

Clue: add to the viz properties this line.
`@averagePrice: viewportAvf($price)`

Clue: steps to do
- Add a section in the sidebar for the formula.
- Change / use another style for the text.
- Add a new callback to update the formula text when the layer is updated.

Commit https://github.com/CartoDB/airship-training/commit/2c6e1ef4d2bd5458e77f2182a4857dedd3dcd808

`git checkout 14-add-formula`

**15. Exercise: change toolbar color**

Change the toolbar color to whatever color you want.

Show how to do it via CSS variable and simple CSS overwrite.

Commit https://github.com/CartoDB/airship-training/commit/df9831aec1c67f1822ab1ea85eb15896c4f635f4

`git checkout 15-change-color`

**16. Add responsive layout component**

I made a mistake and this task is done in the commit 16 when it should be at step 14.

We're going to add responsiveness to our app just simply using the `as-responsive-content>`

We need to do just three simple things:
- Replace the `as-content` div for the component `as-responsive-content`
- Add name and order to the sidebar.
- Replace the `onload` event for the `ready` event of the component.

Et voilà! Responsive layout working!

Commit https://github.com/CartoDB/airship-training/commit/204e55664322ead3e8f62d7616a93ed97dd8784d

`git checkout 16-responsive`
