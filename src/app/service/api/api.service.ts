import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../util/util.service';

import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private origin = window.location.origin;
  // private origin = 'http://devcloud.vpclub.cn';

  /**
   * 獲取origin
   * @returns
   * @memberof ApiService
   */
  getOrigin() {
    return this.origin;
  }

  /**
   * post請求封裝
   * @param {string} [api=''] 請求地址（無origin）
   * @param {*} [options={}] 請求體
   * @param {boolean} [mask=true] 接口請求時是否顯示加載中
   * @param {string} [desc='接口請求'] 接口描述
   * @param {boolean} [descShow=true] 是否啓用錯誤反饋
   * @returns {Observable<any>}
   * @memberof ApiService
   */
  post(
    api: string = '',
    options = {},
    mask: boolean = true,
    desc: string = '接口請求',
    descShow: boolean = true
  ): Observable<any> {
    if (!!mask) {
      this.util.spinning(true);
    }
    return this.http.post<any>(`${this.origin}/${api}`, options).pipe(
      tap(_ => {
        // do something for current status
        this.util.spinning(false);
        if (!!_.returnCode) {
          if (_.returnCode.toString() !== '1000' && !!_.message) {
            this.notice.create('error', _.returnCode, _.message);
          }
        } else {
          this.notice.create('error', desc + '返回異常', _.message);
        }
      }),
      catchError(this.handleError<any>(desc, descShow, {}))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(
    operation = 'operation',
    descShow: boolean = true,
    result?: T
  ) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure

      // 關閉等待中組件
      this.util.spinning(false);

      if (descShow) {
        // TODO: better job of transforming error for user consumption
        this.message.error(
          `${operation} 失敗: ${error.error.status || '網絡錯誤'} ${error.error
            .message || ''}`
        );
      }

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  isAlterEgoTaken: (alterEgo: string) => Observable<boolean>;
  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private util: UtilService,
    private notice: NzNotificationService
  ) {}
}
