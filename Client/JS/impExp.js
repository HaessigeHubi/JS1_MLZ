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

  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:json/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
    document.body.removeChild(element);
  }