$(document).ready(function() {
    //Request helper function. 
    const request = (options, cb) => {
      $.ajax(options)
        .done(response => {
          cb(response);
        })
        .fail(err => {
          console.log('Error: ', err);
        })
        .always(() => {
          console.log('Request completed.');
        });
    };


  //Form submission using JQuery. Post request.
  // $(".col-4 form ").submit(function(event) {
  //     event.preventDefault();
  //     let nameText = $('form .mapnamearea');
  //     let descriptionText = $('form textarea');
  //       if(nameText.length > 15) {
  //         alert('Too Long!')
  //         //change alerts to RED star or bubble pop up
  //       } else if (nameText.length === 0) {
  //         alert('There is NOTHING!') 
  //       } 
        // else {
        //   get the form submission from post call 
        //   dont know how
        // move to maps.js somehow.
        // remove the require
        //
        // }

      })
  });