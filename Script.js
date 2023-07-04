// Ubah nama file menjadi JavaScript.html

<script>
  // Prevent forms from submitting.
  function preventFormSubmit() {
    var forms = document.querySelectorAll('form');
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener('submit', function(event) {
      event.preventDefault();
      });
    }
  }
  window.addEventListener("load", functionInit, true); 
  
  //INITIALIZE FUNCTIONS ONLOAD
  function functionInit(){  
    preventFormSubmit();
    getLastTenRows();
  };      
  
  //HANDLE FORM SUBMISSION
  function handleFormSubmit(formObject) {
    google.script.run.withSuccessHandler(createTable).processForm(formObject);
    document.getElementById("myForm").reset();
  }
  
  //GET LAST 10 ROWS
  function getLastTenRows (){
   google.script.run.withSuccessHandler(createTable).getLastTenRows();
  }
  
  
  //GET ALL DATA
  function getAllData(){
    //document.getElementById('dataTable').innerHTML = "";
    google.script.run.withSuccessHandler(createTable).getAllData();
  }
  
  
  //CREATE THE DATA TABLE
  function createTable(dataArray) {
    if(dataArray){
      var result = "<table class='table table-sm' style='font-size:0.8em'>"+
                   "<thead style='white-space: nowrap'>"+
                     "<tr>"+                               //Change table headings to match witht he Google Sheet
                      "<th scope='col'>Delete</th>"+
                      "<th scope='col'>Edit</th>"+
                      "<th scope='col'>ID</th>"+
                      "<th scope='col'>Nomor SPR</th>"+
                      "<th scope='col'>Hasil Pengukuran / Pengecekan</th>"+
                      // "<th scope='col'>Status</th>"+
                      "<th scope='col'>Nama</th>"+
                      "<th scope='col'>Status Penyelesaian</th>"+
                      "<th scope='col'>Jam Mulai</th>"+
                      "<th scope='col'>Jam Selesai</th>"+
                      "<th scope='col'>Tanggal</th>"+
                      // "<th scope='col'>Aprov GA</th>"+
                      "<th scope='col'>Penyelesaian</th>"+
                      "<th scope='col'>Penyebab Kerusakan</th>"+
                      "<th scope='col'>Status Penyebab Kerusakan</th>"+
                      // "<th scope='col'>Kode Mesin</th>"+
                    "</tr>"+
                  "</thead>";
      for(var i=0; i<dataArray.length; i++) {
          result += "<tr>";
          result += "<td><button type='button' class='btn btn-danger btn-xs deleteBtn' onclick='deleteData(this);'>Delete</button></td>";
          result += "<td><button type='button' class='btn btn-warning btn-xs editBtn' onclick='editData(this);'>Edit</button></td>";
          for(var j=0; j<dataArray[i].length; j++){
              result += "<td>"+dataArray[i][j]+"</td>";
          }
          result += "</tr>";
      }
      result += "</table>";
      var div = document.getElementById('dataTable');
      div.innerHTML = result;
      document.getElementById("message").innerHTML = "";
    }else{
      var div = document.getElementById('dataTable');
      div.innerHTML = "Data not found!";
    }
  }

  //DELETE DATA
  function deleteData(el) {
    var result = confirm("Want to delete?");
    if (result) {
      var recordId = el.parentNode.parentNode.cells[2].innerHTML;
      google.script.run.withSuccessHandler(createTable).deleteData(recordId);
    }
  }
  
  
  //EDIT DATA
  function editData(el){
    var recordId = el.parentNode.parentNode.cells[2].innerHTML; //https://stackoverflow.com/a/32377357/2391195
    google.script.run.withSuccessHandler(populateForm).getRecordById(recordId);
  }

  //POPULATE FORM
  function populateForm(records){
    document.getElementById('RecId').value = records[0][0];
    document.getElementById('nomorspr').value = records[0][1];
    document.getElementById('hasilpengukuran').value = records[0][2];
    document.getElementById(records[0][3]).checked = true;
    document.getElementById('nama').value = records[0][3];
    document.getElementById('statuspenyelesaian').value = records[0][4];
    document.getElementById('jammulai').value = records[0][5];
    document.getElementById('jamselesai').value = records[0][6];
    document.getElementById('tglkerusakan').value = records[0][7];
    // document.getElementById('ttdga').value = records[0][9];
    document.getElementById('penyelesaian').value = records[0][8];
    document.getElementById('penyebab').value = records[0][9];
    document.getElementById("statuspenyebab").value = records[0][10];
    // document.getElementById("kodemesin").value = records[0][13];
    document.getElementById("message").innerHTML = "<div class='alert alert-warning' role='alert'>Update Record [ID: "+records[0][0]+"]</div>";
  }
  
  //RETRIVE DATA FROM GOOGLE SHEET FOR PROVINSI DROPDOWN
  function createStatusPenyebabDropdown() {
      //SUBMIT YOUR DATA RANGE FOR DROPDOWN AS THE PARAMETER
      google.script.run.withSuccessHandler(statuspenyebabDropDown).getDropdownList("StatusPenyebab!A1:A9");
  }
  
  //POPULATE PROVINSI DROPDOWNS
  function provinsiDropDown(values) { //Ref: https://stackoverflow.com/a/53771955/2391195
    var list = document.getElementById('statuspenyebab');   
    for (var i = 0; i < values.length; i++) {
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
  }


  // CREATE DROPDOWN CHECKBOX
  // var expanded = false;

  // function showCheckboxes() {
  //   var checkboxes = document.getElementById("statuspenyebab");
  //   if (!expanded) {
  //     checkboxes.style.display = "block";
  //     expanded = true;
  //   } else {
  //     checkboxes.style.display = "none";
  //     expanded = false;
  //   }
  // }


  // CREATE DROPDOWN CHECKBOX
  // var expanded = false;

  // function showCheckboxes() {
  //   var checkboxes = document.getElementById("checkboxes");
  //   if (!expanded) {
  //     checkboxes.style.display = "block";
  //     expanded = true;
  //   } else {
  //     checkboxes.style.display = "none";
  //     expanded = false;
  //   }
  // }

  // CREATE DROPDOWN CHECKBOX BARU
//   var checkList = document.getElementById('list1');
//   checkList.getElementsByClassName('anchor')[0].onclick = function(evt) {
//     if (checkList.classList.contains('visible'))
//       checkList.classList.remove('visible');
//     else
//       checkList.classList.add('visible');
// }

// CREATE CHECKBOX NEW
  // $(document).ready(function() {
  //         $('#ingredients').multiselect();
  //     });

</script>