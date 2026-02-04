import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-list',
  imports: [],
  templateUrl: './character-list.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterList {
  characters = input.required<Character[]>();
  listName = input.required<string>();
}
