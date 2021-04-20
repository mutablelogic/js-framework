// js-framework

// Model, Controller, Provider
import Model from './model';
import Controller from './controller';
import Provider from './provider';

// Views
import View from './view';
import List from './list';
import Toast from './toast';
import Nav from './nav';
import Button from './button';
import Form from './form';

// Utils
import Error from './error';
import Emitter from './emitter';
import './string';

// CSS and Fonts
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap-icons/font/fonts/bootstrap-icons.woff';
import 'bootstrap-icons/font/fonts/bootstrap-icons.woff2';
import '../css/style.css';

// Exports
export default {
  Model, View, Controller, Provider, Error, Emitter, List, Nav, Toast, Button, Form,
};
