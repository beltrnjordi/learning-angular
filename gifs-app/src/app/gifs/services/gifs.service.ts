import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { map, tap } from 'rxjs';

import { environment } from '@environments/environment';
import { Gif } from '../interfaces/gif.interface';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mappers/gif.mapper';

const GIFS_KEY = 'gifs';
const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIFS_KEY) ?? '{}';
  const gifs = JSON.parse(gifsFromLocalStorage);

  return gifs;
};

@Injectable({ providedIn: 'root' })
export class GifService {
  // importamos el httpclient en el app.config.ts
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  areTrendingGifsLoading = signal(true);

  trendingGifGroup = computed<Gif[][]>(() => {
    const groups: Gif[][] = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push([this.trendingGifs()[i], this.trendingGifs()[i + 1], this.trendingGifs()[i + 2]]);
    }
    console.log('items', groups);
    return groups;
  });

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  // señal computada
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory())); // cuando cambie searchHistory cambiara tambien la propiedad computada

  // al crear la instancia o llamar al servicio se llama a loadTrendingGifs
  constructor() {
    this.loadTrendingGifs();
  }

  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem('gifs', historyString);
  });

  loadTrendingGifs() {
    // la petición get, post, put, patch no se va a ejecutar hasta que no nos suscribamos a ella
    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
        },
      })
      .subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemsToGif(resp.data);
        this.trendingGifs.set(gifs);
        this.areTrendingGifsLoading.set(false);
        console.log(resp);
      });
  }

  // searchGif(text: string) {
  //   this.areSearchedGifsLoading.set(true);
  //   this.searchedGifs.set([]);

  //   this.http
  //     .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
  //       params: {
  //         q: text,
  //         api_key: environment.giphyApiKey,
  //         limit: 20,
  //       },
  //     })
  //     .subscribe((resp) => {
  //       const gifs = GifMapper.mapGiphyItemsToGif(resp.data);
  //       this.searchedGifs.set(gifs);
  //       this.areSearchedGifsLoading.set(false);
  //       console.log('busqueda');
  //       console.log(this.searchedGifs());
  //       console.log(text);
  //     });
  // }

  searchGif(query: string) {
    // pipe es un operador de RxJS
    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          q: query,
          api_key: environment.giphyApiKey,
          limit: 20,
        },
      })
      .pipe(
        // pipe me permite encadenar funcionamientos especiales de los Observables
        // p.ej -> tap - cuando se emita un valor o evento pasa por aqui (puede haber más de un operador)
        // no permite transformaciones, pero sí algun tipo de efecto secundario
        // tap((resp) => console.log({ tap: resp })),
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemsToGif(items)),
        // historial
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history, //desestructuracion del history actual
            [query.toLowerCase()]: items,
          }));
        }),
        // tap((items) => {
        //   if (localStorage.getItem('history')) {
        //     let data = localStorage.getItem('history') || '';
        //     let updatedData: Object[] = JSON.parse(data);
        //     updatedData.push({ query, items });

        //     localStorage.setItem('history', JSON.stringify(updatedData));
        //   } else {
        //     localStorage.setItem('history', JSON.stringify([{ query, items }]));
        //   }
        // }),
      );
  }

  getHistoryGifs(query: string) {
    const groups: Gif[][] = [];
    for (let i = 0; i < this.searchHistory()[query].length; i += 3) {
      groups.push([this.trendingGifs()[i], this.trendingGifs()[i + 1], this.trendingGifs()[i + 2]]);
    }
    console.log('items', groups);
    return groups;
    // return this.searchHistory()[query] ?? [];
  }

  // historyGifGroup = computed<Gif[][]>(() => {
  //   const groups: Gif[][] = [];
  //   for (let i = 0; i < this.getHistoryGifs(query).length; i += 3) {
  //     groups.push([this.trendingGifs()[i], this.trendingGifs()[i + 1], this.trendingGifs()[i + 2]]);
  //   }
  //   console.log('items', groups);
  //   return groups;
  // });
}
