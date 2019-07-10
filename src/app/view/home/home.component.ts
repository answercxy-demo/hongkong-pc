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

  title = '';

  activityList: any[] = [];

  /**
   * 獲取業務子集優惠及VAS信息
   * @param {string} idString
   * @param {number} index
   * @memberof HomeComponent
   */
  getSaleAndVasInfo(idString: string, index: number) {
    this.apiService
      .post(
        'umall/business/consumer/businessInfo/getDiscountsAndVas',
        {
          id: idString,
          orgId: '977090533766828033',
          userId: '1010053936724500480',
          appId: 10000188
        },
        true,
        '獲取業務優惠及VAS信息'
      )
      .subscribe(data => {
        if (data.returnCode === '1000') {
          if (data.dataInfo.discDataLv1List.length) {
            data.dataInfo.discDataLv1List.forEach(item => {
              if (!!item.months) {
                if (!this.activityList[index].saleList) {
                  this.activityList[index].saleList = [];
                }
                this.activityList[index].saleList.push(item);
              }
            });
          }
        }
      });
  }

  /**
   * 獲取業務列表
   * @memberof HomeComponent
   */
  getbusinessList() {
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
          this.title = data.dataInfo.packageName;
          this.activityList = data.dataInfo.businessList || [];

          if (!this.activityList.length) {
            this.notice.create(
              'warning',
              '提示',
              '抱歉，您正在訪問的頁面沒有任何數據哦！'
            );
          }

          // 默認選中第一條contract,並查詢優惠
          this.activityList.forEach((item, index) => {
            item.selectedContract = item.contractList[0];
            this.getSaleAndVasInfo(item.id, index);
          });
        }
      });
  }

  /**
   * 初始化列表數據
   * @memberof HomeComponent
   */
  dataInit() {
    this.getbusinessList();
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
