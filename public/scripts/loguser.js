$(document).ready(function() {
      //Request helper function. 
      const request = (options, cb) => {
        $.ajax(options)
          .done(response => {
            cb(response); //will put the actions on success
            //save session cookies
          })
          .fail(err => {
            console.log('Error: ', err);
          })
          .always(() => {
            console.log('Request completed.');
          });
      };


    //Form submission using JQuery. Post request.
    $(".form-group form").submit(function(event) {
        event.preventDefault();
        let loggingText = $("form textarea");

          // if(loggingText.length > 10) {
          //   alert('Too Long!')
          //   //change alerts to RED star or bubble pop up
          // } else if (loggingText.length === 0) {
          //   alert('There is NOTHING!') 
          // } else {
                $.ajax({
                  type: "GET",
                  url: "api/users/login/Bob",
                  success: function(data, textStatus) {
                  
                    // data.redirect contains the string URL to redirect to
                    window.location.href = "/api/maps/allmaps";
                  }
                })
                // .done(results => { 
                  
                //   // console.log('Results:', results) 
                // })
          // }
        })
    });