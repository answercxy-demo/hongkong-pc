import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api/api.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.less']
})
export class PackageListComponent implements OnInit {
  // 業務子集，bussinessInfo
  cardType = 'package';

  activityList: any[] = [];

  /**
   * 初始化列表數據
   * @memberof HomeComponent
   */
  dataInit() {
    this.apiService
      .post(
        'umall/business/consumer/packageInfo/page',
        {
          pageSize: 20,
          pageNumber: 1,
          orgId: '977090533766828033',
          userId: '1010053936724500480',
          appId: 10000188
        },
        true,
        '業務包列表'
      )
      .subscribe(data => {
        if (data.returnCode === '1000') {
          this.activityList = data.records || [];

          if (!this.activityList.length) {
            this.notice.create(
              'warning',
              '提示',
              '抱歉，您正在訪問的頁面沒有任何數據哦！'
            );
          }
        } else {
          if (!!data.message) {
            this.notice.create('error', data.returnCode, data.message);
          }
        }
      });
  }

  constructor(
    private apiService: ApiService,
    private notice: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.dataInit();
  }
}
