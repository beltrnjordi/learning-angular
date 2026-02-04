import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-table',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-table.html',
})
export class CountryTable {
  countries = input.required<Country[]>();
  errorMessage = input<string | undefined | null>();
  isLoading = input<boolean>();
  isEmpty = input<boolean>();
}
