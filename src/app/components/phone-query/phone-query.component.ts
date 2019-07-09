import { Component, OnInit, Input } from '@angular/core';
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

  phoneList = [];

  size = 1;

  /**
   * 獲取電話號碼列表
   * @memberof PhoneQueryComponent
   */
  getPhoneNumbers() {
    this.apiService
      .post(
        'umall/business/consumer/phoneNo/getList',
        {
          pageSize: 25,
          pageNumber: 1,
          type: 1,
          orgId: '977090533766828033',
          userId: '1010053936724500480',
          appId: 10000188
        },
        false,
        '獲取電話號碼'
      )
      .subscribe(data => {
        if (data.returnCode === '1000') {
          this.phoneList = data.records;
        }
      });
  }

  constructor(private modal: NzModalRef, private apiService: ApiService) {}

  ngOnInit() {
    this.getPhoneNumbers();
  }
}
