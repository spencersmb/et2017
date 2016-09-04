
import Rx from 'rxjs';
import InstagramHelpers from "InstagramHelpers";

module.exports = {

  setTodos: function(todos) {
    if(Array.isArray(todos)){
      // converts array into a string
      localStorage.setItem('todos', JSON.stringify(todos));
      return todos;
    }
  },
  getPhotos: () => {

      const apiData = {
        token: '11037881.a66d80f.4963ba4bf4ec4dc496f24d797a6061aa', // learn how to obtain it below
        userid: 11037881, // User ID - get it in source HTML of your Instagram profile or look at the next example :)
        num_photos: 16 // how much photos do you want to get
      };

      let stringData = localStorage.getItem('etInstagram');
      let data = {};

      let curDate = new Date();
      let date = localStorage.getItem('InstaDate');
      let futureDate = 0;
      let myObj = '';

      // check for date
      if(date !== null) {
        futureDate = JSON.parse(date);
        futureDate = new Date(futureDate);
      }
      // console.log("Primary");
      // console.log("curr", curDate);
      // console.log("future", futureDate);
      // console.log("compare", futureDate > curDate);

      if(stringData !== null && futureDate > curDate){

        data = JSON.parse(stringData);
        return data;

      } else {
        return Rx.Observable.create(observer => {
          $.ajax({
            url: 'https://api.instagram.com/v1/users/' + apiData.userid + '/media/recent', // or /users/self/media/recent for Sandbox
            dataType: 'jsonp',
            type: 'GET',
            data: { access_token: apiData.token, count: apiData.num_photos },
            success: function ( response ) {

              let filteredResponse = InstagramHelpers.toArray(response.data);

                observer.next(filteredResponse);

              //set data in localstorage
              // localStorage.setItem('etInstagram', JSON.stringify(filteredResponse));

              //capture date
              let curDate = new Date().getTime();
              let futureDate = curDate + (12 * 60 * 60 * 1000);
              // console.log("API");
              // console.log("curr", curDate);
              // console.log("future", futureDate);
              // localStorage.setItem('InstaDate', futureDate);


              observer.complete();
              // console.log(data);
              // for( let x in data.data ){
              //   // $('ul').append('<li><img src="'+data.data[x].images.low_resolution.url+'"></li>'); // data.data[x].images.low_resolution.url - URL of image, 306х306
              //   // data.data[x].images.thumbnail.url - URL of image 150х150
              //   // data.data[x].images.standard_resolution.url - URL of image 612х612
              //   // data.data[x].link - Instagram post URL
              // }
            },
            error: function ( data ) {
              console.log(data); // send the error notifications to console
            }
          });
        });
      }
   

  },

  getPostComments: (mediaId) => {
    const apiData = {
      token: '11037881.a66d80f.4963ba4bf4ec4dc496f24d797a6061aa', // learn how to obtain it below
      userid: 11037881 // User ID - get it in source HTML of your Instagram profile or look at the next example :)
    };
    
    return $.ajax({
      url: 'https://api.instagram.com/v1/media/' + mediaId + '/comments', // or /users/self/media/recent for Sandbox
      dataType: 'jsonp',
      type: 'GET',
      data: {access_token: apiData.token},
      success: function(data){
        console.log(data);
        return data;
      },
      error: function(data){
        console.log(data); // send the error notifications to console
      }
    });
    
  },

  filterTodos: function (todos, showCompleted, searchText) {

    let filteredTodos = todos;

    // Filter by showCompleted
    filteredTodos = filteredTodos.filter((todo)=>{
      // only show items that are not completed
      // OR if showCompleted === true, show both false and true items
      // bascailly return false || false, or show all return false || true
      return !todo.completed || showCompleted;
    });

    // Filter by SearchText
    filteredTodos = filteredTodos.filter((todo)=>{
      let text = todo.text.toLowerCase();

      // shorthand way
      return searchText.length === 0 || text.indexOf(searchText) > -1;
    });

    // Sort todos with non-completed first
    // comparison operator basically
    filteredTodos.sort((a, b)=>{
      // -1 return a first
      // 1 return b first
      if(!a.completed && b.completed){
        return -1;
      } else if( a.completed && !b.completed){
        return 1;
      } else {
        return 0;
      }

    });

    return filteredTodos;
  }
  
};