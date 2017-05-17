const React = require('react');
const ReactDOM = require('react-dom');

import FontInput from 'FontInput';
import FontList from 'FontList';

class FontApp extends React.Component {

  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.getData = this.getData.bind(this);
    this.onSizeChange = this.onSizeChange.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.isSidebar = this.isSidebar.bind(this);

    this.state = {
      placeholder: "",
      name: "",
      styles: [],
      size: "24",
      sidebar: false,
      isOpen: false,
      touched: false
    };
  }

  componentDidMount() {
    // this runs after component is mounted to React DOM


    /*
     When the component is mounted, get data from the element, which has values plaed on it
     from the php server, depending on what item is clicked.
     
     Alternate way - put refs on element try next time
     // this.refs.nv.addEventListener("nv-enter", this.handleNvEnter); // React .14+
     
     */
    
    let data = this.getData();
    this.setState({
      placeholder: data.placeholder,
      name: data.name,
      styles: data.styles,
      size: "24",
      sidebar: data.sidebar
    });



    /*
     Custom event that is fired outside of the the React app.
     Happens when user clicks on "try" button.

     */
    window.addEventListener('fontCheck', () => {

      let data = this.getData();
      this.setState({
        placeholder: data.placeholder,
        name: data.name,
        styles: data.styles
      });


      /*
       Check for if we should load the sidebar or not
       */
      if( this.state.sidebar ){
        this.open();
      }

      // Option to unmount
      // ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).parentNode);
    });
  }


  /*
   Open and close states when using sidebar

   */
  open(){
    this.setState({
      isOpen: true
    });
  }
  close(e){
    e.preventDefault();

    this.setState({
      isOpen: false
    });
    
  }

  /*
   Styles check for if we are loading the sidebar layout.

   */
  isSidebar(){
    if( this.state.sidebar ){
      return "fp-sidebar";
    }else{
      return;
    }
  }


  /*
   Function that fires everytime a user types something.
   This sets up our two way data binding.

   */
  onInputChange( text ) {
    this.setState({
      placeholder: text,
      touched:true
    });
  }



  /*
   Pull data from the element like an API end point. This data changes on user clicking different products.

   */
  getData() {

    let app = document.getElementById('app');
    //let sidebar = app.dataset.sidebar; // dataset is only available ie11 and above
    let sidebar = app.getAttribute('data-sidebar');
    console.log(app);
    console.log(sidebar)

    // console.log(sidebar === "true");
    /*
     Get styles string, remove spaces & convert to an array.

     */
    //console.log(app.dataset.styles); //ie11 and up
    let styles = app.getAttribute('data-styles').replace(/\s+/g, '').split(',');

    //check if user has touched input
    let previewText = '';


    let initialState = {
      placeholder: app.getAttribute('data-placeholder'),
      name: app.getAttribute('data-name'),
      styles: styles,
      sidebar: (sidebar === "true") ? true : false
    };

    //check if input has been touched
    if(this.state.touched){
      initialState.placeholder = this.state.placeholder;
    }


    return initialState;
  }

  
  
  /*
   Size takes in a number, and we set the state of the current Size.

   */
  onSizeChange( size ) {
    // each time a a button is clicked change the state size attr
    this.setState({
      size: size
    });
  }

  loggedIn(){
    if($("body").hasClass("admin-bar")){
      return "fp-logged-in"
    }
  }

  render() {
    
    let font = this.state;

    /*
     Close button element that gets returned if the sidebar version is true.

     */
    let closeBtn = () => {

      let output = <a id="fp-nav-close" href="#" onClick={this.close} className="fp-close">Close</a>;

      if(this.state.sidebar){
        return output;
      }

    };


    /*
     Style that gets applied if the sidebar is open and sidebar gets activated through state.

     */
    let openClass = () => {
      return ( this.state.isOpen ) ? "active" : "";
    };

    return (
      <div>
        <div className={ this.loggedIn() + " " +openClass() + " " + this.isSidebar()+ " fp-shell"}>
          <div className="fp-topper">
            {closeBtn()}
            <h4 className="fp-sub-title">Font Preview</h4>
            <h2 className="fp-title">{font.name}<span className="fp-divider">/</span><span
              className="fp-size-pt">{font.size}pt</span></h2>
          </div>
          <FontInput onInput={this.onInputChange} font={font} sizeChange={this.onSizeChange}/>
          <FontList font={font}/>
        </div>
        <div className={ openClass() + " fp-overlay"} onClick={this.close}></div>
      </div>

    )
  }
}

module.exports = FontApp;