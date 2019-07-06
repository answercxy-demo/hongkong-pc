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

  spinning: StateBase = {
    id: 'spinning',
    value: false,
    name: 'spinning',
    describe: '是否加載中標識'
  };

  constructor() {}
}
