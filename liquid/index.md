# Liquid Cheatsheets

## Debug collections

```html
<script>console.log({{ collections | json }});</script>
```

## Render products of spesific selected collection with schema

```html

<section>
  {% for item in section.blocks %}
    {% assign collection = collections[item.settings.collection] %}
    {% for product in collection.products %}
      <p>{{ product.title }}</p>
    {% endfor %}
  {% endfor %}
</section>

{% schema %}
{
  "name": "Collections",
  "max_blocks": 1,
  "blocks": [
    {
      "type": "new-product",
      "name": "Select Collection",
      "settings": [
        {
          "type": "collection",
          "id": "collection",
          "label": "Collection"
        }
      ]
    }
  ]
}
{% endschema %}
```