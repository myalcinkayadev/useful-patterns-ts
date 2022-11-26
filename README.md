# daily-snippets

## Specification pattern
A real-life example for open for extension closed for modification
```javascript
class ColorSpecification {
  constructor(color) {
    this.color = color;
  }

  isSatisfied(item) {
    return item.color === this.color;
  }
}

class SizeSpecification {
  constructor(size) {
    this.size = size;
  }

  isSatisfied(item) {
    return item.size === this.size;
  }
}

class ProductFilter {
  filter(items, spec) {
    return items.filter(x => spec.isSatisfied(x));
  }
}

const f = new ProductFilter();

const products = [{
  id: 1,
  color: 'blue',
  size: 'large'
},
{
  id: 2,
  color: 'red',
  size: 'small'
}]

class AndSpecification {
  constructor(...spec) {
    this.specs = spec;
  }
  isSatisfied(item) {
    return this.specs.every(x => x.isSatisfied(item))
  }
}

class OrSpecification {
  constructor(...spec) {
    this.specs = spec;
  }
  isSatisfied(item) {
    return this.specs.some(x => x.isSatisfied(item))
  }
}

const andSpec = new AndSpecification(new ColorSpecification('blue'), new SizeSpecification('large'))

const orSpec = new OrSpecification(new ColorSpecification('blue'), new SizeSpecification('small'))

const searchResult = f.filter(products, andSpec)

console.log(searchResult);
```
