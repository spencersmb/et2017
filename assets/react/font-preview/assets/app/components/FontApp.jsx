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
      isOpen: false
    };
  }

  componentDidMount() {
    // this runs after component is mounted to React DOM

    // When the component is mounted, grab a reference and add a DOM listener;
    // this.refs.nv.addEventListener("nv-enter", this.handleNvEnter); // React .14+
    let data = this.getData();
    this.setState({
      placeholder: data.placeholder,
      name: data.name,
      styles: data.styles,
      size: "24",
      sidebar: data.sidebar
    });

    // Create an event listener for buttons clicked on page outside of react app
    document.addEventListener('fontCheck', () => {

      // Once event fires get new data and set state
      let data = this.getData();
      this.setState({
        placeholder: data.placeholder,
        name: data.name,
        styles: data.styles
      });

      if( this.state.sidebar ){
        this.open();
      }

      // Option to unmount
      // ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).parentNode);
    });
  }

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

  isSidebar(){
    if( this.state.sidebar ){
      return "fp-sidebar";
    }else{
      return;
    }
  }

  onInputChange( text ) {
    // function to run when user types into input - set state each time
    this.setState({
      placeholder: text
    });
  }

  getData() {

    // Pull data from the app data- attributes
    let app = document.getElementById('app');
    let sidebar = app.dataset.sidebar;

    console.log(sidebar === "true");
    // remove spaces and convert string to array
    let styles = app.dataset.styles.replace(/\s+/g, '').split(',');

    let initialState = {
      placeholder: app.dataset.placeholder,
      name: app.dataset.name,
      styles: styles,
      sidebar: (sidebar === "true")
    };

    return initialState;
  }

  onSizeChange( size ) {
    // each time a a button is clicked change the state size attr
    this.setState({
      size: size
    });
  }

  render() {
    let font = this.state;
    let closeBtn = () => {

      let output = <a id="fp-nav-close" href="#" onClick={this.close} className="fp-close">Close</a>;

      if(this.state.sidebar){
        return output;
      }

    };
    let openClass = () => {
      return ( this.state.isOpen ) ? "active" : "";
    };

    return (
      <div>
        <div className={ openClass() + " " + this.isSidebar()+ " fp-shell"}>
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