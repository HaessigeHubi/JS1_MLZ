/*
  This function loads all the data from the API /stock.

  The response is an Array with the stock information. With the following elements
        "id": 1,
        "Company":"Tesla",
        "Stock":"TSLA",
        "Amount":10,
        "Current":1050,
        "Starting":519,
        "balance" : 0
*/
function loadTable() {

  //REST GET Request to /stock
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/stock", true);
  xhttp.send();
  xhttp.responseType = 'json';

  //On Load it updates the existing table
  xhttp.onload = function() {
    var status = xhttp.status;
    console.log(status);
    if (status == 200) {
      console.log(xhttp.response);
      var trHTML = ''; 
      const objects = this.response;
      let colorStatus = "orange";
      for (let object of objects) {
        trHTML += '<tr>'; 
        trHTML += '<td>'+object['id']+'</td>';
        trHTML += '<td>'+object['Company']+'</td>';
        trHTML += '<td>'+object['Stock']+'</td>';
        trHTML += '<td>'+object['Amount']+'</td>';

        //Status of the Stock, according to the balance
        if(object.balance > 0){
          colorStatus = "green";
        } else if(object.balance < 0){
          colorStatus = "red";
        } else{
          colorStatus = "orange"
        }

        trHTML += '<td><img src="Style/'+ colorStatus + '.png" style="width: 30px"></td>';
        trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox('+object['id']+')"><i class="fa fa-pencil"></i></button>';
        trHTML += ' <button type="button" class="btn btn-outline-info" onclick="showDetails('+object['id']+')"><i class="fa fa-info"></i></button>'
        trHTML += ' <button type="button" class="btn btn-outline-danger" onclick="userDelete('+object['id']+')"><i class="fa fa-trash"></button></td>';

        trHTML += "</tr>";
      }

      //The String trHTML will be added to the innerHTML of the existing table
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
};

/*Table Search Function for "mytable"
Solution from w3c School -> https://www.w3schools.com/howto/howto_js_filter_table.asp
Changed to fit my table */

function searchTable() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("userInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("stockTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
};

loadTable();




