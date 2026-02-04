import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { CountryTable } from '../../components/country-table/country-table';
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryTable],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {
  service = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = signal(this.queryParam);

  countryResource = rxResource({
    params: () => ({ query: this.query() }), //no es request
    stream: ({ params }) => {
      if (!params.query) return of([]);

      // Para actualizar la URL con el nuevo query
      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: params.query,
        },
      });

      return this.service.searchByCapital(params.query);
      // return this.service.searchByCapital(params.query);
    },
  });

  // Angular 19+ // con resource hay que retornar  promesas
  // countryResource = resource({
  //   params: () => ({ query: this.query() }), //no es request
  //   loader: async ({ params }) => {
  //     if (!params.query) return [];

  //     return await firstValueFrom(this.service.searchByCapital(params.query));
  //     // return this.service.searchByCapital(params.query);
  //   },
  // });

  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onSearch = (value: string) => {
  //   if (this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.service.searchByCapital(value).subscribe({
  //     next: (resp) => {
  //       this.isLoading.set(false);
  //       this.countries.set(resp);
  //     },
  //     error: (err) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(err);
  //     },
  //   });
  // };
}
