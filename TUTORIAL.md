## TUTORIAL

**0. Show documentation**

https://carto.com/developers/airship

**1. Boilerplate**

We're going to add three files:

- `index.html`: just a basic boilerplate where we'll add our page.
- `main.css`: the stylesheet where we'll add our custom CSS.
- `main.js`: the JS entry point to start adding our code.

At this point you should see a pink page.

SRC files
https://github.com/CartoDB/airship-training/tree/3f21599c9de55d9d070cdc0dce49cc21b3b28158/src

HTML boilerplate
https://github.com/CartoDB/airship-training/blob/3f21599c9de55d9d070cdc0dce49cc21b3b28158/index.html

`git checkout 3f21599c9de55d9d070cdc0dce49cc21b3b28158`

**2. Add Airship**

Let's copy the code snippet from [Usage from a CDN](https://carto.com/developers/airship/guides/getting-started/#usage-from-a-cdn) from the guides.

Let's make one little change. Let's move the components library, the `js` one, to the bottom of the HTML file.

Let's go to the [flag reference](https://carto.com/developers/airship/reference/#/styles/flag) and copy the default example in our code.

This way we can check that styles and icons are being loaded properly.

Let's add a component. Go to the [switch component](https://carto.com/developers/airship/reference/#/components/switch) and copy paste into the HTML file. The switch should appear when refreshing the page.

At this point you should see a notification flag and a switch.

