import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { MainRequestService } from '../../service/request/main/main-request.service';

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
    this.mainApi
      .getPackageList({ pageSize: 20, pageNumber: 1 })
      .subscribe(data => {
        if (data.returnCode === '1000') {
          const activityList = data.records || [];

          activityList.forEach(item => {
            if (item.packageType === '158') {
              this.activityList.push(item);
            }
          });

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
    private notice: NzNotificationService,
    private mainApi: MainRequestService
  ) {}

  ngOnInit(): void {
    this.dataInit();
  }
}
