let button    = document.querySelector('#button')
let name      = document.querySelector('#name')
let height    = document.querySelector('#height')
let mass      = document.querySelector('#mass')
let hairColor = document.querySelector('#hair-color')
let skinColor = document.querySelector('#skin-color')
let eyeColor  = document.querySelector('#eye-color')
let gender    = document.querySelector('#gender')
let birthYear = document.querySelector('#birth-year')
let movies    = document.querySelector('#movieList')
let resident  = document.querySelector('#resident')
let home      = document.querySelector('#home')


document.addEventListener('DOMContentLoaded', bindButton);

function bindButton() {

  $("#submit").click(function(e){
    var star = document.getElementById('star');
  for (var j = 1; j < 10; j++) {
  (function(i) {
  var f = i;
  var req = new XMLHttpRequest();
  var URLhost = 'https://swapi.co/api/people/?page=' + f;
  req.open('GET', URLhost, true);
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      var response = JSON.parse(req.responseText);
      console.log(response);
      for (var k = 0; k < response.results.length; k++) {
        (function(y) {
          var val = $("#input").val();
          if ( val.toLowerCase() !== response.results[y].name.toLowerCase()){
             // help users to find names
             $("#list-names").css("visibility","visible");
          } else if ( val.toLowerCase() === response.results[y].name.toLowerCase())
          {
            name.innerText = response.results[y].name;
            console.log(response.results[y].name);
            height.innerText = response.results[y].height;
            mass.innerText = response.results[y].mass;
            hairColor.innerText = response.results[y].hair_color;
            skinColor.innerText = response.results[y].skin_color;
            eyeColor.innerText = response.results[y].eye_color;
            birthYear.innerText = response.results[y].birth_year; 
            gender.innerText = response.results[y].gender;
            var homeReq = new XMLHttpRequest();
            var planetURL = response.results[y].homeworld.toString();
            homeReq.open('GET', planetURL, true);
            homeReq.addEventListener('load', function () {
              if (homeReq.status >= 200 && homeReq.status < 400) {
                var planetResponse = JSON.parse(homeReq.responseText);
                console.log(planetResponse);
                home.innerText = planetResponse.name;
              } else {
                console.log('Error in network request: ' + req.statusText);
              }});
              homeReq.send(null);
              event.preventDefault();

            if (response.results[y].films.length > 0) {
              var movieList = document.createElement('ol');
              for (var e = 0; e < response.results[y].films.length; e++) {
                (function(x) {
                  var newURLhost = response.results[y].films[x];
                  var newReq = new XMLHttpRequest();
                  newReq.open('GET', newURLhost, true);
                  newReq.addEventListener('load', function(){
                    if(newReq.status >= 200 && newReq.status < 400){
                      var newResponse = JSON.parse(newReq.responseText);
                      var movie = document.createElement('li');
                      movie.textContent = newResponse.title + ' ' + newResponse.release_date;
                      movieList.appendChild(movie);
                      console.log(movieList);
                      var list = document.getElementById('movieList');     // Get the target element
                       list.innerHTML = "";                            // Remove previous content
                       list.appendChild(movieList); // Append your generated UL 

                    } else {
                      console.log("Error in network request: " + newReq.statusText);
                    }});
                  newReq.send(null);
                  event.preventDefault();
                })(e);
              }
          }         
          }
    })(k);
    }
    
    } else {
      console.log('Error in network request: ' + req.statusText);
    }});
    req.send(null);
    //event.preventDefault();
    })(j)
    }
  });
}



  


