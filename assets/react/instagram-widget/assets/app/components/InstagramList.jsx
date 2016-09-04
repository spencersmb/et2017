const React = require('react');
const ReactDOM = require('react-dom');

import InstagramListItem from "InstagramListItem";

class InstagramList extends React.Component {
  
  constructor() {
    super();
    this.handlePhotoClick = this.handlePhotoClick.bind(this);
  }

  handlePhotoClick( photo ){
    this.props.photoclick( photo );
  }
  
  componentWillReceiveProps(nextProps){
    // console.log('new props');
  }

  render() {
    let { photos } = this.props;
    let renderPhotos = () => {
      // check for object length
      return photos.map( ( photo, i ) => {
        return (
          <InstagramListItem key={i} photo={photo} photoclick={this.handlePhotoClick} index={i}/>
        );
      });
    };

    return (
      <div className="insta-items">
        {renderPhotos()}
      </div>

    )
  }
}

module.exports = InstagramList;