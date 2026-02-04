import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  templateUrl: './dragonball-page.component.html',
  imports: [NgClass],
})
export class DragonballPageComponent {
  name = signal('goh');
  power = signal(0);

  characters = signal<Character[]>([
    {
      id: 0,
      name: 'Goku',
      power: 9001,
    },
    // {
    //   id: 1,
    //   name: "Vegeta",
    //   power: 8000
    // },
    // {
    //   id: 2,
    //   name: "Piccolo",
    //   power: 3000
    // },
    // {
    //   id: 3,
    //   name: "Yamcha",
    //   power: 500
    // }
  ]);

  addCharacter() {
    console.log('click 1', this.name(), this.power());
    if (!this.name() || !this.power() || this.power() <= 0) {
      return;
    }

    console.log('click 2');

    const newCharacter: Character = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power(),
    };

    // this.characters().push(newCharacter)
    this.characters.update((list) => [...list, newCharacter]);
    this.resetFields();
    // console.log(this.name(), this.power())
  }
  resetFields() {
    this.name.set('');
    this.power.set(0);
  }
  powerClasses = computed(() => {
    return {
      'text-danger': 'true',
    };
  });
}
