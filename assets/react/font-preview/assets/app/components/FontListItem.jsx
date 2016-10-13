const React = require('react');
const ReactDom = require('react-dom');


class FontListItem extends React.Component {


  /*
   Output of actual font
   Font.placeholder is the two-way bound text to the input

   */
  render() {
    let { type } = this.props;
    let { font } = this.props;


    /*
     Take in the size that is set on the props font object and return a style tag.

     */
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

    /*
     The font.placeholder text is the two-way bound text to the input.

     Add font size class + a style class if its Regular or italic etc.

     */
    return (
      <div className="fp-item">
        <div className="fp-item-type">{font.name + " " + type}</div>
        <div className={convertFontsize(font.size) + " " + font.name.toLowerCase() + " " + type.toLowerCase() + " text"}>{font.placeholder}</div>
      </div>
    )
  }
}

module.exports = FontListItem;