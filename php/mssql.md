# Mssql'de Sık Karşılaşılan Örnekler

## Mssql'de utf8 karakter çözümü
```
$mermer_tip = mb_convert_encoding($mermer_tip, "UTF-8", "ISO-8859-9");

```

## Mssql'de last insert id alma
```
$sql = $db->query("INSERT INTO packing_list(packing_list_name, packing_list_date) OUTPUT inserted.packing_list_id VALUES('Yeni Çeki Listesi', '$bugun')");
$sql->setFetchMode(PDO::FETCH_ASSOC);
$sql->execute();
$sorgu = $sql->fetch();
echo $sorgu["packing_list_id"];
```

## Mssql'de import  ve insert edilecek veriler için SET IDENTITY ON ve OFF kullanımı
```
SET IDENTITY_INSERT Table1 ON

INSERT INTO Table1
            (OperationID,
             OpDescription,
             FilterID)
VALUES      (20,
             'Hierachy Update',
             1)

SET IDENTITY_INSERT Table1 OFF
```

<hr>

## Mssql'de group by örnekler
```
/* mssql de group by ile alakalı örnekler */

/* 1.yöntem */
SELECT COUNT(*) as stok_adet, s.bundle_no, s.boy, s.yukseklik, s.hatali
FROM stok s
CROSS JOIN mermer_cins m
    JOIN stok_durum d ON s.stok_durum_id = d.stok_durum_id
WHERE m.mermer_cins_id = '5' AND s.blok_no = 'M6320'
GROUP BY s.bundle_no, s.boy, s.yukseklik, s.hatali;


/* 2.yöntem */
SELECT s.*, m.*,
    (SELECT COUNT(*)
    FROM stok_durum d
    WHERE s.stok_durum_id = d.stok_durum_id) as stok_adet
FROM stok s
CROSS JOIN mermer_cins m
WHERE m.mermer_cins_id='5' AND s.blok_no='M6320'
ORDER BY s.blok_no ASC, s.bundle_no ASC, s.stok_tarih DESC


/* 3.yöntem */
SELECT sm.*,
    (SELECT COUNT(*)
    FROM stok_durum d
    WHERE sm.stok_durum_id = sm.stok_durum_id
       ) as stok_adet
FROM (SELECT s.*, m.*,
        ROW_NUMBER() OVER (PARTITION BY s.bundle_no, s.boy, s.yukseklik, s.hatali
                                ORDER BY (SELECT NULL)
                               ) as sequm
    FROM stok s CROSS JOIN
           mermer_cins m
    WHERE  m.mermer_cins_id = '5' AND s.blok_no = 'M6320'
     ) sm
WHERE sequm = 1
ORDER BY sm.blok_no ASC, sm.bundle_no ASC, sm.stok_tarih DESC
```