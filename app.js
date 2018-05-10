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
                      movie.innerHTML = newResponse.title + '</br>' + newResponse.release_date
                      movieList.appendChild(movie);

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


//filmUrl = "https://api.themoviedb.org/3/search/movie?api_key=dc15e9c690891206eda183085e1a1b53&language=en-US&query=star+war"
// XML request for posters
var posters = new XMLHttpRequest();
var imgObject;


/*** 
function loadImage() {
  //get the posters

  var posterUrl = 'https://api.themoviedb.org/3/search/movie?api_key=dc15e9c690891206eda183085e1a1b53&language=en-US&query=star+war'
  posters.open('GET', posterUrl, true);
  posters.responseType = 'text';
  posters.send(null);
}*/

//get the posters
posters.open('GET', 'https://api.themoviedb.org/3/search/movie?api_key=dc15e9c690891206eda183085e1a1b53&language=en-US&query=star+war', true);
posters.responseType = 'text';
posters.send(null);

posters.onload = function() {
  if (posters.status === 200 && posters.status < 400) {
    imgObject = JSON.parse(posters.responseText);
    console.log(imgObject);
    for ( let i = 0; i< imgObject.results.length; i++){
      var imageTitle = imgObject.results[i].original_title;
      var imagePath = imgObject.results[i].poster_path;
      /**
      A New Hope = http://image.tmdb.org/t/p/w500/btTdmkgIvOi0FFip1sPuZI2oQG6.jpg
      attack of the clones = http://image.tmdb.org/t/p/w500/2vcNFtrZXNwIcBgH5e2xXCmVR8t.jpg
      the phantom menance = http://image.tmdb.org/t/p/w500/n8V09dDc02KsSN6Q4hC2BX6hN8X.jpg
      revenge of the sith = http://image.tmdb.org/t/p/w500/tgr5Pdy7ehZYBqBkN2K7Q02xgOb.jpg
      the force awakens = http://image.tmdb.org/t/p/w500/weUSwMdQIa3NaXVzwUoIIcAi85d.jpg
      the empire strike back = http://image.tmdb.org/t/p/w500/6u1fYtxG5eqjhtCPDx04pJphQRW.jpg
      return of the jedi = http://image.tmdb.org/t/p/w500/jx5p0aHlbPXqe3AH9G15NvmWaqQ.jpg
       */
    }

  } //end if
} //end function

//Get movie title 
function showPosters(){

  var posters = Array.from(document.querySelectorAll('#movieList>ol>li'),li => li.innerHTML)
  var imgSrc = [];

  for (var i = 0; i < posters.length; i++){
    switch(posters[i]) {
      case "A New Hope<br>1977-05-25":
        imgSrc.push('http://image.tmdb.org/t/p/w342/btTdmkgIvOi0FFip1sPuZI2oQG6.jpg');
      break;
      case "Attack of the Clones<br>2002-05-16":
        imgSrc.push('http://image.tmdb.org/t/p/w342/2vcNFtrZXNwIcBgH5e2xXCmVR8t.jpg');
      break;
      case "The Phantom Menace<br>1999-05-19":
        imgSrc.push('http://image.tmdb.org/t/p/w342/n8V09dDc02KsSN6Q4hC2BX6hN8X.jpg');
      break;
      case "Revenge of the Sith<br>2005-05-19":
        imgSrc.push('http://image.tmdb.org/t/p/w342/tgr5Pdy7ehZYBqBkN2K7Q02xgOb.jpg');
      break;
      case "Return of the Jedi<br>1983-05-25":
        imgSrc.push('http://image.tmdb.org/t/p/w342/jx5p0aHlbPXqe3AH9G15NvmWaqQ.jpg');
      break;
      case "The Empire Strikes Back<br>1980-05-17":
        imgSrc.push('http://image.tmdb.org/t/p/w342/6u1fYtxG5eqjhtCPDx04pJphQRW.jpg');
      break;
      case "The Force Awakens<br>2015-12-11":
        imgSrc.push('http://image.tmdb.org/t/p/w342/weUSwMdQIa3NaXVzwUoIIcAi85d.jpg');
      break;
      default:
        console.log('Sorry! No Images');
  }
    
}
console.log(imgSrc);

$(document).ready(function(){  
  for(var j=0 ; j < imgSrc.length ; j++) {
    $('<div class="item"><img class="center-block img-responsive" src="'+ imgSrc[j] +'"><div class="carousel-caption"></div>   </div>').appendTo('.carousel-inner');
    $('<li data-target="#carousel-example-generic" data-slide-to="'+j+'"></li>').appendTo('.carousel-indicators')

  }
  $('.item').first().addClass('active');
  $('.carousel-indicators > li').first().addClass('active');
  $('#carousel-example-generic').carousel();
});
   
}


