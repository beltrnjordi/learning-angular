import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { GifItem, GifListItem } from '../gif-list-item/gif-list-item';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gif-list',
  imports: [GifListItem],
  templateUrl: './gif-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifList {
  gifsToShow = input.required<Gif[][]>();
}
