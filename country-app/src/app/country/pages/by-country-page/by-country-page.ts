import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { CountryTable } from '../../components/country-table/country-table';
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInput, CountryTable],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {
  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = signal(this.queryParam);

  countryResource = rxResource({
    params: () => ({ query: this.query() }), //no es request
    stream: ({ params }) => {
      if (!params.query) return of([]);

      // Para actualizar la URL con el nuevo query
      this.router.navigate(['/country/by-country'], {
        queryParams: {
          query: params.query,
        },
      });

      return this.countryService.searchByCountry(params.query);
    },
  });

  // countryResource = resource({
  //   params: () => ({ query: this.query() }),
  //   loader: async ({ params }) => {
  //     if (!params.query) return [];

  //     return await firstValueFrom(this.countryService.searchByCountry(params.query));
  //   },
  // });
}
