import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  isAlterEgoTaken: (alterEgo: string) => Observable<boolean>;
  constructor() {}
}
