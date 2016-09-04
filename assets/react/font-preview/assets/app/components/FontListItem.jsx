const React = require('react');
const ReactDom = require('react-dom');


class FontListItem extends React.Component {

  // Output of actual font 
  // Font.placeholder is the two-way bound text to the input
  
  render() {
    let { type } = this.props;
    let { font } = this.props;

    let convertFontsize = ( oldSize ) => {

      let newSize;

      switch (oldSize){

        case "24":
          newSize = "small";
          break;
        case "36":
          newSize = "medium";
          break;
        case "48":
          newSize = "large";
          break;
        case "72":
          newSize = "xtra-large";
          break;

      }

      return newSize;
    };

    return (
      <div className="fp-item">
        <div className="fp-item-type">{font.name + " " + type}</div>
        <div className={convertFontsize(font.size) + " " + font.name.toLowerCase() + " " + type.toLowerCase() + " text"}>{font.placeholder}</div>
      </div>
    )
  }
}

module.exports = FontListItem;