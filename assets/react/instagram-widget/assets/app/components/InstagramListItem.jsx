const React = require('react');
const ReactDom = require('react-dom');

class InstagramListItem extends React.Component {

  constructor() {
    super();
    this.photoClick = this.photoClick.bind(this);
  }

  photoClick(e){
    e.preventDefault();

    let el = {
      item: this.props.photo,
      index: this.props.index
    };
    
    this.props.photoclick( el );
  }

  render() {
    let { photo } = this.props;
    let { index } = this.props;

    return (

      <div className="insta-item">
        <a href="#" onClick={this.photoClick}>
          <img src={photo.images.low_resolution.url} alt="Every Tuesday Instagram" className="img-responsive"/>
        </a>
      </div>
    )
  }
}

module.exports = InstagramListItem;