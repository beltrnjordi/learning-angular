interface Passenger {
    name: string;
    children?: string[];
}

const passenger1: Passenger = {
    name: "Jordi"
}

const passenger2: Passenger = {
    name: "Natalia",
    children: ['Lana', 'Carmensita']
}

const printChildren = (passenger: Passenger) => {
    const howManyChildren = passenger.children?.length || 0;
    console.log(passenger.name, howManyChildren);
}

printChildren(passenger1);