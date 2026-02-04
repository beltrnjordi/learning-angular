import { NgClass } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { CharacterList } from '../../components/dragonball/character-list/character-list.component';
import { Character } from '../../interfaces/character.interface';
import { DragonballCharacterAddComponent } from '../../components/dragonball/character-add/character-add.component';
import { DragonballService } from '../../service/dragonball.service';

@Component({
  templateUrl: './dragonball-super-page.component.html',
  imports: [NgClass, CharacterList, DragonballCharacterAddComponent],
})
export class DragonballSuperPageComponent {
  // constructor(public dragonballService: DragonballService) {}

  public dragonballService = inject(DragonballService);
}
