import { Component } from '@angular/core';
import { StateService } from './service/state/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = '上臺辦理';

  anchor = this.state.anchor;

  spinning = this.state.spinning;

  back = {
    text: '返回首頁',
    url: 'https://www.hk.chinamobile.com/sc/'
  };

  copyrightInfo = '© 2019 中国移动香港有限公司版权所有。';

  constructor(private state: StateService) {}
}
