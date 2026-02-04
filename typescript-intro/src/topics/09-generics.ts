export function whatsMyType<T>(arg: T): T{
    return arg;
}

let amIString = whatsMyType('hola mundo');
let amINumber = whatsMyType(123);
let amIBoolean = whatsMyType(true);

console.log(amIString.split(' '))
console.log(amINumber.toFixed())
console.log(amIBoolean.valueOf())
