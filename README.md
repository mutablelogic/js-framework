# js-framework

This Javascript framework is a pretty traditional Model, View and Controller
implementation which provides the following classes:

  * __Controller class__: Subclass this and hook your views and provider events together;
  * __Provider class__: To be used to request JSON objects and arrays of objects from an external source;
  * __Model class__: subclass this for your JSON models, and separately define the members of your class;
  * __View classes__: classes are provided for form, list, button, etc.

## Clone

You'll need to use `npm` to install as a dependency in your module. Here is what
I do on my Mac which has homebrew installed:

```bash
[bash] brew install npm
[bash] cd $PROJECTS
[bash] git clone git@github.com:djthorpe/js-framework.git
[bash] cd js-framework
[bash] npm install
```

## Test

## Provider

The provider is used to fetch JSON objects and arrays from a remote REST source, and stores them. To construct a provider with a model class called MyModelClass,

```javascript
import Provider from '@djthorpe/js-framework';
import MyModelClass from './models';

const origin = 'https://awesome-data-service.com/';
const provider = new Provider(MyModelClass,origin);
```

If the __Model__ class is not provided then a plain vanilla object
is used. The origin is also optional.

You can create a request to a remote API using the `request` method, which will
return immediately, whilst firing events,

```javascript
const path = '/api/datasource';
const req = { method: 'GET' };
const userInfo = null;
const interval = 30 * 1000; // Request every 30 seconds
provider.request(path,req,userInfo,interval);
```

The `req`, `userInfo` and `interval` arguments are optional. If you use
an interval, a request is immediately made and then again periodically. To
cancel an interval, call `provider.cancel();`.

The events fired are as followed:

`mvc.provider.added` (sender,object)
`mvc.provider.changed` (sender,object,existing)
`mvc.provider.deleted` (sender,object)
`mvc.provider.completed` (sender,changed)
`mvc.provider.error` (sender,Error)
