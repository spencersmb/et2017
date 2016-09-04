const React = require('react');
const ReactDom = require('react-dom');

// Import components
import InstagramApp from 'InstagramApp';

//can require main css file using style and css loader
// App CSS
require('style!css!sass!applicationStyles');

// Render App to DOM
ReactDom.render(

  <InstagramApp />,
  document.getElementById('instaApp')
  
);