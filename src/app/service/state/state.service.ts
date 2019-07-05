import { Injectable } from '@angular/core';
import { StateBase } from '../../classes/classes';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  anchor: StateBase = {
    id: 'anchor',
    value: '#header',
    name: 'anchor',
    describe: '锚点指向存储'
  };

  constructor() {}
}