![image](https://user-images.githubusercontent.com/1078228/46360664-343d4b80-c66c-11e8-9b31-a6060bc52042.png)

Commit https://github.com/CartoDB/airship-training/commit/fc40833823e0c7ad1a06f3c1603e21d584ae3fbe

`git checkout fc40833823e0c7ad1a06f3c1603e21d584ae3fbe`

**3. Adding layout (toolbar)**

Take a look on the different components we have for the layout. There's [one section on the guides](https://carto.com/developers/airship/guides/layout/) and [another one on the reference](https://carto.com/developers/airship/reference/#/layout).

Copy the [basic layout](https://carto.com/developers/airship/reference/#/layout?a=basic-layout) snippet on the reference section. This will be enough for our training. The snippet creates a toolbar, the map area and a sidebar.

Spoiler alert: later on the tutorial we'll add a floating panel.

At this point you should see a blank page with a blue toolbar on top and a white sidebar at the right.

Commit https://github.com/CartoDB/airship-training/commit/5906353c14990474937eb89d8d98c0b29fccdbd7

`git checkout 5906353c14990474937eb89d8d98c0b29fccdbd7`

**4. Integrating MapboxGL**

Copy-pasted from `Airship guides/Integrating CARTO-VL/Including CARTO-VL`

Create a file `map.js` to tackle map creation and instantiation.

Add a function called `initMapboxGL` to render a basemap. This code is the first section of the code snippet that appears in the guide, in the section `Setting a basic layout`. For now, we'll take care only of the basemap rendering.

Add the call to that function in the window `onload` event in the `main.js` file.

At this point you should see the content area of the page filled with a basemap.

![image](https://user-images.githubusercontent.com/1078228/46361098-1e7c5600-c66d-11e8-8082-ac65ce8d587e.png)

Commit https://github.com/CartoDB/airship-training/commit/39d97e7fa69466de5372485dd453b43015c0934d

`git checkout 39d97e7fa69466de5372485dd453b43015c0934d`

**5. Integrating CARTO-VL**

We've split map loading from CARTO-VL instantiation in two functions. The first one, already coded in the previous step, tackles the MapboxGL instantiation.

Now we'll address the CARTO-VL part, adding the credentials and rendering a dataset. Again, this code is available in the `Integrating CARTO-VL`code.

`viz` is located outside the function for a future use.

At this point you should see a cloud of blue point on top of the map.

![image](https://user-images.githubusercontent.com/1078228/46361310-8cc11880-c66d-11e8-9673-e733167acff2.png)

Commmit https://github.com/CartoDB/airship-training/commit/25fbebf32081f56322e44af2d145c05025c25724

`git checkout 25fbebf32081f56322e44af2d145c05025c25724`

**6. Add logo to toolbar**

Create a new folder with an img.

[CARTO LOGO IMAGE](https://raw.githubusercontent.com/CartoDB/airship-training/master/img/carto.svg)

If we just put the image in the toolbar, see what happens.

Add the img wrapped in a `as-toolbar__item`.

Take a look on the other options to group items in a toolbar. See the toolbar reference.

At this point you should see a logo in the toolbar.

No commit diff. Logo was already there.

**7. Add a category widget**

Let's copy paste the code from the Category widget reference. First the HTML code. Then the feeding code.

Take a look on the options of the category widget.

At this point you should see a widget in the sidebar, with no relation with the visualization.

![image](https://user-images.githubusercontent.com/1078228/46361623-68197080-c66e-11e8-8aea-daf0c99d9eab.png)

Commit https://github.com/CartoDB/airship-training/commit/1e81ab1be82a3b236cd2c7c0aecd808edb03b843

`git checkout 1e81ab1be82a3b236cd2c7c0aecd808edb03b843`

**8. Feeding widget**

Let's wrap the widget in a container. Take a look on the sidebar containers section of the layout reference.

Then, go to `map.js` and add the `viewportHistogram` expression to get data from viz.

Then, add in `main.js` the callback function to map the histogram data and feed the widget.

At this point you should see the neighbourhood data with the widget reacting to map panning.

![image](https://user-images.githubusercontent.com/1078228/46361891-158c8400-c66f-11e8-87f5-019f08f6cb11.png)

Commit https://github.com/CartoDB/airship-training/commit/dcb7d3f49af79787c431e25e173f05bcd55e52d5

`git checkout dcb7d3f49af79787c431e25e173f05bcd55e52d5`

**9. Filter from widget**

Now things get serious.

We need to hook up the widget interactivity (clicking on a category) to the visualization, to filter it accordingly.

Let's add three functions.

First one, an event handler to the component. This will show that web components are just like other page element. The code is the same as handling a simple click in a button.

Next, we need to form the filter expression. It's just creating a string with the right expression.

Last, we pass that string to an `applyFilter` function that modifies the `viz` object.

This example is using the CARTO-VL string API. Using the JS API will be similar.

At this point, clicking on a category should filter the visualization.

Commit https://github.com/CartoDB/airship-training/commit/e26678afd071b54d5848de83c7999fff64e8249b

`git checkout e26678afd071b54d5848de83c7999fff64e8249b`

**10. Add floating panel**

Let's add the simplest floating to the markup. Take a look on the Map Panels section of the layout reference.

At this point you should see a floating panel with just a text.

![image](https://user-images.githubusercontent.com/1078228/46362428-82544e00-c670-11e8-8b88-40d59d09f620.png)

commit https://github.com/CartoDB/airship-training/commit/ec4c2312348e4c977363f12d1ac8a66863a2bdda

`git checkout ec4c2312348e4c977363f12d1ac8a66863a2bdda`

**11. Add switches**

Let's add three switches to the previous panel.

First, we'll do it putting a switch and a label to see that the elements are not well aligned.

To avoid this, we'll add some custom CSS code. This shows how Airship approach allows the developer to add its own code where it falls short.

At this point you should see three widgets in the floating panel.

![image](https://user-images.githubusercontent.com/1078228/46362487-afa0fc00-c670-11e8-939a-ba84bab30733.png)

commit https://github.com/CartoDB/airship-training/commit/09262a2c65d88e337b6491c2843850001ba7f618

`git checkout 743312abbf783589bffc3f1a1235ffd22b693195`

**12. Add filtering to switches**

To add filtering via switches we'll do the same thing as with the category widget.

First, add an event handler function. This is trickier because we need to add a listener per switch but we need to filter taking all of them into account.

Then we'll add a function to form the filter expression, just as we did before but with three values.

Then we call to the existing `applyFilter` function.

At this point, clicking on the switches should have an impact on the visualization but the two filters are not combined.

Commit https://github.com/CartoDB/airship-training/commit/49c4ec6705f3b7769e84d8b9c6ff841f24f23400

`git checkout 49c4ec6705f3b7769e84d8b9c6ff841f24f23400q`

**13. Combine filters**

Filters are not working because they're not combined. Let's do it.

This has nothing to do with Airship. It's a result of using CARTO-VL.

First important thing here is to add `$room_type` to a viz variable. I forgot to do it before and that's why we see glitched while filtering via switches, because that data doesn't come in the MVTs. Now it does so the filtering is way smoother, we avoid network roundtrips.

It's a simple function that combines the previous filter expressions via `and` and then it calls to the existing `applyFilter` function.

At this point the filtering should behave properly.

Commit https://github.com/CartoDB/airship-training/commit/c2565a27d8a4a57067c51dec99c7ffd88ba8f64c

`git checkout c2565a27d8a4a57067c51dec99c7ffd88ba8f64c`

**14. Exercise: add a formula widget**

Add a formula widget that shows the price average.

Clue: add to the viz properties this line.
`@averagePrice: viewportAvf($price)`

Clue: steps to do
- Add a section in the sidebar for the formula.
- Change / use another style for the text.
- Add a new callback to update the formula text when the layer is updated.

Commit https://github.com/CartoDB/airship-training/commit/a90289dc303c5bb575a5f76d57e78c6e5357ea9b

`git checkout a90289dc303c5bb575a5f76d57e78c6e5357ea9b`

**15. Exercise: change toolbar color via CSS overwrite**

Change the toolbar color to whatever color you want.

You can do it with a simple CSS overwrite.

Commit https://github.com/CartoDB/airship-training/commit/e996b02938f5968f89b76310732c66b45a7141aa

`git checkout e996b02938f5968f89b76310732c66b45a7141aa`

**16. Change toolbar color via CSS variable**

Change the toolbar color to whatever color you want.

Commit https://github.com/CartoDB/airship-training/commit/65429b6dd292801475e1f32fe229bb12f68a6cf4

`git checkout 65429b6dd292801475e1f32fe229bb12f68a6cf4`

**17. Add responsive layout component**

We're going to add responsiveness to our app just simply using the `as-responsive-content>`

We need to do just three simple things:
- Replace the `as-content` div for the component `as-responsive-content`
- Add name and order to the sidebar.
- Replace the `onload` event for the `ready` event of the component.

Et voilà! Responsive layout working!

Commit https://github.com/CartoDB/airship-training/commit/5cf54becdd3e492562d5eef9f24a4f6ad1864448

`git checkout 5cf54becdd3e492562d5eef9f24a4f6ad1864448`

**18. Add histogram widget**

Commit https://github.com/CartoDB/airship-training/commit/29c29ab2d518f856bf26a7bd806fd7593e3a0e81

`git checkout 29c29ab2d518f856bf26a7bd806fd7593e3a0e81`

**19. Add color ramp to categories**

Commit https://github.com/CartoDB/airship-training/commit/904c4c25cb1923920d6cf941caebbf4ca278ab12

`git checkout 904c4c25cb1923920d6cf941caebbf4ca278ab12`
