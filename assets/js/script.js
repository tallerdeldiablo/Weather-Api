var tableBody = document.getElementById('repo-table');
var wButton = document.getElementById('fetch-button');
var weaEl = document.getElementById('wea');

const theKey = 'd3cead6b24ef04751594f3f9dfdaba4a';
const theUrl = 'api.openweathermap.org/data/2.5/weather?id=';





//El.value.trim();
function getApi() {
  const acity =  document.getElementById('inpuCity');

  const theCity = acity.value.trim();
  // fetch request gets a list of all the repos for the node.js organization
  var requestUrl = 'http://api.openweathermap.org/data/2.5/weather?q='+theCity+'&appid=d3cead6b24ef04751594f3f9dfdaba4a';




  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
    

    
        // Creating elements, tablerow, tabledata, and anchor
        var createTableRow = document.createElement('tr');
        var tableData = document.createElement('ul');
        var link = document.createElement('li');
        var link1 = document.createElement('li');
        var name = document.createElement('li');
    
        //link.textContent = data.wind.speed + "WIND";
        link1.textContent = data.main.feels_like ;
        name.textContent = data.name;
     

        
        document.getElementById("wea").innerHTML =  data.main.temp +  "F";
        document.getElementById("hum").innerHTML =  "Feels like" + data.main.humidity ;
        
        tableData.appendChild(link);
        tableData.appendChild(link1);
        tableData.appendChild(name);


        createTableRow.appendChild(tableData);
        tableBody.appendChild(createTableRow);
      
    });
}



// get reference to button
var btn = document.getElementById("myBtn");
// add event listener for the button, for action "click"
btn.addEventListener("click", getApi);