## Basit bir debounce ajax search işlemi

            // Not: Debounce fonksiyonunu kullanabilmek için kullanılan jquery ile çalışan kütüphane https://github.com/cowboy/jquery-throttle-debounce
            // Searchbox'tan arama yapılırsa debounce ile ajax işlemini başlatalım
            $('#search_text').keyup( $.debounce( 250, function(){
                var search = $(this).val();
                search = search.toUpperCase();
                $('#result2').html('');
                $('#tablo2').html('');
                load_data(search);
            }));
            /* ajax işlemini çağıran metot */
            function load_data(query) {
                $.ajax({
                    url: "stok_fetch.php",
                    method: "post",
                    data: {
                        query: query
                    },
                    success: function(data) {
                        $('#result2').html('');
                        $('#result2').html(data);
                    }
                });
            }

---

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

---

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

---

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

---

## Basit bir ajax request'i

- Javascript tarafı

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

---

- Php tarafı

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

---

## Başlangıç Loading Animasyonu

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

## how-to-create-an-array-containing-1-n

        Array(...Array(9)).map((_, i) => i);

        console.log(Array(...Array(9)).map((_, i) => i))

## formik json values to array

        // formik json data
        const jsonChild = {"name":"","gender":0,"birthday":"01.01.2013","name1":"QWE","gender1":"0","birthday1":"02.02.2013","name2":"EWQ","gender2":"1","birthday2":"03.03.2013"};

        const size = Object.keys(jsonChild).length;

        const arrayChild = [];

        let count = 0;
        for (let [key, value] of Object.entries(jsonChild)) {
        if (jsonChild[`name${count}`] !== undefined)
        arrayChild.push({
            name:     `${jsonChild[`name${count}`]}`,
            gender:   `${jsonChild[`gender${count}`]}`,
            birthday:   `${jsonChild[`birthday${count}`]}`,
        });
        count++;
        }

        console.log(`updated array ${ JSON.stringify(arrayChild) }`);

## simple google map autocomplete input

    ```
        var locationPermission = $(
        '.currentCampaignsAutogas__section.permissionDenied'
        )
        var campaignMainPage = $(
        '.currentCampaignsAutogas__section.permissionAllow'
        )
        function initAutoComplete() {
        function initialize() {
            var input = document.getElementById('locationTextField')
            var options = {
            types: ['(regions)'],
            componentRestrictions: {
                country: 'tr'
            }
            }
            var autocomplete = new google.maps.places.Autocomplete(input, options)

            autocomplete.addListener('place_changed', function() {
            var place = autocomplete.getPlace()

            if (!place.geometry) {
                window.alert(
                "Aramış olduğunuz il veya ilçe bulunamadı: '" + place.name + "'"
                )
                return
            }

            currentAddress = ''
                .concat(place.address_components[0].short_name, ', ')
                .concat(place.address_components[1].short_name)
            $(
                '.currentCampaignsAutogas__section.permissionAllow .current__city-selection'
            )
                .find('span')
                .text(currentAddress)
            locationPermission.fadeOut()
            campaignMainPage.fadeIn()
            })
        }

        google.maps.event.addDomListener(window, 'load', initialize)
        }

        function codeLatLng(lat, lng) {
        var latlng = new google.maps.LatLng(lat, lng)
        var geocoder = new google.maps.Geocoder()
        geocoder.geocode({ latLng: latlng }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                var country = results[0].address_components[3].short_name
                var city = results[0].address_components[4].short_name
                currentAddress = ''.concat(country, ', ').concat(city)
                $(
                '.currentCampaignsAutogas__section.permissionAllow .current__city-selection'
                )
                .find('span')
                .text(currentAddress)
                locationPermission.fadeOut()
                campaignMainPage.fadeIn()
            } else {
                alert('No results found')
            }
            } else {
            alert('Geocoder failed due to: ' + status)
            }
        })
        }
        var getCurrentLocationService = function getCurrentLocationService() {
        if (navigator.geolocation) {
            var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
            }
            navigator.geolocation.getCurrentPosition(
            function(position) {
                codeLatLng(position.coords.latitude, position.coords.longitude)
            },
            function() {
                handleLocationError(true, infoWindow, map.getCenter())
            },
            options
            )
        } else {
            console.log('current location from handleLocationError') // Browser doesn't support Geolocation

            handleLocationError(false, infoWindow, map.getCenter())
        }

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            console.log(
            browserHasGeolocation
                ? 'Error: The Geolocation service failed.'
                : "Error: Your browser doesn't support geolocation."
            )
        }
        }

        var getCurrentLocationEventListener = function getCurrentLocationEventListener() {
        document
            .getElementById('getRequestLocationPermission')
            .addEventListener('click', function() {
            getCurrentLocationService()
            })
        }

        var mapType = $('#requestPermission').attr('data-type')

        if (mapType === 'currentCampaignsAutogas') {
            getCurrentLocationEventListener()
            initAutoComplete()
        }
    ```

