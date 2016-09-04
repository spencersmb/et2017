const React = require('react');
const ReactDom = require('react-dom');
import reactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
const ReactDOM = reactDOM;

import InstagramApi from "InstagramApi";
import InstagramHelpers from "InstagramHelpers";

class InstagramModal extends React.Component {

  constructor() {
    super();
    this.close = this.close.bind(this);
    this.getModalPosition = this.getModalPosition.bind(this);
    this.comments = [];
  }

  // check if you are using this at the end
  getWindowPosition(){
    let windowTop = $(window).scrollTop();

    if(windowTop > 55){
      return 55;
    }else {
      return 0;
    }

  }

  //example on how to access an element
  getModalPosition(){
    let modal = this.refs.instaModal;


    let $modal = $(modal).find(".insta-modal__content");
    console.log($modal);
    let $modalHeight = $modal.height();
    let $modalWidth = $modal.width();

    let modalStyles = {
      left: ($(window).width() - $modalWidth)/2,
      top: ($(window).height() - $modalHeight)/2
    };
  }

  componentDidMount(){

    // fires once immediately after inital rendering of the component

    // Remove node if there is one
    // $(".reveal-overlay").remove();
    

    // build html and render to string
    // var $modal = $(ReactDOMServer.renderToString(modalMarkup));

    // Attach to domNode
    // $(ReactDOM.findDOMNode(this)).html($modal);

    // Create new instance of a modal
    // var modal = new Foundation.Reveal($('#error-modal'));

    // Open modal
    // modal.open();
  }

  close(e){
    e.preventDefault();
    this.props.close();
  }

  render() {
    console.log("props ",this.props);

    let {photo} = this.props;
    let comments = photo.comments.user_comments;

    let renderComments = () => {
      if( comments ){
       return comments.map( (comment, i) => {
          return (
            <li key={i} className="insta-modal__comment">{comment.text}</li>
          );
        });
      } else {
        return (
          <li>no comments</li>
        )
      }
    };

    let renderType = () => {
        if(photo.type === "video"){

          return(
            <div className="insta-modal__image-inner">
              <div className="insta-modal__image-border">
                <div className="insta-modal__image-padding">
                  <div className="insta-modal__image-position">
                    <div className="insta-modal__image-content">
                      <video
                        width="100%"
                        height="100%"
                        src={photo.videos.standard_resolution.url}
                        controls autoPlay name="media">
                      </video>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          )
        } else {

          let nonSquareImage = '';

          // check photo width & height for square
          if( photo.images.standard_resolution.width !== photo.images.standard_resolution.height ){
            nonSquareImage = {
              paddingBottom: "85%"
            }
          }else {
            nonSquareImage = {
              paddingBottom: "100%"
            }
          }

          return (
            <div className="insta-modal__image-border">
              <div className="insta-modal__image-padding" style={nonSquareImage}>
                <img
                  alt={photo.caption.from.username}
                  width={photo.images.standard_resolution.width}
                  height={photo.images.standard_resolution.height}
                  src={photo.images.standard_resolution.url}
                />
              </div>
            </div>
          )
        }
    };

    let renderModal = () => {
      let windowTop = this.getWindowPosition();

      let modalStyle = {
        top: windowTop
      };

      let modalMarkup = (
        <div className="insta-modal" >
          <div ref="instaModal" className="insta-modal__content">

            <div className="insta-article__wrapper">
              <article className="insta-modal__article">


                {/* Header */}

                <header className="instal-modal__header">

                  <div className="insta-modal__profile">
                    <a href="https://www.instagram.com/everytuesday/" target="_blank" className="insta-modal__profile-image">
                      <img src={photo.caption.from.profile_picture} alt={photo.caption.from.username}/>
                    </a>
                  </div>
                  <div className="insta-modal__profile-name">
                    <a href="https://www.instagram.com/everytuesday/">{photo.caption.from.username}</a>
                  </div>
                  {/* Close BTN */}
                  <div className="modal-close__wrapper">
                    <div className="insta-modal-close">
                      <a onClick={this.close}>Close</a>
                    </div>
                  </div>

                </header>


                {/* IMAGE */}

                <div className="insta-modal__image">
                  {renderType()}
                </div>

                {/* POST */}

                <div className="insta-modal__post">

                  <div className="insta-modal__stats">
                    <div className="insta-modal__likes">{photo.likes.count}</div>
                  </div>

                  <ul className="insta-modal__user-comment">
                    <li><span className="insta-modal__username">{photo.caption.from.username}</span></li>
                    <li>{photo.caption.text}</li>
                    {renderComments()}
                  </ul>

                  <div className="insta-follow">
                    <a href="https://www.instagram.com/everytuesday/" className="eltdf-btn eltdf-btn-medium eltdf-btn-solid et-btn et-btn-blue" target="_blank">Follow Me</a>
                  </div>

                </div>

              </article>
            </div>

          </div>{/* ./insta-modal__content */}

        {/* ./insta-modal */}
        </div>
      );

      return modalMarkup;
    };

    return (
      <div>
        {renderModal()}
      </div>
    )
  }
}

module.exports = InstagramModal;