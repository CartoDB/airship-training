/*!
 * Airship Components · CARTO · https://carto.com
 * Built with http://stenciljs.com
 * 2018-11-03T10:27:40
 */
(function(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components) {

  function init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCorePolyfilled, hydratedCssClass, components, HTMLElementPrototype, App, x, y, scriptElm) {
    // create global namespace if it doesn't already exist
    App = win[namespace] = win[namespace] || {};
    App.components = components;
    y = components.map(function (c) { return c[0]; });
    if (y.length) {
        // auto hide components until they been fully hydrated
        // reusing the "x" and "i" variables from the args for funzies
        x = doc.createElement('style');
        x.innerHTML = y.join() + '{visibility:hidden}.' + hydratedCssClass + '{visibility:inherit}';
        x.setAttribute('data-styles', '');
        y = doc.head.querySelector('meta[charset]');
        doc.head.insertBefore(x, y ? y.nextSibling : doc.head.firstChild);
    }
    createComponentOnReadyPrototype(win, namespace, HTMLElementPrototype);
    resourcesUrl = resourcesUrl || App.resourcesUrl;
    // figure out the script element for this current script
    y = doc.querySelectorAll('script');
    for (x = y.length - 1; x >= 0; x--) {
        scriptElm = y[x];
        if (scriptElm.src || scriptElm.hasAttribute('data-resources-url')) {
            break;
        }
    }
    // get the resource path attribute on this script element
    y = scriptElm.getAttribute('data-resources-url');
    if (!resourcesUrl && y) {
        // the script element has a data-resources-url attribute, always use that
        resourcesUrl = y;
    }
    if (!resourcesUrl && scriptElm.src) {
        // we don't have an exact resourcesUrl, so let's
        // figure it out relative to this script's src and app's filesystem namespace
        y = scriptElm.src.split('/').slice(0, -1);
        resourcesUrl = (y.join('/')) + (y.length ? '/' : '') + fsNamespace + '/';
    }
    // request the core this browser needs
    // test for native support of custom elements and fetch
    // if either of those are not supported, then use the core w/ polyfills
    // also check if the page was build with ssr or not
    x = doc.createElement('script');
    if (usePolyfills(win, win.location, x, 'import("")')) {
        // requires the es5/polyfilled core
        x.src = resourcesUrl + appCorePolyfilled;
    }
    else {
        // let's do this!
        x.src = resourcesUrl + appCore;
        x.setAttribute('type', 'module');
        x.setAttribute('crossorigin', true);
    }
    x.setAttribute('data-resources-url', resourcesUrl);
    x.setAttribute('data-namespace', fsNamespace);
    doc.head.appendChild(x);
}
function usePolyfills(win, location, scriptElm, dynamicImportTest) {
    // fyi, dev mode has verbose if/return statements
    // but it minifies to a nice 'lil one-liner ;)
    if (location.search.indexOf('core=esm') > 0) {
        // force esm build
        return false;
    }
    if ((location.search.indexOf('core=es5') > 0) ||
        (location.protocol === 'file:') ||
        (!(win.customElements && win.customElements.define)) ||
        (!win.fetch) ||
        (!(win.CSS && win.CSS.supports && win.CSS.supports('color', 'var(--c)'))) ||
        (!('noModule' in scriptElm))) {
        // es5 build w/ polyfills
        return true;
    }
    // final test to see if this browser support dynamic imports
    return doesNotSupportsDynamicImports(dynamicImportTest);
}
function doesNotSupportsDynamicImports(dynamicImportTest) {
    try {
        new Function(dynamicImportTest);
        return false;
    }
    catch (e) { }
    return true;
}
function createComponentOnReadyPrototype(win, namespace, HTMLElementPrototype) {
    (win['s-apps'] = win['s-apps'] || []).push(namespace);
    if (!HTMLElementPrototype.componentOnReady) {
        HTMLElementPrototype.componentOnReady = function componentOnReady() {
            /*tslint:disable*/
            var elm = this;
            function executor(resolve) {
                if (elm.nodeName.indexOf('-') > 0) {
                    // window hasn't loaded yet and there's a
                    // good chance this is a custom element
                    var apps = win['s-apps'];
                    var appsReady = 0;
                    // loop through all the app namespaces
                    for (var i = 0; i < apps.length; i++) {
                        // see if this app has "componentOnReady" setup
                        if (win[apps[i]].componentOnReady) {
                            // this app's core has loaded call its "componentOnReady"
                            if (win[apps[i]].componentOnReady(elm, resolve)) {
                                // this component does belong to this app and would
                                // have fired off the resolve fn
                                // let's stop here, we're good
                                return;
                            }
                            appsReady++;
                        }
                    }
                    if (appsReady < apps.length) {
                        // not all apps are ready yet
                        // add it to the queue to be figured out when they are
                        (win['s-cr'] = win['s-cr'] || []).push([elm, resolve]);
                        return;
                    }
                }
                // not a recognized app component
                resolve(null);
            }
            // callback wasn't provided, let's return a promise
            if (win.Promise) {
                // use native/polyfilled promise
                return new win.Promise(executor);
            }
            // promise may not have been polyfilled yet
            return { then: executor };
        };
    }
}


  init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components);

  })(window, document, "airship","airship",0,"airship.core.js","airship.core.pf.js","hydrated",[["as-category-widget","as-category-widget",1,[["categories",1],["clearSelection",32],["defaultBarColor",1,0,"default-bar-color",2],["description",1,0,1,2],["disableInteractivity",1,0,"disable-interactivity",4],["error",1,0,1,2],["errorDescription",1,0,"error-description",2],["getSelectedCategories",32],["heading",1,0,1,2],["isLoading",1,0,"is-loading",4],["noDataBodyMessage",1,0,"no-data-body-message",2],["noDataHeaderMessage",1,0,"no-data-header-message",2],["selectedCategories",16],["showClearButton",1,0,"show-clear-button",4],["showHeader",1,0,"show-header",4],["useTotalPercentage",1,0,"use-total-percentage",4],["valueFormatter",1],["visibleCategories",1,0,"visible-categories",8]]],["as-dropdown","as-dropdown",1,[["closeList",32],["defaultText",1,0,"default-text",2],["isOpen",16],["onClickOutside",1],["options",1],["selectedOption",2,0,"selected-option",2],["selectedOptionObject",16],["showClearButton",1,0,"show-clear-button",4]]],["as-histogram-widget","as-histogram-widget",1,[["clearSelection",32],["color",1,0,1,2],["colorRange",1],["data",1],["description",1,0,1,2],["disableInteractivity",1,0,"disable-interactivity",4],["el",64],["error",1,0,1,2],["errorDescription",1,0,"error-description",2],["getSelection",32],["heading",1,0,1,2],["isLoading",1,0,"is-loading",4],["noDataBodyMessage",1,0,"no-data-body-message",2],["noDataHeaderMessage",1,0,"no-data-header-message",2],["responsive",1,0,1,4],["selectedColor",1,0,"selected-color",2],["setSelection",32],["showClear",1,0,"show-clear",4],["showHeader",1,0,"show-header",4],["tooltipFormatter",1],["xLabel",1,0,"x-label",2],["yLabel",1,0,"y-label",2]]],["as-infowindow","as-infowindow",1,[["element",64],["src",1,0,1,2]]],["as-legend","as-legend",1,[["data",1]]],["as-loader","as-loader",1],["as-range-slider","as-range-slider",1,[["disabled",1,0,1,4],["draggable",1,0,1,4],["formatValue",1],["maxValue",1,0,"max-value",8],["minValue",1,0,"min-value",8],["range",1],["step",1,0,1,8],["thumbs",16],["value",1,0,1,8]]],["as-range-slider-bar","as-range-slider",1,[["disabled",1,0,1,4],["draggable",1,0,1,4],["element",64],["rangeEndPercentage",2,0,"range-end-percentage",8],["rangeStartPercentage",2,0,"range-start-percentage",8],["stepPercentage",1,0,"step-percentage",8]],0,[["mousedown","onMouseDown",0,1],["touchstart","onMouseDown",0,1]]],["as-range-slider-thumb","as-range-slider",1,[["disabled",1,0,1,4],["element",64],["formatValue",1],["percentage",1,0,1,8],["value",1,0,1,8],["valueMax",1,0,"value-max",8],["valueMin",1,0,"value-min",8]],0,[["mousedown","onMouseDown",0,1],["touchstart","onMouseDown",0,1],["keydown","onKeyDown"]]],["as-responsive-content","as-responsive-content",1,[["element",64],["getSections",32],["sections",16],["setVisible",32]]],["as-stacked-bar-widget","as-legend",1,[["data",1],["description",1,0,1,2],["el",64],["error",1,0,1,2],["errorDescription",1,0,"error-description",2],["formatFn",1],["heading",1,0,1,2],["isLoading",1,0,"is-loading",4],["metadata",1],["mouseLeave",1],["mouseOver",1],["noDataBodyMessage",1,0,"no-data-body-message",2],["noDataHeaderMessage",1,0,"no-data-header-message",2],["responsive",1,0,1,4],["showLegend",1,0,"show-legend",4]]],["as-switch","as-switch",1,[["checked",2,1,1,4],["disabled",1,1,1,4],["el",64],["label",1,0,1,2],["name",1,1,1,2]]],["as-tabs","as-tabs",1,[["activeTab",2,0,"active-tab",8],["element",64],["xl",1,0,1,4]]],["as-toolbar","as-toolbar",1,[["element",64]]],["as-widget-header","as-loader",1,[["error",1,0,1,2],["header",1,0,1,2],["isEmpty",1,0,"is-empty",4],["isLoading",1,0,"is-loading",4],["noDataMessage",1,0,"no-data-message",2],["subheader",1,0,1,2]]],["as-y-axis","as-y-axis",1,[["element",64],["from",1,0,1,8],["responsive",1,0,1,4],["to",1,0,1,8]]]],HTMLElement.prototype);