# js-framework

This Javascript framework is a pretty traditional Model, View and Controller
implementation which provides the following classes:

  * __Controller class__: Subclass this and hook your views and provider events together;
  * __Provider class__: To be used to request JSON objects and arrays of objects from an external source;
  * __Model class__: subclass this for your JSON models, and separately define the members of your class;
  * __View classes__: classes are provided for form, list, button, etc.

It uses [Bootstrap](https://getbootstrap.com/) to implement the underlying user 
interface, adding a few components.

## Clone, Build, Release

You'll need to use `npm` to install as a dependency in your module. Here is what
I do on my Mac which has homebrew installed:

```bash
[bash] brew install npm
[bash] cd $PROJECTS
[bash] git clone git@github.com:djthorpe/js-framework.git
[bash] cd js-framework
[bash] npm install
[bash] npm build
```

This will place the files in the `dist` folder. There is a github action which
runs on a new release to publish the package.

## Use

Use the framework as follows:

```bash
[bash] brew install npm
[bash] cd $PROJECTS
[bash] git clone git@github.com:@owner/js-project.git
[bash] cd js-project
[bash] npm init
[bash] echo "@djthorpe:registry=https://npm.pkg.github.com" >> .npmrc
[bash] npm install @djthorpe/js-framework
```

## Class Reference

The class reference is included in the `dist` folder of the module, and uses `jsdoc` in order to create from the Javascript source.
