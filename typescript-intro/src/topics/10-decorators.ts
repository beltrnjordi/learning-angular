function classDecorator<T extends {new(...args:any[]) : {}}>(constructor: T){
    return class extends constructor {
        newProperty = 'New property';
        hello = 'override';
    }
}

@classDecorator
export class SuperClass {
    public myProperty: string = 'Abc123';

    print() {
        console.log('Hola mundo');
    }
}

// imprime en texto plano variables y metodos
console.log(SuperClass);

const myClass = new SuperClass();
// imprime como un objeto la superclass, mostrando solo sus variables publicas
console.log(myClass);