import { ChangeDetectionStrategy, Component, signal } from "@angular/core";

@Component({
  // template:
  //   <h3>CounterPageComponent</h3>
  //   <h3>Counter: {{counter}}</h3>
  //   <button (click)="increaseBy(1)">+1</button>
  //
  templateUrl: "counter-page.component.html",
  styles: `
  button {
    border-radius: 20px;
    border: none;
    background-color: red;
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterPageComponent {
  counter = 10
  counterSignal = signal(10)

  constructor() {
    setInterval(() => {
      this.counterSignal.update((v) => v +1 )
      console.log('Tick');
    }, 2000)
  }

  increaseBy(value: number) {
    this.counter += value;
    this.counterSignal.update(
      (current) => current + value
    )
  }

  reset() {
    this.counter = 10
    this.counterSignal.set(10)
  }
}


