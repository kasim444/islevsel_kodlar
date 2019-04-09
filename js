/* Unixtime'ı datetime'a çevirme */
function convert(unixtime){


   
    // Months array
    var months_arr = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
   
    // Convert timestamp to milliseconds
    var date = new Date(unixtime*1000);
   
    // Year
    var year = date.getFullYear();
   
    // Month
    var month = months_arr[date.getMonth()];
   
    // Day
    var day = date.getDate();
   
    // Hours
    var hours = date.getHours();
   
    // Minutes
    var minutes = "0" + date.getMinutes();
   
    // Seconds
    var seconds = "0" + date.getSeconds();
   

    var convdataTime = day+'-'+month+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    
    return convdataTime;
    
}


/* Basit bir ajax request'i */

/* Javascript tarafı */
 $.ajax({
      url: ajaxURL,
      type: 'POST',
      dataType: 'JSON',
      data: {
          action: 'changeState',
          urun_id: value
      },
  })
  .done(function (data) {
      if (data.message != '') {
          BootstrapDialog.alert(data.message);
      }
      if (data.status == 1) {
          console.log(JSON.stringify(data));
      }
  });

/* Php tarafı */
<?php
$out = array(
    'status' => 0,
    'message' => '',
    'refresh' => false
);
switch ($action)
{
    case 'changeState':
    
    $out['quantity'] = count($subCats);
    $out['categories'] = $subCats;
    $out['status'] = 1;
    break;
    
    case 'getRestaurantState':
    
    $updateSettings = $Restoran->getRestaurantState($state);   
    $out['result'] = $updateSettings;    
    break;
    
    default:
    
    // code...
    break;
}

echo json_encode($out);
