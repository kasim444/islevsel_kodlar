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


## Obje Türündeki Datayı Manipüle Etme Örneği
           Object.keys(siraliData).forEach(
                      key => {
                                 let indAraToplam = 0;
                                 let prodInfo = "";

                                 /* ilgili ürüne ana başlığı ekleyelim */
                                 prodInfo += `
                                 <tr class="urunKategoriBaslik">
                                            <td></td>
                                            <td class="headerTd">${key}</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                 </tr>`;

                                 /* ilgili ürüne ait kayıtları ekleyelim */
                                 siraliData[key].map(indirim => {
                                            prodInfo += `
                                                       <tr class="prodInfo">
                                                                  <td>${convert(indirim.tarih)}</td>
                                                                  <td>${indirim.urun_adi}</td>
                                                                  <td class="ind_tutar">${indirim.indirim_tutarı} ₺</td>
                                                                  <td class="ilkHarfBuyuk">${indirim.neden}</td>
                                                                  <td class="ilkHarfBuyuk">${indirim.musteri_adi}</td>
                                                                  <td class="ilkHarfBuyuk">${indirim.personel_adi}</td>
                                                       </tr>`;
                                            /* ürün bazlı toplam indirimi hesaplayalım */
                                            indAraToplam += parseFloat(indirim.indirim_tutarı);
                                            genelIndirimToplamı += parseFloat(indirim.indirim_tutarı);
                                 });

                                 /* ürün bazlı toplam indirimi ekleyelim */
                                 prodInfo += `
                                 <tr class="prodInfo">
                                            <td></td>
                                            <td class="ara_toplam">Ara Toplam :</td>
                                            <td class="ara_toplam">${indAraToplam.toFixed(2)} ₺</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                 </tr>`;


                                 /* tablomuza ürün bazlı kayıtları ekleyelim */
                                 raporKasaTable.innerHTML += prodInfo;

                      }

           );
           
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



### Başlangıç Loading Animasyonu
           //HEADER TAG INA EKLE
           <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
           //BODY İÇERİSİNE ALTTAKİNİ YAZ
           <style>
           /* Preloader */
           #preloader {
               position:fixed;
               top:0;
               left:0;
               right:0;
               bottom:0;
               background-color:#fff; /* sayfa yüklenirken gösterilen arkaplan rengimiz */
               z-index:99; /* efektin arkada kalmadığından emin oluyoruz */
           }
           #status {
               width:200px;
               height:200px;
               position:absolute;
               left:50%;
               top:50%;
               background-image:url(resimklasorumuz/yukleniyor.gif); /* burası yazının ilk başında bahsettiğimiz animasyonu çağırır */
               background-repeat:no-repeat;
               background-position:center;
               margin:-100px 0 0 -100px;
           }
           </style>

           <!-- Preloader -->
           <div id="preloader">
               <div id="status">&nbsp;</div>
           </div>

           //FOOTER
           <!-- Preloader -->
           <script type="text/javascript">
               //<![CDATA[
                   $(window).load(function() { // makes sure the whole site is loaded
                       $('#status').fadeOut(); // will first fade out the loading animation
                       $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
                       $('body').delay(350).css({'overflow':'visible'});
                   })
               //]]>
           </script>



