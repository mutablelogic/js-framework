// Provider class to be subclassed by an actual provider

export default class Provider {
  constructor(root) {
    this.$root = root;
  }
}
