const React = require('react');
const ReactDOM = require('react-dom');

import InstagramApi from "InstagramApi";
import InstagramList from "InstagramList";
import InstagramModal from "InstagramModal";
import InstagramHelpers from "InstagramHelpers";

class InstagramApp extends React.Component {

  constructor() {
    super();

    this.handlePhotoClick = this.handlePhotoClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getComments = this.getComments.bind(this);
    this.modalOpen = this.modalOpen.bind(this);
    this.modalClose = this.modalClose.bind(this);

    this.state = {
      loaded: false,
      modalOpen: false,
      photos: [],
      selectedPhoto: {
        item: {}
      }
    };
  }

  /*
    getComments pulls from API to return comments of a specific post
    once clicked.
   */
  getComments( photoId, index ){


    /*
     Make API call and get a PROMISE back
     */
    return InstagramApi.getPostComments(photoId).then(( response ) => {

      // take new comments data and find the selected photo in the original array
      // and merge it

      /*
       Set Current state of photos array as variable to update it with the new comments data,
       then update state with new photos array data
       */
      let currentPhotos = this.state.photos;
      let updatePhotoItem = this.state.photos[index];

      
      /*
       Convert data object to an array and Add comments to selectedObject user has clicked on.
       */
      updatePhotoItem.comments.user_comments = InstagramHelpers.toArray(response.data);

      
      /*
       Add the new photo object with comments to the original photos array based on the current index passed in.
       */
      currentPhotos[index] = updatePhotoItem;

      /*
       Update the locally stored data with the new photos array
       */
      localStorage.setItem('etInstagram', JSON.stringify(currentPhotos));

      /*
       Finally update the state with new photos array and update the current selected item with the new data.
       */
      this.setState({
        photos: currentPhotos,
        selectedPhoto:
          {
            item: currentPhotos[index]
          }
      });

    });
  }



  /*
   On component mount get data and set state
   */
  componentDidMount() {

    /*
     Get Data from API call
     */
    let photos = InstagramApi.getPhotos();



    /*
     Check if the data is an array stored in local storage or if its an observable.
     On complete set state.
     */
    if(Array.isArray(photos)){
      this.setState({
        loaded: true,
        photos: photos
      });
    }else{
      photos.subscribe(
        response => {
          this.setState({
            loaded: true,
            photos: response
          });
        },
        error => console.error(error),
        () => console.log('done')
      );
    }


  }


  /*
   Open modal and setStyles so it locks scroll position
   */
  modalOpen(){
    let scrollPosition = $(window).scrollTop();
    let body = {};


    /*
     Set height to 100% on mobile devices to fix white space issue
     */
    if( InstagramHelpers.getDeviceWidth() < 767 ){
      body = {
        top: "-" + scrollPosition + "px",
        position: "fixed",
        width: '100%',
        height: '100%'
      }
    }else {
      body = {
        top: "-" + scrollPosition + "px",
        position: "fixed",
        width: '100%'
      }
    }
    
    $("body").css(body);
    $("footer").css({
      height: '100vh'
    });
    $(".eltdf-sticky-header").addClass("insta-modal__nav-active");
  }


  /*
   Close modal
   */
  modalClose(){
    $("body").css({
      top: 0,
      position: "relative",
      width: 'auto'
    });
    $("footer").css({
      height: 'auto'
    });
    $(".eltdf-sticky-header").removeClass("insta-modal__nav-active");

    /*
     On close remove styles and scroll window back to bottom cus the theme is retarded.
     */
    window.scrollTo(0,document.body.scrollHeight);
  }


  /*
   User clicks photo:
   Get current image from InstagramImage.jsx and passed up through props
   */
  handlePhotoClick(photo){
    // console.log("click");

    let image = this.state.photos[photo.index];
    this.setState({
      modalOpen: true,
      selectedPhoto:
        {
          item: image
        }
    });

    /*
     Check if the photos array has had comments added to it or not, if not
     hit the api and then add it to the photos array - then open the array
     */
    if(!image.comments.user_comments){
      this.getComments(image.id, photo.index);
    }

    this.modalOpen();

  }


  /*
   Close function attached to close button
   */
  handleClose(){

    this.setState({
      modalOpen: false
    });

    this.modalClose();
  }

  render() {

    /*
     Places the model to the dom if the state.modalOpen = true;
     Pass close function to the Modal to hook up to close button
     Pass selected photo to the modal from the state as well
     */
    let renderModal = () => {
      if(this.state.modalOpen){
        return <InstagramModal close={this.handleClose} photo={this.state.selectedPhoto.item} />;
      }
    };

    let renderOverlay = () => {
      if(this.state.modalOpen){
        return (
          <div className="insta-modal__overlay" onClick={this.handleClose}></div>
        );
      }
    };

    return (
      <div className="insta-container">
        <div className="insta-container__header">
          <h4>Latest Instagram shots</h4>
          <a href="https://www.instagram.com/everytuesday/" className="insta-follow-btn" target="_blank">Click to follow!</a>
        </div>
        {/*
         - Send photos to the list to loop through
         - photoclick function passed through to InstagramList.jsx and then through to InstagramImage.jsx
         - dataLoaded passed through to determin preload image display or not
         */}
        <InstagramList photos={this.state.photos} photoclick={this.handlePhotoClick} dataLoaded={this.state.loaded}/>
        {renderModal()}
      </div>
    
    )
  }
}

module.exports = InstagramApp;