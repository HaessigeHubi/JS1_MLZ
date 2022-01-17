/* Function opens an Edit Formular for the User, where he can change the values */
function showUserEditBox(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/stock/"+id, true);
  xhttp.send();
  xhttp.responseType = 'json';
  xhttp.onload = function() {
    var status = xhttp.status;
    console.log(status);
    if (status == 200) {
      console.log(xhttp.response);
      const stock = this.response;
      console.log(stock);
      //Opening Formular
      Swal.fire({
        title: 'Edit Stock',
        html:
          '<input id="id" type="hidden" value='+stock['id']+'>' +
          'Company<input id="Company" class="swal2-input" placeholder="First" value="'+stock['Company']+'">' +
          'Stock<input id="Stock" readonly class="swal2-input" placeholder="Stock" value="'+stock['Stock']+'">' +
          'Amount<input id="Amount" class="swal2-input" placeholder="Username" value="'+stock['Amount']+'">' +
          'Starting<input id="Starting" class="swal2-input" placeholder="Email" value="'+stock['Starting']+'">',
        confirmButtonText: 'Edit',
        showCloseButton: true,
        stopKeydownPropagation: false,
        showCancelButton: true,
        allowOutsideClick: false,
        focusConfirm: true,
        preConfirm: () => {
          const Company = Swal.getPopup().querySelector('#Company').value
          const Stock = Swal.getPopup().querySelector('#Stock').value
          const Amount = Swal.getPopup().querySelector('#Amount').value
          const Starting = Swal.getPopup().querySelector('#Starting').value
          //API Call to check if Stock is Valid
          if(!Company){ 
            Swal.showValidationMessage('Enter a Company')   
          } 
          if(!Stock){ 
            Swal.showValidationMessage('Enter a Stock')   
          } 
          if(!Amount || isNaN(parseInt(Amount))){ 
            Swal.showValidationMessage('Amount is Empty or not a Number')   
          } 
          if(!Starting || isNaN(parseInt(Starting))){ 
            Swal.showValidationMessage('Starting Price is Empty or not a Number')   
          }  
          return{CompanyText: Company}
        }
      }).then((result) =>{
        console.log(result);
        if(result.isConfirmed){
          userEdit();
        }
      })

    }
  };
}

/* Sending edited User to the API */
function userEdit() {

  const id = document.getElementById("id").value;
  const Company = document.getElementById("Company").value;
  const Stock = document.getElementById("Stock").value;
  const Amount = document.getElementById("Amount").value;
  const Starting = document.getElementById("Starting").value;
  //PUT API Call
  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://localhost:3000/stock");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ 
    "id":id,
    "Company": Company,
    "Stock": Stock, 
    "Amount": Amount, 
    "Starting": Starting
  }));
  xhttp.onload = function() {
    if (this.status == 200) {
      console.log(this.response);
      const response = this.response;
      Swal.fire(response);
      loadTable();
    } 
  };
}
