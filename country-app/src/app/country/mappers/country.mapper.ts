import { Country } from '../interfaces/country.interface';
import { RESTCountry } from '../interfaces/rest-countries.interface';
export class CountryMapper {
  static mapRESTCountryToCountry(country: RESTCountry): Country {
    return {
      cca2: country.cca2,
      flag: country.flag,
      flagSVG: country.flags.svg,
      name: country.translations['spa'].common ?? 'No SPA name',
      capital: country.capital?.at(0) ?? '-',
      population: country.population,
      region: country.region,
      subregion: country.subregion,
    };
  }

  static mapRESTCountriesToCountries(countries: RESTCountry[]): Country[] {
    return countries.map((country) => this.mapRESTCountryToCountry(country));
  }
}
