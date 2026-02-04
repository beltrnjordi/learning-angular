import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Gif } from '../../interfaces/gif.interface';

export interface GifItem {
  source: string;
  description: string;
}

@Component({
  selector: 'gif-list-item',
  imports: [],
  templateUrl: './gif-list-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifListItem {
  gif = input.required<Gif>();
}
