## JSON Data'yı Gruplayarak Yeniden Sıralama
           const data = [
                {
                  "tarih": "1556532884",
                  "indirim_tutarı": "2.44",
                  "neden": "test4",
                  "urun_adi": "Türk Kahvesi",
                  "musteri_adi": "Kasim",
                  "personel_adi": "alper"
                },
                {
                  "tarih": "1556532622",
                  "indirim_tutarı": "10",
                  "neden": "test4",
                  "urun_adi": "Duygu Deneme",
                  "musteri_adi": "Kasim",
                  "personel_adi": "alper"
                }
              ];

            function groupBy(objectArray, property) {
              return objectArray.reduce(function (acc, obj) {
                var key = obj[property];
                if (!acc[key]) {
                  acc[key] = [];
                }
                acc[key].push(obj);
                return acc;
              }, {});
            }

            const siraliData = groupBy(data, "urun_adi");
            // siraliData => {Türk Kahvesi: Array(1), Duygu Deneme: Array(1)}


## Unixtime'ı datetime'a çevirme


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


## Basit bir ajax request'i

### Javascript tarafı

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

### Php tarafı

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
