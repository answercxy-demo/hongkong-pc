import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StateService } from './service/state/state.service';
import { UtilService } from './service/util/util.service';
import { UniversalRequestService } from './service/request/universal/universal-request.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  anchor = this.state.anchor;

  spinning = this.state.spinning;

  // 是否正在獲取訂單id標記
  getOrderIdTiming = false;

  back = {
    text: '返回首頁',
    url: 'https://www.hk.chinamobile.com/sc/'
  };

  copyrightInfo = '© 2019 中国移动香港有限公司版权所有。';

  /**
   * @description: 监听路由变化
   * @memberof AppComponent
   */
  bindRouterChange() {
    this.router.events.subscribe(event => {
      this.checkOrderId();
      this.util.goTop();
    });
  }

  /**
   * 檢查是否存在orderId,不存在則請求獲取
   * @memberof AppComponent
   */
  checkOrderId() {
    const orderId = this.state.orderId.value;

    if (!orderId && !this.getOrderIdTiming) {
      this.getOrderIdTiming = true;
      this.request.getOrderId().subscribe(data => {
        this.getOrderIdTiming = false;
        if (data.returnCode === '1000') {
          this.state.orderId.value = data.dataInfo.id;
        } else {
          this.notice.create('error', '定單id獲取失敗', data.message);
        }
      });
      this.state.orderId.value = '';
    }
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private state: StateService,
    private util: UtilService,
    private request: UniversalRequestService,
    private notice: NzNotificationService
  ) {
    this.bindRouterChange();
  }
}
