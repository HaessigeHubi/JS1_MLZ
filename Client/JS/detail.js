function showDetails(id) {
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
      let balanceColor = 'text-success';
      if(stock.balance < 0){
        balanceColor = 'text-danger';
      }

      Swal.fire({
        title: 'View Stock',
        html:
          '<input id="id" type="hidden" value='+stock['id']+'>' +
          'Company<input id="Company" readonly class="swal2-input" placeholder="First" value="'+stock['Company']+'">' +
          'Stock<input id="Stock" readonly class="swal2-input" placeholder="Stock" value="'+stock['Stock']+'">' +
          'Amount<input id="Amount" readonly class="swal2-input" placeholder="Username" value="'+stock['Amount']+'">' +
          'Current<input id="Current" readonly class="swal2-input" placeholder="Username" value="'+stock['Current']+'">' +
          'Starting<input id="Starting" readonly class="swal2-input" placeholder="Email" value="'+stock['Starting']+'">' +
          '<br/><p>Your current Balance with this stock</p>'+
          '<h1 class="'+ balanceColor + '">' + Number(stock.balance).toFixed(2) +'</h1>',
        focusConfirm: false,
        preConfirm: () => {
        }
      })
    }
  };
}