import { Gif } from '../interfaces/gif.interface';
import { GiphyItem, GiphyResponse } from '../interfaces/giphy.interfaces';
export class GifMapper {
  static mapGiphyItemToGif(giphyItem: GiphyItem): Gif {
    return {
      id: giphyItem.id,
      title: giphyItem.title,
      url: giphyItem.images.original.url,
    };
  }

  static mapGiphyItemsToGif(giphyItems: GiphyItem[]): Gif[] {
    return giphyItems.map(this.mapGiphyItemToGif);
  }
}
