# Css ile alakalı işlevsel komutlar
## Transtion Animate

```
transition: all .3s ease;
-webkit-transition: all .3s ease;
```
---
## Responsive Media Tags

```
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {...}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {...}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {...}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {...}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {...}

// between two different devices size
@media screen and (min-width: 1280px) and (max-width: 14400px) {

```
---


## Sık Kullandığım Mobil İçin Gerekli Css Media Tag'ı
```
@media (max-width: 639px) {...}

```

## Yazıyı belirli bir satır sayısı ile sınırlamak istersek
```
overflow: hidden;
text-overflow: ellipsis;
line-height: 22.5px;
max-height: 135px;
-webkit-line-clamp: 6;
-webkit-box-orient: vertical; 

```


## Card'daki header resmini bozmadan render etmek istersek
```
&-header {
  height: 243px;
  background-size: cover;
  background-position: 50% 50%;
  position: relative;
}
```
