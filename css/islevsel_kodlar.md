# Css ile alakalı işlevsel komutlar

## Responsive Image with Ascpect Ratio

```
.AspectRatio {
  position: relative;
  margin-left: auto;
  margin-right: auto;
}

.AspectRatio::before {
  content: "";
  display: block;
}

.AspectRatio > img {
  max-height: 100%;
  max-width: 100%;
}

.AspectRatio--withFallback > img {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.no-js .AspectRatio > img {
  display: none !important;
}

@supports (--css: variables) {
  /* For dynamic one, we use CSS variables, which makes it only compatible for newer browsers */
  .AspectRatio--withFallback {
    padding-bottom: 0 !important; /* For older browsers we use the padding-bottom trick, so make sure to remove it here */
  }

  .AspectRatio::before {
    padding-bottom: calc(100% / (var(--aspect-ratio)));
  }

  .AspectRatio > img,
  .no-js .AspectRatio > noscript img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
}

.AspectRatio--square::before {
  padding-bottom: 100%;
}

.AspectRatio--short::before {
  padding-bottom: 75%;
}

.AspectRatio--tall::before {
  padding-bottom: 150%;
}

.AspectRatio--square > img,
.AspectRatio--short > img,
.AspectRatio--tall > img {
  position: absolute;
  width: auto;
  height: auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
}

@supports ((-o-object-fit: contain) or (object-fit: contain)) {
  .AspectRatio--square > img,
  .AspectRatio--short > img,
  .AspectRatio--tall > img {
    width: 100%;
    height: 100%;
    -o-object-fit: contain;
       object-fit: contain;
  }
}
```

---

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

- Güncel method

```
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
```

- Eski method

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
