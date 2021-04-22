# js-framework

This Javascript framework is a pretty traditional Model, View and Controller
implementation which provides the following classes:

  * __Controller class__: Subclass this and hook your views and provider events together;
  * __Provider class__: To be used to request JSON objects and arrays of objects from an external source;
  * __Model class__: subclass this for your JSON models, and separately define the members of your class;
  * __View classes__: classes are provided for form, list, button, etc.

It uses [Bootstrap](https://getbootstrap.com/) to implement the underlying user 
interface, adding a few components.

## Use

Add the framework as a dependency in your project:

```bash
[bash] echo "@djthorpe:registry=https://npm.pkg.github.com" >> .npmrc
[bash] npm install @djthorpe/js-framework
```

Import assets and create a controller in your JavaScript:

```javascript
const jsframework = require('@djthorpe/js-framework');

// Run application
window.addEventListener('DOMContentLoaded', () => {
  const app = jsframework.Controller.New(Controller);
  app.main();
});
```

In reality, you would subclass the `Controller` class, and create models, views
and providers within the controller, then use `addEventListener` for each view
and provider to react to events. More informaton is provided in the documentation.

## Reference

The reference is provided in the `dist/doc` folder in the published package, or at
https://djthorpe.github.io/js-framework/

