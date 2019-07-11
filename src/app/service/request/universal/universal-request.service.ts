import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../api/api.service';
@Injectable({
  providedIn: 'root'
})
export class UniversalRequestService {
  /**
   * 獲取唯一的訂單id
   * @returns {Observable<any>}
   * @memberof UniversalRequestService
   */
  getOrderId(): Observable<any> {
    return this.api.post(
      'umall/business/consumer/pcOrderInfo/init',
      {
        businessType: 1,
        orgId: '977090533766828033',
        userId: '1010053936724500480',
        appId: 10000188
      },
      false,
      '獲取訂單id'
    );
  }

  constructor(private api: ApiService) {}
}
