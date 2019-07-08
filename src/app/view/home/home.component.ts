import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api/api.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // 業務子集，bussinessInfo
  cardType = 'business';

  activityList: any[] = [];

  /**
   * 初始化列表數據
   * @memberof HomeComponent
   */
  dataInit() {
    this.apiService
      .post(
        'umall/business/consumer/packageInfo/query',
        {
          packageId:
            this.route.snapshot.queryParamMap.get('packageId') ||
            '1129312805249921024',
          orgId: '977090533766828033',
          userId: '1010053936724500480',
          appId: 10000188
        },
        true,
        '業務子集列表'
      )
      .subscribe(data => {
        if (data.returnCode === '1000') {
          this.activityList = data.dataInfo.businessList || [];

          if (!this.activityList.length) {
            this.notice.create(
              'warning',
              '提示',
              '抱歉，您正在訪問的頁面沒有任何數據哦！'
            );
          }

          // 默認選中第一條contract
          this.activityList.forEach(item => {
            item.selectedContract = item.contractList[0];
          });
        }
      });
  }

  constructor(
    private apiService: ApiService,
    private notice: NzNotificationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dataInit();
  }
}
