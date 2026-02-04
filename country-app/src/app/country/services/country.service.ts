import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../interfaces/regions.interface';

const API_URL = 'https://restcountries.com/v3.1';
@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<string, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) return of(this.queryCacheCapital.get(query) ?? []);
    console.log(this.queryCacheCapital);

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((restCountries) => CountryMapper.mapRESTCountriesToCountries(restCountries)),
      tap((countries) => this.queryCacheCapital.set(query, countries)),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(() => new Error(`No se pudo obtener países con ese query: ${query}`));
      }),
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCountry.has(query)) return of(this.queryCacheCountry.get(query) ?? []); //puedo poner operadores rxjs pipe
    console.log(this.queryCacheCountry);
    console.log('Llegando al servidor por', query);

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}?fullText=false`).pipe(
      map((restCountries) => CountryMapper.mapRESTCountriesToCountries(restCountries)),
      tap((countries) => this.queryCacheCountry.set(query, countries)),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(() => new Error(`No se pudo obtener países con ese query: ${query}`));
      }),
    );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | undefined> {
    code = code.toLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map((resp) => CountryMapper.mapRESTCountriesToCountries(resp)), //mapear la respuesta, devuelve un Array
      map((countries) => countries.at(0)),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(() => new Error(`No se pudo obtener países con ese código: ${code}`));
      }),
    );
  }

  searchByRegion(region: Region): Observable<Country[]> {
    const regionString = region.toLowerCase();

    if (this.queryCacheRegion.has(regionString))
      return of(this.queryCacheRegion.get(regionString) ?? []); //puedo poner operadores rxjs pipe
    console.log('Llegando al servidor por', regionString);

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${regionString}`).pipe(
      map((resp) => CountryMapper.mapRESTCountriesToCountries(resp)), //mapear la respuesta, devuelve un Array
      tap((countries) => this.queryCacheRegion.set(regionString, countries)),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(() => new Error(`No se pudo obtener países en esa región: ${region}`));
      }),
    );
  }
}
