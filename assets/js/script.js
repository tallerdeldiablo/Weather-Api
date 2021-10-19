var tableBody = document.getElementById('repo-table');
var wButton = document.getElementById('fetch-button');
var weaEl = document.getElementById('wea');
const theKey = 'd3cead6b24ef04751594f3f9dfdaba4a';
const theUrl = 'api.openweathermap.org/data/2.5/weather?id=';
var date = moment().format("MMMM Do, YYYY, H a");
var tomorro = moment().add(1, 'days').format("MMMM Do"); 
//$("#fivedays").slideToggle();
var obj = {
}
document.getElementById("Tdate").innerHTML = date;

var todoFiveCities = document.querySelector("#fivedays");
var cityInput = document.querySelector("#city-text");
var todoForm = document.querySelector("#todo-form");
var todoCity = document.querySelector("#cities");
//var todoCountSpan = document.querySelector("#todo-count");
var CountSpan;
var citiesArray = [];

function citiesfromLOCA() {
  // Clear todoCity element and update todoCountSpan
  todoCity.innerHTML = "";

  for (var i = 0; i < citiesArray.length; i++) {
    var citytoBtn = citiesArray[i];

    var li = document.createElement("li");
    li.setAttribute("data-index", i);
    

    var buttonC = document.createElement("button");
   
    buttonC.textContent = citytoBtn;
    
     li.appendChild(buttonC);
    todoCity.appendChild(li);
    }
}

function init() {
  // Cities from localStorage
  var citiesStored = JSON.parse(localStorage.getItem("citiesArray"));

  if (citiesStored !== null) {
    citiesArray = citiesStored;
  }
  citiesfromLOCA();
}

function storeCitiesLOCA() {
  
  localStorage.setItem("citiesArray", JSON.stringify(citiesArray));
}

todoForm.addEventListener("submit", function(event) {
  event.preventDefault();
  var cityText = cityInput.value.trim();

  if (cityText === "") {
    return;
  }

  citiesArray.push(cityText);
  cityInput.value = "";
  if (citiesArray.length >5) {
    citiesArray.splice(0, 1);
  }
  
  // Store updated cities in localStorage, re-render the list
  storeCitiesLOCA();
  citiesfromLOCA();
  getApi(cityText);
});

init()


//----------------------------end buttonslocal

function getApi(acity) {
 // const acity =  document.getElementById('inpuCity');
  //const theCity = acity.value.trim();

//request city for lat and lon

var requestUrlCity = 'https://api.openweathermap.org/data/2.5/forecast?q='+acity+'&appid=d3cead6b24ef04751594f3f9dfdaba4a&units=imperial';

var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+acity+'&appid=d3cead6b24ef04751594f3f9dfdaba4a&units=imperial';

 
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
   
let latit = data.coord.lat; //take latitud from the respone
let longi = data.coord.lon;
let iconURL =  data.weather[0].icon +"@2x.png";
console.log( latit);
console.log(longi);
console.log(data);
console.log(data.name);
let requestUrlFive = 'https://api.openweathermap.org/data/2.5/onecall?&lat='+ latit +'&lon='+ longi +'&units=imperial&exclude=alerts&appid=d3cead6b24ef04751594f3f9dfdaba4a';




fetch(requestUrlFive)
.then(function (response) {
  return response.json();

})
.then(function (elwe) {
  console.log(elwe.daily)



 //create elements
 //var createTableRow = document.createElement('tr');
// var newuli = document.createElement('ul');
 var link1 = document.createElement('li');

 link1.textContent = elwe.name ;
//  CREATE DAY BY DAY ------------------------------------------------------------
 function createFiveDays() {

  todoFiveCities.innerHTML = "";

  for (var i = 0; i < citiesArray.length; i++) {
    //var citytoBtn = citiesArray[i];

    let buttonCit = document.createElement("p");
    let ul = document.createElement("ul");
    let uli = document.createElement("li");
    let pTempe = document.createElement("li");
    let pWind =  document.createElement("li");
    let pUVI =  document.createElement("li");
    buttonCit.textContent = "Day"+ i;

   
    ul.setAttribute("data-index", i);
    uli.setAttribute("data-index", i);
    pTempe.setAttribute("data-index", i);
    pWind.setAttribute("data-index", i);
    pUVI.setAttribute("data-index", i);

   tContent = "Day"+ i;

    uli.textContent = "Temp" +  elwe.daily[i].temp.day;
    pWind.textContent = "Wind " +  elwe.daily[i].wind_speed;
    pTempe.textContent = "humid " +  elwe.daily[i].humidity;
    pUVI.textContent = "uvi " +  elwe.daily[i].uvi;
    //pWind.textContent = "Temperature " +  elwe.daily[i].humidity;

     //ul.appendChild(buttonCit);
     ul.appendChild(uli);
     ul.appendChild(pWind);
     ul.appendChild(pTempe);
     ul.appendChild(pUVI);
     todoFiveCities.appendChild(ul);

    }
}
createFiveDays();


document.getElementById("nameCity").innerHTML = data.name + "<br> Temperature " + data.main.temp + " humidity " + data.main.humidity + "<br> Wind speed" + data.wind.speed ;
 document.getElementById("iconWea").src="https://openweathermap.org/img/wn/"+ iconURL;
 d
 
console.log(elwe)
/*
document.getElementById("dayN").innerHTML = "Temp<br> " + Math.floor(data.main.temp)+"°";
  document.getElementById("windSpe").innerHTML = "wind <br>" + data.wind.sped;
 document.getElementById("hum").innerHTML = "humidity<br> " + elwe.daily[0].humidity;

 $("#fivedays").append(`  <div  class="col-sm"> <p id="">Temp</p> Dia JQuery<p id="">WindSpeed Full</p> <p>Humidity</p>" </div>`);
 $("#fivedays").append(`  <div  class="col-sm"> <p id="">Temp</p> Dia JQuery<p id="">WindSpeed Full</p> <p>Humidity</p>" </div>`);
 
*/


 localStorage.setItem('getCity', acity);
// localStorage.setItem('date', date);
 //localStorage.setItem('wea', date);

})


    });
}

//event for city of the INPUT
var todo1 = document.getElementById("myBtn");
todo1.addEventListener("click", function(event, cit) {

  const acity =  document.getElementById('inpuCity');
  const theCity = acity.value.trim();
     getApi(theCity);
  getApi(cit);
});


// get tcity from the buttons
var todo = document.getElementById("cities");
todo.addEventListener("click", function(event, cit) {
  var element = event.target;
   cit = element.textContent;

  getApi(cit); //call the API send the city
});

// local storage
var x = localStorage.getItem("getCity");


console.log(x);
