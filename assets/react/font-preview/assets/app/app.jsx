const React = require('react');
const ReactDom = require('react-dom');

// Import components
import FontApp from 'FontApp';

//can require main css file using style and css loader
// App CSS
require('style!css!postcss-loader!sass!applicationStyles');

// Render App to DOM
ReactDom.render(

  <FontApp />,
  document.getElementById('app')
  
);