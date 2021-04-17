/* eslint-disable max-classes-per-file */

// Models
class Bucket extends mvc.Model { }
mvc.Model.define(Bucket, {
  key: '_id string',
  tags: '{}string',
});

// Controller
class DataApp extends mvc.Controller {
  main() {
    // Add objects to the application
    this.Add('nav', new mvc.Nav(document.querySelector('#nav')));
    this.Add('toast', new mvc.Toast(document.querySelector('#toast')));
    this.Add('plus', new mvc.Button(document.querySelector('#plus')));
    this.Add('buckets', new mvc.Provider(Bucket, 'https://rpi4b.mutablelogic.com'));
    this.Add('table', new mvc.List(document.querySelector('#table'), '_template'));

    // Buckets
    this.buckets.addEventListener('mvc.provider.error', (sender, error) => {
      this.toast.show(error);
    });
    this.buckets.addEventListener('mvc.provider.added', (sender, bucket) => {
      this.table.set(bucket, bucket.key)
        .replace('._name', bucket.name)
        .replace('._json', bucket.$json);
    });
    this.buckets.addEventListener('mvc.provider.changed', (sender, bucket) => {
      this.table.set(bucket, bucket.key)
        .replace('._name', bucket.name)
        .replace('._json', bucket.$json);
    });
    this.buckets.addEventListener('mvc.provider.deleted', (sender, bucket) => {
      this.table.deleteForKey(bucket.key);
    });
    this.buckets.addEventListener('mvc.provider.completed', (sender, changed) => {
      // Re-sort table if changed
      console.log('Buckets loaded, changed=', changed);
    });
  }
}

window.process = { env: {} };

window.addEventListener('DOMContentLoaded', () => {
  const App = mvc.Controller.New(DataApp);

  // Set up event handlers
  App.main();

  // Request buckets every 30 secs
  App.buckets.request('/api/dataio/', null, null, 30 * 1000);
});
