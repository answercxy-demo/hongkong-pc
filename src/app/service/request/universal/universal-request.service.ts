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

  /**
   * 獲取驗證碼圖片
   * @returns {Observable<any>}
   * @memberof UniversalRequestService
   */
  getCodeImg(): Observable<any> {
    return this.api.post(
      'umall/business/consumer/vaild/generateQRCode',
      {},
      false,
      '獲取驗證碼圖片'
    );
  }

  /**
   * 獲取支付列表
   * @param {*} options
   * @returns {Observable<any>}
   * @memberof UniversalRequestService
   */
  getPayList(options): Observable<any> {
    return this.api.post(
      'umall/order/adapter/payTypeList',
      options,
      true,
      '獲取支付列表'
    );
  }

  constructor(private api: ApiService) {}
}
