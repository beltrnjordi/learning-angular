import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GifList } from '../../components/gif-list/gif-list';
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifList],
  templateUrl: './search-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPage {
  gifService = inject(GifService);
  gifs = signal<Gif[][]>([]);

  onSearch(query: string) {
    this.gifService.searchGif(query).subscribe((resp) => {
      // this.gifs.set(resp);

      for (let i = 0; i < resp.length; i += 3) {
        this.gifs().push([resp[i], resp[i + 1], resp[i + 2]]);
      }
    });
  }
}
