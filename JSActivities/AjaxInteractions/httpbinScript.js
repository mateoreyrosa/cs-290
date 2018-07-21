document.getElementById("submitData").addEventListener('click', function(event){
  //Change the API id accordingly
  var apiID = "fa7d80c48643dfadde2cced1b1be6ca1";
  var req = new XMLHttpRequest();

  req.open("POST", "http://httpbin.org/post", true);
  //Requesting JSON data back - we can create a javascript object this way 
  req.setRequestHeader('Content-Type', 'application/json');
  var dataFromUser = document.getElementById("textData").value;
  req.send(dataFromUser);
  req.addEventListener('load', function(){
      if(req.status >= 200 && req.status < 400){
        //Displays the entire string of text as text not as JSON or a Javascript object
        var response = req.responseText;
        document.getElementById("return").textContent = response;
        //Parses the JSON data so that we only take the data field AKA the field
        //which depends on user input. I convert the data into a JSON object ans
        //access the data property.
        var responseShort = JSON.parse(req.responseText);
        document.getElementById("returnshort").textContent = responseShort.data;
        document.getElementById("returnshort").style.fontWeight = 'bold';
      }else{
        //Return an alert if something goes wrong
          alert("Error in network request: " + req.statusText);
      }

  });

  event.preventDefault();
  //Clear the searched data so it looks like it was submitted more of a UI thing
  document.getElementById("textData").value = "";
});
