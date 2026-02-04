import { Component, inject, resource, signal, effect, linkedSignal } from '@angular/core';
import { CountryTable } from '../../components/country-table/country-table';
import { Region } from '../../interfaces/regions.interface';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam: string) {
  queryParam = queryParam.toLowerCase();

  const validRegions: Record<string, Region> = {
    Africa: 'Africa',
    Americas: 'Americas',
    Asia: 'Americas',
    Europe: 'Americas',
    Oceania: 'Americas',
    Antarctic: 'Americas',
  };

  return validRegions[queryParam] ?? 'Americas';
}

@Component({
  selector: 'app-by-region-page',
  imports: [CountryTable],
  templateUrl: './by-region-page.html',
})
export class ByRegionPage {
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];

  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';
  selectedRegion = linkedSignal<Region>(() => validateQueryParam(this.queryParam));

  countryResource = rxResource({
    params: () => ({ region: this.selectedRegion() }),
    stream: ({ params }) => {
      if (!params.region) return of([]);

      // Para actualizar la URL con el nuevo query
      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: params.region,
        },
      });

      return this.countryService.searchByRegion(params.region);
    },
  });
}
