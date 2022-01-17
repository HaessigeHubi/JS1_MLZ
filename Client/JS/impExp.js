/*
Function to create an exportPortfolio.json from the current stocks
*/
function exportFile() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/stock", true);
    xhttp.send();
    xhttp.onload = function() {
      var status = xhttp.status;
      console.log(status);
      if (status == 200) {
        const objects = this.response;
        download('exportPortfolio.json', objects)
       
      }
    };
  };

/*
Function adds an a attribute for the download of the JSON
*/
  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:json/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
    document.body.removeChild(element);
  }

  /* Handling of the Import 
  Function handleFileSelect gets the File from the Input Element
  Function handleFileLoad processes the Input JSON and sends it to the API
  */
  function handleFileSelect(event) {
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0])
  }
  
  function handleFileLoad(event) {
    var result = JSON.parse(event.target.result);
    console.log(result);
    for(i = 0; i < result.length; i++){
      console.log(result[i].Company);
      //Checking if Input is Valid
      if(!result[i].Company || !result[i].id || !result[i].Amount || !result[i].Stock|| !result[i].Starting){
        Swal.fire("JSON not Valid");
        break;
      } else{
        //Valid Input gets send to the API
        const xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "http://localhost:3000/stock");
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify({ 
          "id":result[i].id,
          "Company": result[i].Company,
          "Stock": result[i].Stock, 
          "Amount": result[i].Amount, 
          "Starting": result[i].Starting
        }));
        xhttp.onload = function() {
          if (this.status == 200) {
            console.log(this.response);
            loadTable();
          } 
        };
      }
    }
  };

//Initializing Input Field
document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);

//Show and hide the Upload Div
function importTrigger(){
  var x = document.getElementById("importDiv");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}