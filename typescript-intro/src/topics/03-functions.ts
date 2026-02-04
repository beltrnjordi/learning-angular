function addNumbers(a: number, b: number): number {
    return a + b;
}

const addNumbersArrow = (a: number, b: number): string => {
    return `${a + b}`;
}

function multiply(firstNumber: number, secondNumber?: number, base: number = 2){
    return firstNumber * base;
}

const result1 = addNumbers(1, 2);
const result2 = addNumbersArrow(1,2);
const result3 = multiply(2)

interface Character {
    name: string;
    hp: number;
    showHp : () => void;
}
const healCharacter = (character: Character, amount: number) => {
    character.hp += amount;
}

const jordi: Character = {
    name: "Jordi",
    hp: 10,
    showHp() {
        console.log(`Puntos de vida ${this.hp}`)
    },
}
healCharacter(jordi, 20)
jordi.showHp();

console.log(result1, result2, result3)
export {}