## another version google map autocomplete input

```
        // auto complete
        var input = document.getElementById("locationTextField");
        var options = {
          types: ["(regions)"],
          componentRestrictions: {
            country: "tr"
          }
        };
        var autocomplete = new google.maps.places.Autocomplete(input, options);
        autocomplete.bindTo("bounds", map); // Set the data fields to return when the user selects a place.

        autocomplete.setFields([
          "address_components",
          "geometry",
          "icon",
          "name"
        ]);
        var infowindow = new google.maps.InfoWindow();
        var infowindowContent = document.getElementById("infowindow-content");
        infowindow.setContent(infowindowContent);
        var marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, -29),
          icon: "./assets/images/icon/ellipse.png",
          animation: google.maps.Animation.DROP
        });
        autocomplete.addListener("place_changed", function() {
          $("#locationTextField")
            .trigger("blur")
            .val(address);
          infowindow.close();
          marker.setVisible(false);
          var place = autocomplete.getPlace();

          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert(
              "Aramış olduğunuz il veya ilçe bulunamadı: '" + place.name + "'"
            );
            return;
          }

          visibleSearchAreaForMobile(true); // If the place has a geometry, then present it on a map.

          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17); // Why 17? Because it looks good.
          }

          marker.setPosition(place.geometry.location);
          marker.setVisible(true);
          var address = "";

          if (place.address_components) {
            address = [
              (place.address_components[0] &&
                place.address_components[0].short_name) ||
                "",
              (place.address_components[1] &&
                place.address_components[1].short_name) ||
                "",
              (place.address_components[2] &&
                place.address_components[2].short_name) ||
                ""
            ].join(" ");
          }

          $(".current__city-select-inner").hide();
          $(".current__city--autoCompleteCountry").text(
            ""
              .concat(place.address_components[0].short_name, ", ")
              .concat(place.address_components[1].short_name)
          );
          $(".current__city-select-inner--autoCompleteResult").css(
            "display",
            "flex"
          ); //calculates distance between two points in km's

          function calcDistance(p1, p2) {
            return (
              google.maps.geometry.spherical.computeDistanceBetween(p1, p2) /
              1000
            ).toFixed(2);
          }

          var nearedBranches = features.filter(function(_ref2) {
            var purePosition = _ref2.purePosition;
            // current lat => place.geometry.location.lat
            // current lng => place.geometry.location.lng
            // static feature lat =>  purePosition.lat
            // static feature lng =>  purePosition.lng
            var featureLocation = new google.maps.LatLng(
              purePosition.lat,
              purePosition.lng
            );
            var currentLocation = new google.maps.LatLng(
              place.geometry.location.lat(),
              place.geometry.location.lng()
            ); // return distance(purePosition.lat,
            //   purePosition.lng, place.geometry.location.lat(),
            //   place.geometry.location.lng(), "K") < 15

            return calcDistance(currentLocation, featureLocation) < 15;
          });
          $(".nearest-branch__leftCol--resultArea").empty();
          nearedBranches.map(function(branch) {
            $(".nearest-branch__leftCol--resultArea").append(
              "\
                <div class='nearest-branch__leftCol--resultArea--branch' data-branchId=" +
                branch.id +
                ">\
                  <div class='nearest-branch__leftCol--resultArea--branch--leftCol'>\
                    <div class='nearest-branch__leftCol--resultArea--branch--leftCol__title'>\
                      " +
                branch.branchTitle +
                "\
                    </div>\
                    <div class='nearest-branch__leftCol--resultArea--branch--leftCol__subTitle'>\
                      GO – İpragaz Otogaz\
                    </div>\
                    <div class='nearest-branch__leftCol--resultArea--branch--leftCol__address'>\
                      İnönü Mah. Ankara Cad. <br/> No:45/1 Sancaktepe İstanbul\
                    </div>\
                  </div>\
                  <div class='nearest-branch__leftCol--resultArea--branch--rightCol'>\
                    <img src='./assets/images/icon/arrow-right.svg' />\
                  </div>\
                </div>\
                "
            );
          });
          $(".nearest-branch__leftCol--resultArea--branch").click(function(e) {
            toggleVisibleMapBottomGroupButton(true);
            showBranchDetail($(this).data("branchid"));
            closeDetailBranch();
          }); // autocomplete search end
        }); // close autocomplete result
```
