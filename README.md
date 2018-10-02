# Airship training

## What is Airship?

A common pain when starting to build any software application is answering questions like:

- What is the ideal interface for this application?
- How should it work? How should it look? What’s the most intuitive and efficient way to use it?
- What are the common usage patterns for certain things? What elements should I use for controlling the app? Which ones for displaying information and conveying insights?

Most developers struggle with this, and it is specially the case when building LI Apps. How should I organize my app? Where should go the controls, filters and charts be? How should they look?

That’s where Airship comes to the rescue. Airship is a CSS Framework and a LI components library. It enables developers to build LI apps based on well proven Design patterns for Location Intelligence and provides ready-to-use components and charts that work out of the box with the CARTO stack, so that developers can focus on solving problem, making cases, producing business outcomes as fast as possible.

## What can Airship do for you?

- Speed up prototypes development
  Use a common layout system used in Location Intelligence app where the map is the star.
  Forget about how to provide a responsive application. Airship do that for you.
  Use our examples to scaffold your application.

- Offer a good looking UI
  - Leverage CARTO design. We are super fortunate at CARTO to count with a fantastic Design team. They've developed the design system that Airship is designed from.
  - Customize styles in an easy way. Corporate colors can be changed on-the-fly (no need to recompile). But if you need it, you can customize every piece or Airship.

- Connect easily with CARTO-VL and CARTO.js
  - Airship widgets can be connected to our rendering libraries very easily, having interactivity in no maps.

Start developing. Forget about design decissions.

## What happened to the first Airship?

Airship was intended initially as a “Design Library” that would contain (as designs) all the typical components that an LI app (specially CARTO solutions) would need. The goal was to ensure that all CARTO Solutions would by default already use the same components and have a common look and feel; the intended users would be the partners.

When this was ready, the Design team started a “reference implementation” of those components in React and we just “put it out there” and we announced it as a product in Locations.

However, we saw some problems and received some feedback about it:
- It only provided components. There was no concept of layout, that it's the first problem developers face when starting a new application.
- Components are made in React:
  - Only a fraction of our partners use it.
  - Components customizing made through component extension. Felt a bit cumbersome.
- We didn't provide examples / templates / boilerplates.

## Goals

To provide a CSS/JS framework that enables (internal and external) developers and sales/solutions engineers to quickly put together basic LI Apps such that:

- They do not have to worry about look and feel when trying to get working prototypes up and running quickly
- It can be customised and turned into a production application
- It provides components but using a technology that works compatible with Vanilla JS and easily integrated with any framework.
- It has a better documentation for onboarding developers.

## What's in Airship?

Airship comes with three packages:
- Styles: CSS stylesheets that can be applied to any HTML element.
- Components: Widgets ready-to-use. Shipped as Web Components to be able to be integrated with any framework.
- Icons: icon library.

The documentation is for now at http://airship-integration.developers.carto-staging.com/developers/airship/

It is divided in:
- Guides: the best place to start with Airship. Follow these guides to get a glance of what Airship is and how to use it in your apps.
- Reference: come here when you need the exact examples and code snippets for a particular element.
- Examples: code examples for particular use cases.

## TUTORIAL

1. Boilerplate

We're going to add three files:

- `index.html`: just a basic boilerplate where we'll add our page.
- `main.css`: the stylesheet where we'll add our custom CSS.
- `main.js`: the JS entry point to start adding our code.

Commit https://github.com/CartoDB/airship-training/commit/e573165589faec80f77c5f0fa6264b327f829e64

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

11. Add switches

Where we learn to add custom CSS code.

commit []

12. Add filtering to switches

Add filter code to switches but no filter management.

Commit []

13. Combine filters

Filters are not working because they're not combined. Let's do it.

Added room_type to viz to avoid net roundtrips.

Commit []

14. Add formula widget

Commit []

15. Change toolbar color

Show how to do it via CSS variable and simple CSS overwrite.

Commit []

16. Add responsive layout component

Commit []
