# Php ve mysql ile alakalı işlevsel komutlar
## MySQL Query'si ile mevcut unixtime güncelleme (gün, ay, yıl gibi)

```
UPDATE musteriler_alan_adlari SET b_tarih=UNIX_TIMESTAMP(FROM_UNIXTIME(b_tarih) + INTERVAL '$yil_fetch->yenileme_miktarı' YEAR) WHERE id='$domain_id'
```
---

## MsSQL'de pagination için kullanılan komut ( MySQL'deki gibi limit kullanılmıyor. )

```
SELECT * FROM TableName ORDER BY id OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY;
```
---

## İlgili Id Veritabanında Yok İse Kayıt Etme SQL Query'si

```
If Not Exists(SELECT * FROM cari_liste WHERE KOD='120.010')
Begin
INSERT INTO cari_liste(KOD, ISIM) VALUES ('120.010', 'GÜREL MERMER SAN  VE TİC A.Ş')
End
```
---

## String'in belirli bir bölümünü Türkçe desteği ile almak istiyorsak

```
mb_substr($kariyer_f->fname,0, 8,"UTF-8")
```
---
## Php ile aynı sayfaya yönlendirme

```
header('Location:'.$_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING']);
```
---
## Unixtime ile tarih işlemleri

```
// Kayıt yaparken(insert ederken)
$tarih = strtotime('now');

// Fetch ederken (ekrana basarken)
date('d.m.Y H:i:s',$kariyer_f->tarih)
```
---
## Yarım saatte bir giriş izni verilmesi ile alakalı session kontrolu

```
if (!isset($_SESSION['CREATED'])) {
    $_SESSION['CREATED'] = time();
} else if (time() - $_SESSION['CREATED'] > 1800) {
    // session started more than 30 minutes ago
    session_regenerate_id(true);    // change session ID for the current session and invalidate old session ID
    $_SESSION['CREATED'] = time();  // update creation time
}
```
---
## Mysqlde bir sütunundaki verileri değiştirmek istiyorsak ( Çok fazla verileri güncellemek istersek )

```
$query_gorunen = mysql_query(" SELECT * FROM `emlak_form_sorulari` WHERE `SORU` LIKE ' Sosyal' ");

while ($row = mysql_fetch_object($query_gorunen)) {
    echo $row->SORU.'<br>';
    mysql_query(" UPDATE `emlak_form_sorulari` SET `SORU`='Social Facilities' WHERE id='$row->ID' ");
}
```
---
## Güvenli Dosya Yükleme

```
if (isset($_POST['submit'])) {

    /* [fname] => KASIM
    [e-mail] => kasim1411@gmail.com
    [tel] => 05385644299
    [message] => WEQWE   */

    $fname = re('fname');
    $e_mail = re('e-mail');
    $tel = re('tel');
    $message = re('message');

    $fileName=$_FILES["resume"]["name"];
    $fileSize=$_FILES["resume"]["size"]/1024;
    $fileType=$_FILES["resume"]["type"];
    $fileTmpName=$_FILES["resume"]["tmp_name"];
    $statusMsg = '';
    $random=rand(1111,9999);
    $newFileName=$random.$fileName;

      //file upload path
    $targetDir = "is_basvurulari/";
    $fileName = basename($_FILES["resume"]["name"]);
    $targetFilePath = $targetDir . $newFileName;
    $fileType = pathinfo($targetFilePath,PATHINFO_EXTENSION);

    if(!empty($_FILES["resume"]["name"])) {
          //allow certain file formats
          //$allowTypes = array('jpg','png','jpeg','gif','pdf','docx','doc');
    	$allowTypes = array('pdf','docx','doc');
    	if(in_array($fileType, $allowTypes)){
              //upload file to server
    		if(move_uploaded_file($_FILES["resume"]["tmp_name"], $targetFilePath)){
    			$statusMsg = "Cv'niz başarılı bir şekilde iletilmiştir. Tarafınıza en kısa süre içerisinde geri dönüş sağlanacaktır.";
    		}else{
    			$statusMsg = "Dosya yüklenirken bir sorun meydana geldi. Lütfen cvnizi info@egecamsanayi.com.tr mail adresinize iletiniz.";
    		}
    	}else{
    		$statusMsg = 'Cv dosyalarınız yalnız DOC,DOCX, & PDF formatlarında geçerlidir. Lütfen doğru format biçiminde cvlerinizi iletiniz!';
    	}
    }else{
    	$statusMsg = 'Lütfen cv dosyanızı yükleyiniz.';
    }

    $sql="INSERT INTO `insan_kaynaklari` (`id`, `fname`, `email`, `tel`, `cv`, `mesaj`) VALUES
    (NULL, '$fname', '$e_mail', '$tel', '$newFileName', '$message')";

    if (mysql_query($sql)) {

    	$last_id = mysql_insert_id();
    	$statusMsg .= '';
    	
    } else {
    	$statusMsg .= "Error: " . $sql . "<br>" . mysql_error();
    }
}



<form method="POST" enctype="multipart/form-data">

	<div>
		<input type="text" name="fname" class="contact-form-name" required placeholder="<?=( re('dil') == 'en' ? 'Full Name' :  'Ad ve Soyad'  )?>">
	</div>

	<div>
		<input type="email" name="e-mail" class="contact-form-name" required placeholder="E-mail">
	</div>

	<div>
		<input type="tel" name="tel" class="contact-form-name" required placeholder="<?=( re('dil') == 'en' ? 'Phone Number' :  'İrtibat Numarınız'  )?>">
	</div>

	<div>
		<span id="filename"><?=( re('dil') == 'en' ? 'Select your file' :  'Dosyanızı Seçiniz'  )?></span>
		<label for="file-upload"><?=( re('dil') == 'en' ? 'Browse' :  'Yükle'  )?><input type="file" id="file-upload" name="resume"></label>
	</div>

	<div>
		<textarea type="text" name="message" class="contact-form-name" placeholder="<?=( re('dil') == 'en' ? 'Message' :  'Mesaj ve Belirtmek İstedikleriniz.'  )?>"></textarea>
	</div>

	<button type="submit" name="submit"><?=( re('dil') == 'en' ? 'Submit' :  'Gönder'  )?></button>
	<div class="result"><?=$statusMsg?></div>
</form>
```
---

