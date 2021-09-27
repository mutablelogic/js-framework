/**
 * HostController binds a data source to a host web component.
 * @class
*/
export default class HostController {
  constructor(host, provider) {
    // Store a reference to the host and provider
    this.$host = host;
    this.$provider = provider;

    // Register for lifecycle updates
    host.addController(this);
  }

  // eslint-disable-next-line class-methods-use-this
  hostConnected() {
    console.log('hostConnected');
  }

  // eslint-disable-next-line class-methods-use-this
  hostDisconnected() {
    console.log('hostDisconnected');
  }
}
