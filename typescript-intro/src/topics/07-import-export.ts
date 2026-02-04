import { taxCalculation, Product } from "./06-function-destructuring";

const shoppingCart : Product[] = [{
    description: 'Phone',
    price: 123
},{
    description: 'TV',
    price: 500
}];

const taxValue = 0.15
const [total, tax] = taxCalculation({products: shoppingCart, tax: taxValue});

console.log('Total', total);
console.log('Tax', tax);
