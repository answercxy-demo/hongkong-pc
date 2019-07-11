import { Component, OnInit, Input, Output } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { ApiService } from '../../service/api/api.service';

@Component({
  selector: 'app-phone-query',
  templateUrl: './phone-query.component.html',
  styleUrls: ['./phone-query.component.less']
})
export class PhoneQueryComponent implements OnInit {
  @Input() title: string;
  @Input() linkTitle: string;
  @Input() selectPhone;

  phoneList = [];

  pageNumber = 1;

  phone = '';

  isSpinning = true;

  /**
   * 獲取電話號碼列表
   * @memberof PhoneQueryComponent
   */
  getPhoneNumbers() {
    this.apiService
      .post(
        'umall/business/consumer/phoneNo/getList',
        {
          pageSize: 20,
          pageNumber: this.pageNumber,
          type: 1,
          orgId: '977090533766828033',
          userId: '1010053936724500480',
          appId: 10000188
        },
        false,
        '獲取電話號碼'
      )
      .subscribe(data => {
        this.isSpinning = false;
        if (data.returnCode === '1000') {
          this.phoneList = data.records;
          this.selectedClear();
          this.pageNumber++;
        } else if (data.returnCode === '1002') {
          this.pageNumber = 1;
        }
      });
  }

  /**
   * 清空選中號碼或初始化selected屬性
   * @memberof PhoneQueryComponent
   */
  selectedClear() {
    this.phoneList.forEach(item => {
      item.selected = false;
    });
    this.phone = '';
  }

  /**
   * 選中某號碼
   * @param {*} e
   * @param {*} item
   * @memberof PhoneQueryComponent
   */
  selectedFunc(e, item) {
    this.selectedClear();
    item.selected = true;
    this.phone = item.phoneNo;
  }

  /**
   * 將選中號碼回顯至上臺頁
   * @memberof PhoneQueryComponent
   */
  next() {
    this.selectPhone(this.phone);
    this.modal.close();
  }

  constructor(private modal: NzModalRef, private apiService: ApiService) {}

  ngOnInit() {
    this.getPhoneNumbers();
  }
}
