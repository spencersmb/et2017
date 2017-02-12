const $ = jQuery;

class SearchComponent {
  searchContainer: any;
  searchInput: any;

  constructor() {
    this.searchContainer = document.getElementById("et-search-container");

  }

  public static changePlaceholderText( object: any, text: string ) {
    if ( object ) {
      object[ 0 ].placeholder = text;
    }
  }

  init(): void {

    if ( this.searchContainer ) {
      this.searchInput = this.searchContainer.querySelectorAll('.eltdf-search-field');
    }

    //Change placeholder text here:
    SearchComponent.changePlaceholderText(this.searchInput, "ex: Typography");
  }
}

let Search = new SearchComponent();

export default Search;