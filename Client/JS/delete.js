/* Send one stock to the API to delete*/
function userDelete(id) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "http://localhost:3000/stock/"+id, true);
  xhttp.send();
  xhttp.onload = function() {
    if (this.status == 200) {
      console.log(this.response);
      const response = this.response;
      Swal.fire(response);
      loadTable();
    } 
  };
}
/* API will delete all Stocks (ID not needed)*/
function deleteAll() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "http://localhost:3000/stock", true);
  xhttp.send();
  xhttp.onload = function() {
    if (this.status == 200) {
      console.log(this.response);
      const response = this.response;
      Swal.fire(response);
      loadTable();
    } 
  };
}

