/* eslint-disable max-classes-per-file */

class ProjectsApp extends mvc.Controller {
  main() {
    // Add objects to the application
    this.Add('nav', new mvc.Nav(document.querySelector('#nav')));
    this.Add('toast', new mvc.Toast(document.querySelector('#toast')));
    this.Add('plus', new mvc.Button(document.querySelector('#plus')));
    this.Add('form', new mvc.Form(document.querySelector('#form')));
    this.Add('projects', new mvc.Provider(Project, 'https://rpi4b.mutablelogic.com'));
    this.Add('table', new mvc.List(document.querySelector('#table'), '_template'));

    // Show toast when button pressed
    this.plus.addEventListener('mvc.button.click', (sender, target) => {
      this.form.replace('._range', '');
      this.form.show({
        name: 'default',
        radio: 'option2',
        range: '0',
        select: '3',
      });
    });

    // Hide form when submitted
    this.form.addEventListener('mvc.form.submit', (sender, target) => {
      // Hide form
      this.form.hide();

      // Show toast of values
      this.toast.show(JSON.stringify(this.form.values), target.id);
    });

    // Form range value
    this.form.addEventListener('mvc.form.change', (sender, target) => {
      if (target.name === 'range') {
        this.form.replace('._range', target.value);
      }
    });

    // Set active row
    this.table.addEventListener('mvc.list.click', (sender, target, key) => {
      this.table.setClassForKey(key, 'table-active');
    });

    // Projects
    this.projects.addEventListener('mvc.provider.error', (sender, error) => {
      this.toast.show(error);
    });
    this.projects.addEventListener('mvc.provider.added', (sender, project) => {
      this.table.set(project, project.key)
        .replace('._name', project.name)
        .replace('._json', project.$json);
    });
    this.projects.addEventListener('mvc.provider.changed', (sender, project) => {
      this.table.set(project, project.key)
        .replace('._name', project.name)
        .replace('._json', project.$json);
    });
    this.projects.addEventListener('mvc.provider.deleted', (sender, project) => {
      this.table.deleteForKey(project.key);
    });
    this.projects.addEventListener('mvc.provider.completed', (sender, changed) => {
      // Re-sort table if changed
      console.log('Projects loaded, changed=', changed);
    });
  }
}

// Models
class Project extends mvc.Model { }
mvc.Model.define(Project, {
  key: '_id string',
  name: 'string',
  status: 'string',
  createdDate: 'created_date date',
  updatedDate: 'updated_date date',
  tags: '{}string',
});

window.process = { env: {} };

window.addEventListener('DOMContentLoaded', () => {
  const App = mvc.Controller.New(ProjectsApp);

  // Set up event handlers
  App.main();

  // Request projects every 30 secs
  App.projects.request('/api/project/', null, null, 30 * 1000);
});
