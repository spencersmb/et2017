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
    return InstagramApi.getPostComments(photoId).then(( response ) => {

      // take new comments data and find the selected photo in the original array
      // and merge it
      let currentPhotos = this.state.photos;
      
      let updatePhotoItem = this.state.photos[index];

      //add comments to item in original array
      updatePhotoItem.comments.user_comments = InstagramHelpers.toArray(response.data);

      //change master array
      currentPhotos[index] = updatePhotoItem;

      //update localstorage
      localStorage.setItem('etInstagram', JSON.stringify(currentPhotos));

      // update state
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
    $("body").css({
      top: "-" + scrollPosition + "px",
      position: "fixed",
      width: '100%'
    });
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



    return (
      <div className="insta-container">
        <h4>Latest Instagram shots</h4>
        {/*
         - Send photos to the list to loop through
         - photoclick function passed through to InstagramList.jsx and then through to InstagramImage.jsx
         - dataLoaded passed through to determin preload image display or not
         */}
        <InstagramList photos={this.state.photos} photoclick={this.handlePhotoClick} dataLoaded={this.state.loaded}/>
        {renderModal()}
        <a href="https://www.instagram.com/everytuesday/" className="insta-follow-btn" target="_blank">Follow me</a>
      </div>
    
    )
  }
}

module.exports = InstagramApp;