const React = require('react');
const ReactDom = require('react-dom');
import FontListItem from 'FontListItem';

class FontList extends React.Component {

  render() {
    /*
     Get styles string, remove spaces & convert to an array.
     font = {
       placeholder: "my placeholder",
       name: "Hawthorne",
       styles: ["Regular", "Script"],
       size: "24",
       sidebar: "True or false"
     }
     */
    let { font } = this.props;

    /*
     Loop through and render out each output based on the style array
     pass in styles to it and and the font object
     */
    
    let renderTodos = () => {
      return font.styles.map(( style, i ) => {
        return (
          <FontListItem key={i} type={style} font={font}/>
        )
      });
    };

    return (
      <div className="fp-list-wrapper">
          {renderTodos()}
      </div>
    )
  }
}

module.exports = FontList;