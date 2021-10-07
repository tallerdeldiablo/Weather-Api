var tableBody = document.getElementById('repo-table');
var wButton = document.getElementById('fetch-button');
var weaEl = document.getElementById('wea');


const theKey = 'd3cead6b24ef04751594f3f9dfdaba4a';
const theUrl = 'api.openweathermap.org/data/2.5/weather?id=';

var date = moment().format("MMMM Do, YYYY"); 

document.getElementById("Tdate").innerHTML = date;

function getApi() {
  
  const acity =  document.getElementById('inpuCity');

  const theCity = acity.value.trim();

  var requestUrl = 'http://api.openweathermap.org/data/2.5/weather?q='+theCity+'&appid=d3cead6b24ef04751594f3f9dfdaba4a&units=imperial';



  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
    //create elements
        var createTableRow = document.createElement('tr');
        var newuli = document.createElement('ul');
      
        var name = document.createElement('li');
        var link = document.createElement('li');
        var link1 = document.createElement('li');
        var link2 = document.createElement('li');       
    //assign data
    
        link1.textContent = data.main.feels_like ;
        link1.textContent = data.main.humidity ;
       
//apend list  
       /*newuli.appendChild(name);
        newuli.appendChild(link);
        newuli.appendChild(link1);
        newuli.appendChild(link2);
        */


        createTableRow.appendChild(newuli);
        tableBody.appendChild(createTableRow);
      
        var temp = data.main.temp;
        var floorT = Math.floor(temp);

        document.getElementById("wea").innerHTML = data.name +   "Temperature " + floorT;
        document.getElementById("hum").innerHTML =  "Humidity " + data.main.humidity ;

    });
}

var btn = document.getElementById("myBtn");

btn.addEventListener("click", getApi);