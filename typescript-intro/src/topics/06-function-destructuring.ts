
export interface Product {
    description: string;
    price: number;
}

const phone: Product = {
    description: "iPhone 14 Pro",
    price: 1400
}

const tablet: Product = {
    description: "iPad Air",
    price: 600
}

interface TaxCalculationOptions {
    tax: number;
    products: Product[]
}

// desestructurar el arg
// function taxCalculation(options: TaxCalculationOptions) : number[] {
// function taxCalculation({tax, products}: TaxCalculationOptions) : number[] {
export function taxCalculation(options: TaxCalculationOptions) : [number, number] {
    
    const {tax, products } = options
    let total = 0

    // desestructurar producto -> precio y description
    products.forEach( ({price}) => {
        total += price
    })

    return [total, total * tax]
}


// const resultTax = taxCalculation({tax: 20, products: [phone, tablet]})
// console.log('Total: ',resultTax[0])
// console.log('Total with taxes: ',resultTax[1])

const [total, taxes] = taxCalculation({tax: 20, products: [phone, tablet]})
console.log('Total: ',total)
console.log('Total with taxes: ', taxes)


export {};