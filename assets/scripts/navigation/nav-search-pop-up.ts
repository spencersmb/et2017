import * as $ from "jquery";
declare var TimelineLite: any;
declare var TweenLite: any;

class SearchNavComponent {
    searchBtn: JQuery;
    searchBar: JQuery;
    input: JQuery;
    closeBtn: JQuery;
    isOpen: boolean;

  constructor() {
    this.searchBar = $('.et2017-navsearch__bar');
    this.searchBtn = $('.et2017-navsearch__btn');
    this.input = this.searchBar.find('input[type=text]');
    this.isOpen = false;
  }

  searchToggle (e: Event): void {
    e.preventDefault();
    
    if(!this.isOpen){
      this.isOpen = true;
      this.searchOpen();
    }else{
      this.isOpen = false;
      this.searchClose();
    }
  }
  
  searchOpen(): void{
    let animation = new TimelineLite();
    animation
      //scale circle to full size and render it in the center
      //on complete animate in the close Btn
      .to( this.searchBar, .2,
        {
          scale: 1,
          display: "block",
          transformOrigin: '50% 50%',
          onComplete: () =>{
            this.searchBtn.addClass('active');
          }
        }
      )
      //Move search down
      .to( this.searchBar, .2,
        {
          y: 23
        }
      )
      //expand search and fade input in
      .to( this.searchBar, .2,
        {
          width: 215,
          onComplete: () => {
            TweenLite.to(this.input, .2, {
              opacity: "1"
            });
          }
        }
      );
  }

  searchClose(): void{
    let animation = new TimelineLite();

    animation
      .to( this.input, 0,
        {
          opacity: 0,
          onComplete: () =>{
            this.searchBtn.removeClass('active');
          }
        }
      )
      .to( this.searchBar, .2,
        {
          width: 35
        }
      )
      .to( this.searchBar, .2,
        {
          y: -32,
        }
      )
      .to( this.searchBar, .2,
        {
          scale: 0,
          display: "block"
        }
      );
  }

  init(): void {

    this.searchBtn.on('click', this.searchToggle.bind(this));

  }
}

let SearchNav = new SearchNavComponent();

export default SearchNav;