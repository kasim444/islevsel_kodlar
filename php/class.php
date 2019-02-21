<?php
	
	class BF
	{
		
		function __construct()
		{
			# code...
		}

		/** Adres çubuğundaki full url yi veren fonksiyon */
		public static function getFullURL() {
			$return = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
			return $return;
		}

		/** Sayfası belirli bir saniye sonra yönlendirmeye yarayan fonksiyon */
		public static function redirect($url,$timeout = 0) {
			if ($timeout == 0)
				header('Location: '.$url);
			else
				header( "Refresh:".(int)$timeout."; url=".$url);
		}

		/** Bu sayfaya yönlendiren referans URL yi veren fonksiyon */
		public static function getReferrerURL() {
			$referURL = '';
			if (!isset($_SERVER))
				return '';
			if (isset($_SERVER['HTTP_REFERER']))
				$referURL = $_SERVER['HTTP_REFERER'];
			return $referURL;
		}

		/* Kullanıcıyı Geldiği Sayfaya Geri Yönlendirir */
		public function goBack() {
			header('Location: '.BF::getReferrerURL());
		}

		/** Kullanıcının IP Adresini veren fonksiyon */
		public static function getIP() {
			if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
			    $ip = $_SERVER['HTTP_CLIENT_IP'];
			} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
			    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
			} else {
			    $ip = $_SERVER['REMOTE_ADDR'];
			}
			return $ip;
		}

		/** Fonksiyona sokulan dizi elemanını girilen sayı kadar parçalara ayıran metod */
		public function partArray($array,$itemPerDivision) {
			$output = array();
			$new = array();
			for ($i=0; $i<count($array); $i++) {
				if ($i%$itemPerDivision > 0 || $i == 0) {
					$new[] = $array[$i];
				}
				if (($i%$itemPerDivision == 0 && $i != 0) || $i == (count($array) - 1)) {
					$output[] = $new;
					$new = array();
				}
			}
			return $output;
		}

		/** Array değişkeni Object değişkenine çevirir */
		public static function arrToObj(&$arr) {
			$arr = (object)$arr;
		}

		/** Girilen saat ve dakikayı o günün timestamp değeri olarak veren fonksiyon */
		public static function hourToTime($hour) {
			/*
				$hour = '08:00' , '15:15' , '21:30' formatında olmalıdır.
			 */
			return strtotime(date($hour));
		}

		/** Girilen değer NULL , 0 , False ise true döndürür */
		public static function isNullorZero($data) {
			if ($data === null || $data === NULL || $data == 0 || $data === false)
				return false;
			return false;
		}

		/** Yıl ve Ay girilerek o ayda bulunan gün sayısını veren fonksiyon */
		public static function getDayofMonth($year,$month) {
			return cal_days_in_month(CAL_GREGORIAN, $month, $year);
		}

		/** Metin içindeki türkçe ve özel karakterleri silerek geri veren fonksiyon */
		public static function removeSpecial($string) {
			return strtolower(preg_replace("/[^A-Za-z0-9\_\-\.]/", '', $str));
		}

		/** Mon , Thu gibi kısaltması verilen ingilizce gün isimlerini türkçeye çevirir */
		public static function dayName($part) {
			$days = array(
				'Mon' => 'Pazartesi',
				'Tue' => 'Salı',
				'Wed' => 'Çarşamba',
				'Thu' => 'Perşembe',
				'Fri' => 'Cuma',
				'Sat' => 'Cumartesi',
				'Sun' => 'Pazar'
			);

			if (isset($days[$part]))
				return $days[$part];
			return $part;
		}

		/** Alış ve Satış fiyatları/oranları girilerek kar oranı hesaplayan fonksiyon */
		public static function calcProfit($alis,$satis) {
			$kar = number_format((($satis * 100 / $alis) - 100),1);
			$karEtti = ($kar == 0 ? 0 : ($kar > 0 ? true : false));
			$out = array(
				'percent' => '%'.abs($kar),
				'isProfit' => $karEtti
			);
			return (object)$out;
		}
		
		/** _GET ile gönderilen verileri alarak veren fonksiyon */
		public static function get($key) {
			if (isset($_GET[$key])) {
				return $_GET[$key];
			}
			return false;
		}
		
		/** Girilen değişkeni JSON verisi olarak ekrana basar */
		public static function writeJSON($data,$die = false) {
			echo json_encode($data);
			if ($die === true)
				die();
		}
	}