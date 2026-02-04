import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html',
})
export class SearchInput {
  placeholder = input.required<string>();
  value = output<string>();
  timeoutValue = input(1000);

  initialValue = input<string>();

  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();
    console.log(this.inputValue());

    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, this.timeoutValue());

    // Limpia el timeout que se esta ejecutando (Antes de 500ms)
    onCleanup(() => {
      clearTimeout(timeout);
    });
  });
}
