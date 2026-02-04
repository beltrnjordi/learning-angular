export class Person {
    // public name: string;
    // private address: string;

    // constructor(name: string, address: string) {
    //     this.name = name
    //     this.address = address
    // }

    // constructor() {
    //     this.name = 'Jordi'
    //     this.address = 'Vinaròs'
    // }

    constructor(public name: string, public address: string = 'No address') {}
}

const ironman = new Person('jordi', 'valencia');
console.log(ironman.address)