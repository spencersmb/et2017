const React = require('react');
const ReactDOM = require('react-dom');

class InstagramImage extends React.Component {

  constructor() {
    super();
    this.photoClick = this.photoClick.bind(this);
  }


  /*
   Click event for each item: 
   Get the item clicked and its index and then pass it up the chain to InstagramApp.jsx to initialize the Modal with
   the selected Item.
   */
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
    // console.log(photo);


    /*
     Determine what icon to display:
     Video or Image
     */
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


    /*
     Determine if the image is a square or not to scale its size in the grid
     */
    let compareImageSize = () => {

      // check photo width & height for square
      if( photo.images.low_resolution.width !== photo.images.low_resolution.height ){
        return "insta-image__enlarge";
      }

    };


    /*
     check if the image object is full of images or empty:
     If empty load the preload image graphic, else load the image from the API
     */
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
           <img src={photo.placeholder} alt="Every Tuesday Instagram" className="img-responsive preloaded"/>
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