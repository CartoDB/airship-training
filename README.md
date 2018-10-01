# Airship training

## TUTORIAL


1. Boilerplate

We're going to add three files:

- `index.html`: just a basic boilerplate where we'll add our page.
- `main.css`: the stylesheet where we'll add our custom CSS.
- `main.js`: the JS entry point to start adding our code.

Commit [e573165](https://github.com/CartoDB/airship-training/commit/e573165589faec80f77c5f0fa6264b327f829e64)

2. Add Airship

Let's copy from `Usage from a CDN` from the guides.
http://airship-integration.developers.carto-staging.com/developers/airship/guides/getting-started/#usage-from-a-cdn

With the exception of JS, better at the bottom.

Let's copy a flag (styles + icon) and a switch to check that everything is being loaded.

Commit [b76dfdff40b9ae9eeadfc682de9223a8262a3a05]

3. Adding layout (toolbar)

Talk about the different zones of the layout.

Copy-pasted from `reference/Layout/overview`

Commit [xxx]

4. Integrating MapboxGL

Copy-pasted from `guides/Integrating CARTO-VL/Including CARTO-VL`

Last version is not updated.

Create a file `map.js` to tackle map creation and instantiation.

The code on the integration guide for initializing MapboxGL is wrapped into a function.

Added call to the above function in `onload` event.

Commit []

5. Integrating CARTO-VL

We've split map loading from CARTO-VL instantiation in two functions.

`viz` is located outside the function for a future use.

Add credentials.

Add layer

Commmit []

6. Add logo to toolbar

Create a new folder with an img.

Add the img wrapped in a `as-toolbar__item`. Show what happens if it's not wrapped.

Talk about other options to group items in a toolbar.

Commit []

7. Add a category widget

Copy-paste from reference, first the tag, then the feeding.

Commit []

8. Feeding wdiget

First, wrap widget in a container.

Then, get data from viz.

Add callback.

Feed widget.

Commit []

9. Filter from widget

Add event handling.

Create filter expression.

Modify viz using the filter expression.

Commit []

10. Add floating panel

Add the simplest content to the markup

commit []
