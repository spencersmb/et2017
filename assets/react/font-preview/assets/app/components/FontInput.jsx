const React = require('react');
const ReactDom = require('react-dom');
class FontInput extends React.Component {

  constructor(){
    super();
    this.handleInput = this.handleInput.bind(this);
    this.changeTextSize = this.changeTextSize.bind(this);
  }

  handleInput(){
    let text = this.refs.example.value;
    this.props.onInput(text);
  }

  changeTextSize(e){
    e.preventDefault();
    let size = e.target.dataset.size;
    this.props.sizeChange(size);


  }

  render() {
    let { font } = this.props;
    return (
      <div className="fp-input-wrapper">
        <span className="fp-enter-text">Enter your text here</span>
        <input type="text" placeholder={font.placeholder} ref="example" onChange={this.handleInput}/>
        <div className="fp-button-wrapper">
          <a href="#" onClick={this.changeTextSize} className={("24" === font.size)? "active": ""} data-size="24"><span className="btn-24" data-size="24">A</span>24pt</a>
          <a href="#" onClick={this.changeTextSize} className={("36" === font.size)? "active": ""} data-size="36"><span className="btn-36" data-size="36">A</span>36pt</a>
          <a href="#" onClick={this.changeTextSize} className={("48" === font.size)? "active": ""} data-size="48"><span className="btn-48" data-size="48">A</span>48pt</a>
          <a href="#" onClick={this.changeTextSize} className={("72" === font.size)? "active": ""} data-size="72"><span className="btn-72" data-size="72">A</span>72pt</a>
        </div>
      </div>
    )
  }
}

module.exports = FontInput;