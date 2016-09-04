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

  componentDidMount() {

    // this runs after component is mounted to React DOM
    let photos = InstagramApi.getPhotos();

    //determin if the return is an array to do subscribe or not
    if(Array.isArray(photos)){
      this.setState({
        photos: photos
      });
    }else{
      photos.subscribe(
        response => {
          this.setState({
            photos: response
          });
        },
        error => console.error(error),
        () => console.log('done')
      );
    }



  }

  modalOpen(){
    let scrollPosition = $(window).scrollTop();
    $("body").css({
      top: "-" + scrollPosition + "px",
      position: "fixed"
    });
    $(".eltdf-sticky-header").addClass("insta-modal__nav-active");
  }
  modalClose(){
    $("body").css({
      top: 0,
      position: "relative"
    });
    $(".eltdf-sticky-header").removeClass("insta-modal__nav-active");
    // $('html, body').animate({scrollBottom:0}, 'slow');
    window.scrollTo(0,document.body.scrollHeight);
  }
  handlePhotoClick(photo){
    console.log("click");
    let image = this.state.photos[photo.index];
    this.setState({
      modalOpen: true,
      selectedPhoto:
        {
          item: image
        }
    });

    // check for comments
    if(!image.comments.user_comments){
      this.getComments(image.id, photo.index);
    }else{
      console.log("local storage");
    }

    this.modalOpen();

  }
  handleClose(){
    console.log("close");
    this.setState({
      modalOpen: false
    });
    this.modalClose();
  }

  render() {
    let renderModal = () => {
      if(this.state.modalOpen){
        return <InstagramModal close={this.handleClose} photo={this.state.selectedPhoto.item} />;
      }
    };
    
    return (
      <div className="insta-container">
        <InstagramList photos={this.state.photos} photoclick={this.handlePhotoClick}/>
        {renderModal()}
      </div>
    
    )
  }
}

module.exports = InstagramApp;