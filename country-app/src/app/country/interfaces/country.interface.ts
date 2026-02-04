import { Currencies, Languages } from './rest-countries.interface';

export interface Country {
  cca2: string;
  flag: string;
  flagSVG: string;
  name: string;
  capital: string;
  population: number;
  region: string;
  subregion: string;
}
