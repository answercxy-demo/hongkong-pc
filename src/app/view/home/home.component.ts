import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { MainRequestService } from '../../service/request/main/main-request.service';

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
    this.mainApi.getDiscountsAndVas({ id: idString }).subscribe(data => {
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
    const packageId = this.route.snapshot.queryParamMap.get('packageId');

    this.mainApi.getBusinessList({ packageId }).subscribe(data => {
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
    private mainApi: MainRequestService,
    private notice: NzNotificationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dataInit();
  }
}
