var tableBody = document.getElementById('repo-table');
var wButton = document.getElementById('fetch-button');
var weaEl = document.getElementById('wea');

const theKey = 'd3cead6b24ef04751594f3f9dfdaba4a';
const theUrl = 'api.openweathermap.org/data/2.5/weather?id=';

var date = moment().format("MMMM Do, YYYY, H a");
var tomorro = moment().add(1, 'days').format("MMMM Do"); 

var obj = {

}
document.getElementById("Tdate").innerHTML = date;

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
  console.log(elwe.daily[1].humidity)


 //create elements
 var createTableRow = document.createElement('tr');
 var newuli = document.createElement('ul');
 var link1 = document.createElement('li');

 link1.textContent = elwe.name ;


/*newuli.appendChild(name);
 newuli.appendChild(link);
 newuli.appendChild(link1);
 newuli.appendChild(link2);

 */ document.getElementById("nameCity").innerHTML = data.name;
 document.getElementById("tomo").innerHTML = tomorro;
console.log(elwe)
 document.getElementById("dayN").innerHTML = "Temp<br> " + Math.floor(data.main.temp)+"°";
 document.getElementById("wea").innerHTML = "feels like <br>" + data.main.feels_like;
 document.getElementById("hum").innerHTML += "humidity <br>" + elwe.daily[0].wind_speed;
 document.getElementById("hum").innerHTML += "windspeed<br> " + elwe.daily[0].humidity;


 document.getElementById("dayN2").innerHTML = "Temp <br>" +  Math.floor(elwe.daily[0].temp.day)+"°";
 document.getElementById("wea2").innerHTML = "feels like " + elwe.daily[0].feels_like.day;
 document.getElementById("hum2").innerHTML += "windspeed <br>" + elwe.daily[0].wind_speed;
 document.getElementById("hum2").innerHTML += "humidity <br>" + elwe.daily[0].humidity;
 

 

 document.getElementById("dayN3").innerHTML = "Temp " + elwe.daily[1].humidity;
 document.getElementById("wea3").innerHTML = "feels like " + elwe.daily[1].feels_like.day;
 document.getElementById("hum3").innerHTML += "windspeed " + elwe.daily[1].wind_speed;
 document.getElementById("hum3").innerHTML += "humidity " + elwe.daily[1].humidity;
 let one = `   <div class="col-sm">
                
 <p >DAY1</p>
 <p >WEATHER</p>
 <p > </p>
</div>`

 localStorage.setItem('getCity', acity);
 localStorage.setItem('date', date);
 localStorage.setItem('wea', date);

})

   

    });
}


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
 // alert(element+element.nodeName + todo);
  cit = element.textContent;

  getApi(cit);
});

// local storage

var x = localStorage.getItem("getCity");


console.log(x);
