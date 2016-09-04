const React = require('react');
const ReactDOM = require('react-dom');

import InstagramListItem from "InstagramListItem";

class InstagramImage extends React.Component {

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

  componentWillReceiveProps(nextProps){
    // console.log('new props');
  }

  render() {
    let { photo } = this.props;
    console.log(photo);

    let displayIcon = () => {
      if(photo.type === "video"){
        return (
          <span className="insta-image__icon">
            <i className="fa fa-video-camera fa-2x" aria-hidden="true"></i>
          </span>
        );
      } else {
        return (
          <span className="insta-image__icon">
            <i className="fa fa-picture-o fa-2x" aria-hidden="true"></i>
          </span>
        );
      }
    };

    let compareImageSize = () => {

      // check photo width & height for square
      if( photo.images.low_resolution.width !== photo.images.low_resolution.height ){
        return "insta-image__enlarge";
      }

    };

    let checkSrc = ( image ) => {

      let newSrc = '';

      if( image ) {

        return (
        <a href="#" onClick={this.photoClick}>
          <span className="insta-image__overlay"></span>
          {displayIcon()}
          <img src={photo.images.low_resolution.url} alt="Every Tuesday Instagram" className={compareImageSize()}/>
        </a>
        )

      } else {
       return (
         <img src={photo.placeholder} alt="Every Tuesday Instagram" className="img-responsive"/>
       );
      }

    };


    return (
      <div className="insta-item">
        {checkSrc(photo.images)}
      </div>

    )
  }
}

module.exports = InstagramImage;