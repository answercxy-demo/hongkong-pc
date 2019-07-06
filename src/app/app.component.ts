import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StateService } from './service/state/state.service';
import { UtilService } from './service/util/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  anchor = this.state.anchor;

  spinning = this.state.spinning;

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
      this.util.goTop();
    });
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private state: StateService,
    private util: UtilService
  ) {
    this.bindRouterChange();
  }
}
