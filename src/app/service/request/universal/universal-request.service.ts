import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../api/api.service';
import { UtilService } from '../../util/util.service';
@Injectable({
  providedIn: 'root'
})
export class UniversalRequestService {
  options = this.api.getOptions();

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
   * 身份证验证
   * @param {*} options
   * @returns
   * @memberof UniversalRequestService
   */
  idCardVerification(options): Observable<any> {
    const allOptions = this.util.simpleMergeOptions(this.options, options);

    return this.api.post(
      'umall/business/consumer/vaild/isHkidValid',
      allOptions,
      false,
      '身份証號碼驗證請求'
    );
  }

  /**
   * 搜索地址信息
   * @param {*} options
   * @returns {Observable<any>}
   * @memberof UniversalRequestService
   */
  searchAddressInfo(options): Observable<any> {
    const allOptions = this.util.simpleMergeOptions(this.options, options);
    return this.api.post(
      'umall/business/consumer/maparea/search',
      allOptions,
      false,
      '搜索地址信息'
    );
  }

  /**
   * 获取地址信息
   * @returns {Observable<any>}
   * @memberof UniversalRequestService
   */
  getAddressInfo(): Observable<any> {
    return this.api.post(
      'umall/business/consumer/maparea/searchAreaAndDistrict',
      this.options,
      true,
      '獲取地區/區域信息'
    );
  }

  /**
   * 获取banner图片
   * @param {*} options
   * @returns {Observable<any>}
   * @memberof UniversalRequestService
   */
  getBanners(options): Observable<any> {
    const allOptions = this.util.simpleMergeOptions(this.options, options);
    return this.api.post(
      'cmbs/advert/consumer/advertInfo/advertPage',
      allOptions,
      false,
      '獲取廣告圖片'
    );
  }

  /**
   * 获取合约信息
   * @param {*} options
   * @returns
   * @memberof UniversalRequestService
   */
  getContract(options): Observable<any> {
    return this.api.get(
      'umall/attachment/consumer/contract/electronicContract',
      options,
      true,
      '獲取合約'
    );
  }

  /**
   * 上传水印图片
   * @param {*} options
   * @returns {Observable<any>}
   * @memberof UniversalRequestService
   */
  uploadPic(options): Observable<any> {
    return this.api.post('moses/upload/file/upload', options, true, '上傳簽名');
  }

  /**
   * 获取提示信息请求
   * @param {*} options
   * @returns {Observable<any>}
   * @memberof UniversalRequestService
   */
  getTipInfo(options): Observable<any> {
    const allOptions = this.util.simpleMergeOptions(this.options, options);

    return this.api.post(
      'umall/business/consumer/hint/newQueryByCode',
      allOptions,
      false,
      '獲取提示信息'
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

  constructor(private api: ApiService, private util: UtilService) {}
}
