import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = '上臺辦理';

  back = {
    text: '返回首頁',
    url: 'https://www.hk.chinamobile.com/sc/'
  };

  copyrightInfo = '© 2019 中国移动香港有限公司版权所有。';
}
