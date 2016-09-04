const React = require('react');
const ReactDom = require('react-dom');
import FontListItem from 'FontListItem';

class FontList extends React.Component {

  render() {
    // pull object in from props
    let { font } = this.props;

    // loop through and render out each output based on style
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