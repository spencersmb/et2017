
import Rx from 'rxjs';
import InstagramHelpers from "InstagramHelpers";

const apiData = {
  token: '11037881.a66d80f.4963ba4bf4ec4dc496f24d797a6061aa', // learn how to obtain it below
  userid: 11037881, // User ID - get it in source HTML of your Instagram profile or look at the next example :)
  num_photos: 16 // how much photos do you want to get
};

module.exports = {


  /*
   Get Photos api call
   */
  getPhotos: () => {
    
      /*
       Check for local storage data exists and check time against local storage time.
       If there is data and if the stored time is older than the current time, then refresh data.
       */
      let stringData = localStorage.getItem('etInstagram');
      let data = {};

      let curDate = new Date();
      let date = localStorage.getItem('InstaDate');
      let futureDate = 0;
      let myObj = '';

      // if there is a date, conver it
      if(date !== null) {
        futureDate = JSON.parse(date);
        futureDate = new Date(futureDate);
      }
      // console.log("Primary");
      // console.log("curr", curDate);
      // console.log("future", futureDate);
      // console.log("compare", futureDate > curDate);



      /*
       If there is local data and the future date is still in the future,
       serve up the locally stored data.
       
       Else: Get new data from the API
       */
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

              /*
               Filter Data Object into an array
               */
              let filteredResponse = InstagramHelpers.toArray(response.data);


              /*
               Pass data into observable
               */
              observer.next(filteredResponse);

              
              /*
               Set new data as localStorage
               */
              localStorage.setItem('etInstagram', JSON.stringify(filteredResponse));



              /*
               Create future data 12 hours ahead of the current date.
               Then set the future date into local storage.
               */
              let curDate = new Date().getTime();
              let futureDate = curDate + (12 * 60 * 60 * 1000);
              localStorage.setItem('InstaDate', futureDate);
              
              // console.log("API");
              // console.log("curr", curDate);
              // console.log("future", futureDate);


              /*
               Tell Observable its complete
               */
              observer.complete();
              
              
             
            },
            error: function ( data ) {
              console.log(data); // send the error notifications to console
            }
          });
        });
      }
   

  },


  /*
   Take in ID of a specific post and get that posts list of comments
   */
  getPostComments: (mediaId) => {

    return $.ajax({
      url: 'https://api.instagram.com/v1/media/' + mediaId + '/comments', // or /users/self/media/recent for Sandbox
      dataType: 'jsonp',
      type: 'GET',
      data: {access_token: apiData.token},
      success: function(data){
        // console.log(data);
        return data;
      },
      error: function(data){
        console.log(data); // send the error notifications to console
      }
    });
    
  }
  
};