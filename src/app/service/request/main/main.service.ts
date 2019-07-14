import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../api/api.service';
import { UtilService } from '../../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class MainRequestService {
  // 接口请求数据
  options = this.api.getOptions();

  /**
   * 获取优惠包
   * @param {*} options
   * @returns
   * @memberof MainService
   */
  getPackageList(options) {
    const allOptions = this.util.simpleMergeOptions(this.options, options);

    return this.api.post(
      'umall/business/consumer/packageInfo/page',
      allOptions,
      true,
      '業務包列表獲取'
    );
  }

  /**
   * 获取优惠，vas
   * @param {*} options
   * @returns {Observable<any>}
   * @memberof MainService
   */
  getDiscountsAndVas(options): Observable<any> {
    const allOptions = this.util.simpleMergeOptions(this.options, options);
    return this.api.post(
      'umall/business/consumer/businessInfo/getDiscountsAndVas',
      allOptions,
      true,
      '獲取業務優惠及VAS信息'
    );
  }

  /**
   * 获取业务子集列表
   * @param {*} options
   * @returns {Observable<any>}
   * @memberof MainService
   */
  getBusinessList(options): Observable<any> {
    const allOptions = this.util.simpleMergeOptions(this.options, options);
    return this.api.post(
      'umall/business/consumer/packageInfo/query',
      allOptions,
      true,
      '業務子集列表'
    );
  }

  /**
   * 获取业务子集详情
   * @param {*} options
   * @returns {Observable<any>}
   * @memberof MainService
   */
  getBusinessDetail(options): Observable<any> {
    const allOptions = this.util.simpleMergeOptions(this.options, options);

    return this.api.post(
      'umall/business/consumer/businessInfo/query',
      allOptions,
      true,
      '業務詳情'
    );
  }

  /**
   * 获取电话号码列表
   * @param {*} options
   * @returns {Observable<any>}
   * @memberof MainService
   */
  getPhoneList(options): Observable<any> {
    const allOptions = this.util.simpleMergeOptions(this.options, options);

    return this.api.post(
      'umall/business/consumer/phoneNo/getList',
      allOptions,
      false,
      '獲取電話號碼'
    );
  }

  submitSignature(options): Observable<any> {
    const allOptions = this.util.simpleMergeOptions(this.options, options);

    return this.api.post(
      'umall/business/consumer/contract/submitContract',
      allOptions,
      true,
      '提交簽名'
    );
  }

  /**
   * 提交上台信息
   * @param {*} options
   * @returns
   * @memberof MainService
   */
  submitOrder(options) {
    const allOptions = this.util.simpleMergeOptions(this.options, options);

    return this.api.post(
      'umall/business/consumer/pcOrderInfo/submitOrder',
      allOptions,
      true,
      '提交表單'
    );
  }

  constructor(private api: ApiService, private util: UtilService) {}
}
