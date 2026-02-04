import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Card } from '../../components/card/card';
import {
  AsyncPipe,
  I18nPluralPipe,
  I18nSelectPipe,
  JsonPipe,
  KeyValuePipe,
  SlicePipe,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { interval, tap, timer } from 'rxjs';

const client1 = {
  name: 'Jordi',
  gender: 'male',
  age: 24,
  address: 'Vinaròs',
};

const client2 = {
  name: 'Mari',
  gender: 'female',
  age: 57,
  address: 'Vinaròs',
};

@Component({
  selector: 'app-uncommon-page',
  imports: [
    Card,
    I18nSelectPipe,
    I18nPluralPipe,
    SlicePipe,
    JsonPipe,
    UpperCasePipe,
    KeyValuePipe,
    TitleCasePipe,
    AsyncPipe,
  ],
  templateUrl: './uncommon-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UncommonPage {
  client = signal(client1);

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla',
  };
  changeClient() {
    if (this.client() === client1) {
      this.client.set(client2);
      return;
    }

    if (this.client() === client2) {
      this.client.set(client1);
      return;
    }
  }

  // I18Nplural
  clientsMap = signal({
    '=0': 'No hay ningún cliente esperando',
    '=1': 'Tenemos 1 cliente esperando',
    '=2': 'Tenemos dos clientes esperando',
    other: 'Tenemos # clientes esperando',
  });

  clients = signal(['Maria', 'Pedro', 'Melissa', 'Jordi', 'Laura', 'Gemma']);

  deleteClient = () => {
    this.clients.update((prev) => prev.slice(1));
  };

  // keyValuePipe
  profile = {
    name: 'Jordi',
    age: 34,
    location: 'València',
  };

  // Async pipe
  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject('Error en la promesa');
      resolve('Tenemos data en la promesa');
      console.log('Promesa finalizada');
    }, 3500);
  });

  myObservableTimer = interval(2000).pipe(tap((value) => console.log('tap', value)));
}
