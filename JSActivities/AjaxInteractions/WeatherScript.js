document.getElementById("ZIPSubmit").addEventListener('click', function(event){
  //Change the API id accordingly
  var apiID = "fa7d80c48643dfadde2cced1b1be6ca1";
  var req = new XMLHttpRequest();
  //gets submitted zip code through submit
  var zipCode = document.getElementById("ZIP").value;
  var viewZip = zipCode;
  if(zipCode.indexOf(' ') >= 0){
    var sub = zipCode.slice(0, zipCode.indexOf(' ')) +"%20";
    var zipCode = sub + zipCode.slice(zipCode.indexOf(' ')+1);
}
  //Requests via Get. Data is requested passing the zip code as a param to the URL
  //The true attribute at the end indicates asynchronous call
  //Whereas false would indicate a synchronous call
  req.open("GET", "http://api.openweathermap.org/data/2.5/weather?zip=" +zipCode + "&appid=" + apiID, true);
  //OpenWeatherAPI requires the req.send(null); or nothing will be shown
  req.send(null);
  var check = false;
  //Adds the asynchronous element, which means that this function will
  //execute only after a response has been received
  req.addEventListener('load', function(){

    //Checks to make sure that the request to Open Weather was successful
    if(req.status >= 200 && req.status < 400){
        var response = req.responseText;
        //Sets the three elements
        //Checks if another call to the function has made, suggesting either
        // to show zip code or city
        if(check == false){
          document.getElementById("originalCITY").textContent = "";
          document.getElementById("originalZIP").textContent = viewZip;
          WeatherDisplay(response);
        }else if(check == true){
          //If the loop has already been completed one time then
          // the user's input must have been a city
          document.getElementById("originalCITY").textContent = viewZip;
          document.getElementById("originalZIP").textContent = "";
          WeatherDisplay(response);
        }
        document.getElementById("weatherInfo").textContent = response;

    }else if(check == true){
      //breaks the stack call to the recursive function (asynchronous) by calling another function
      //essentially breaking the "loop"
      //if both city and zip code fail then it will call the failure alert
      callAlert();
    }
      else{
        //If the zip code fails then it will try and find a city
        req.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" +zipCode + "&appid=" + apiID, true);
        req.send(null);
        check = true;
        }
  }, check);
  //Function to access some parts of the object that is returned from the Weather API
  function WeatherDisplay(){
    var responseChange = JSON.parse(req.responseText);
    document.getElementById("city").textContent = responseChange.name;
    document.getElementById("temp").textContent = responseChange.main.temp + " in Kelvin";
    document.getElementById("humidity").textContent = responseChange.main.humidity;
      document.getElementById("country").textContent = responseChange.sys.country;
  }
  function callAlert(){
    alert("Error in network request ZIP/CITY: " + req.statusText);
    //Causes the page to clear the data if a failed request occurs
    //Looks a little nicer
    document.getElementById("originalCITY").textContent = "";
    document.getElementById("originalZIP").textContent = "";
    document.getElementById("weatherInfo").textContent = "";
    document.getElementById("city").textContent = "";
    document.getElementById("temp").textContent = "";
    document.getElementById("humidity").textContent = "";
      document.getElementById("country").textContent = "";
  }
  //Prevents the page from refreshing which ensures that data is displayed
  //A refresh would cause all the requested data to be cleared, essentially
  //showing no output to the screen
  event.preventDefault();
  //Clear the zipcode from the form submit area
  document.getElementById("ZIP").value = "";

});
