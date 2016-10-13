const React = require('react');
const ReactDOM = require('react-dom');

import InstagramImage from "InstagramImage";
import InstagramApp from "InstagramApp";

class InstagramList extends React.Component {
  
  constructor() {
    super();
    this.handlePhotoClick = this.handlePhotoClick.bind(this);
  }

  /*
   function passed from InstagramApp.jsx to make available to InstagramImage
   */
  handlePhotoClick( photo ){
    this.props.photoclick( photo );
  }
  
  componentWillReceiveProps(nextProps){
    // console.log('new props');
  }

  render() {
    let { photos } = this.props;
    let { dataLoaded } = this.props;



    /*
     Check if photos array is empty if it is that means there is no data yet.
     If not data load the placeholder images
     */
    let renderPhotos = () => {
      
      if( Array.isArray(photos) && photos.length > 0 ){
        return photos.map( ( photo, i ) => {
          return (
            <InstagramImage key={i} photo={photo} photoclick={this.handlePhotoClick} index={i}/>
          );
        });
      }else {
        //get file path
        let imagePath = $("#instaApp").data("path");

        let tempData = [
          {
            placeholder: imagePath + '/images/insta-preload-img.jpg'
          },
          {
            placeholder: imagePath + '/images/insta-preload-img.jpg'
          },
          {
            placeholder: imagePath + '/images/insta-preload-img.jpg'
          },
          {
            placeholder: imagePath + '/images/insta-preload-img.jpg'
          },
          {
            placeholder: imagePath + '/images/insta-preload-img.jpg'
          },
          {
            placeholder: imagePath + '/images/insta-preload-img.jpg'
          },
          {
            placeholder: imagePath + '/images/insta-preload-img.jpg'
          },
          {
            placeholder: imagePath + '/images/insta-preload-img.jpg'
          },
          {
            placeholder: imagePath + '/images/insta-preload-img.jpg'
          },
          {
            placeholder: imagePath + '/images/insta-preload-img.jpg'
          },
          {
            placeholder: imagePath + '/images/insta-preload-img.jpg'
          },
          {
            placeholder: imagePath + '/images/insta-preload-img.jpg'
          },
          {
            placeholder: imagePath + '/images/insta-preload-img.jpg'
          },
          {
            placeholder: imagePath + '/images/insta-preload-img.jpg'
          },
          {
            placeholder: imagePath + '/images/insta-preload-img.jpg'
          },
          {
            placeholder: imagePath + '/images/insta-preload-img.jpg'
          }
        ];
        
        return tempData.map(( photo, i ) => {
          return (
            <InstagramImage key={i} photo={photo} photoclick="" index={i}/>
          );

        });
      }
      
    };

    
    
    /*
     Styling for the container if the data is loaded 
     */
    let loadedStyles = {
      padding: '0',
      width: '100%'
    };


    return (
      <div className="insta-items insta-fadein" style={(!dataLoaded) ? {padding: '0 5px'}: loadedStyles }>
        {renderPhotos()}
      </div>

    )
  }
}

module.exports = InstagramList;