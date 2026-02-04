import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';
import { AvailableSort } from '../pages/custom-page/custom-page';

@Pipe({
  name: 'heroSortBy',
})
export class HeroSortByPipe implements PipeTransform {
  transform(value: Hero[], arg: AvailableSort): Hero[] {
    switch (arg) {
      case 'Name':
        value.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();

          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        break;

      case 'CanFly':
        value.sort((a, b) => {
          if (a.canFly > b.canFly) return -1;
          if (a.canFly < b.canFly) return 1;
          return 0;
        });
        break;

      case 'Color':
        value.sort((a, b) => {
          const colorA = a.color;
          const colorB = b.color;

          if (colorA < colorB) return -1;
          if (colorA > colorB) return 1;
          return 0;
        });
        break;

      case 'Creator':
        value.sort((a, b) => {
          const creatorA = a.creator;
          const creatorB = b.creator;

          if (creatorA < creatorB) return -1;
          if (creatorA > creatorB) return 1;
          return 0;
        });
        break;

      default:
        break;
    }
    return value;
  }
}
