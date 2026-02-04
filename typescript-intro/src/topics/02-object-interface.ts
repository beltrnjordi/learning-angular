let skills : string[] = ['Bash', 'Counter', 'Healing']

interface Character {
    name: string;
    hp: number;
    skills: string[];
    hometown?: string
}

const strider : Character = {
    name: 'Jordi',
    hp: 100,
    skills: ['Run', 'Jump']
}

strider.hometown ="Vinaròs"
console.table(strider);
export {}