/*
 Function when the Create Butten is Pressed in index.html.
 Addes a SweetAlert Pop Up, with a Form, which will be used in the userCreate() function
*/

function showUserCreateBox() {
  let flatpickrInstance
  Swal.fire({
    title: 'Create stock',
    html:
      '<input id="id" type="hidden">' +
      '<input id="Company" class="swal2-input" placeholder="Company">' +
      '<input id="Stock" class="swal2-input" placeholder="Stock">' +
      '<input id="Amount" class="swal2-input" placeholder="Amount">' +
      '<input id="Starting" class="swal2-input" placeholder="Buying Price">' +
      '<input class="swal2-input" placeholder="Buying Date" id="buy-date">', 
    confirmButtonText: 'Create',
    showCloseButton: true,
    stopKeydownPropagation: false,
    showCancelButton: true,
    allowOutsideClick: false,
    focusConfirm: true,
    willOpen: () => {
      flatpickrInstance = flatpickr(
        Swal.getPopup().querySelector('#buy-date')
      )
    },
    preConfirm: () => {
      const Company = Swal.getPopup().querySelector('#Company').value
      const Stock = Swal.getPopup().querySelector('#Stock').value
      const Amount = Swal.getPopup().querySelector('#Amount').value
      const Starting = Swal.getPopup().querySelector('#Starting').value
      var isStockValid = validStock(Stock);
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
      if(isStockValid == 404){
        Swal.showValidationMessage('Stock not in Exchange')   
      }
      return{CompanyText: Company}
    }
  }).then((result) =>{
    console.log(result);
    if(result.isConfirmed){
      userCreate();
    }
  })
}


function userCreate() {
  const Company = document.getElementById("Company").value;
  const Stock = document.getElementById("Stock").value;
  const Amount = parseInt(document.getElementById("Amount").value);
  const Current = 0;
  const Starting = parseInt(document.getElementById("Starting").value);
  const buyDate = document.getElementById("buy-date").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/stock");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ 
    "Company": Company,
    "Stock": Stock, 
    "Amount": Amount, 
    "Current": Current,
    "Starting": Starting,
    "buyDate" : buyDate
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

function validStock(stock) {
  console.log(stock);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/valid/"+stock, false);
  xhttp.send();
  return xhttp.status;
}
