import { Component, OnInit, Input } from '@angular/core';
import { UtilService } from '../../service/util/util.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.less']
})
export class ConfirmComponent implements OnInit {
  @Input() confirm;

  agreement = {
    checked: true
  };

  payType = {
    value: 'D'
  };

  /**
   * 返回表單頁進行更改
   * @param {*} anchor
   * @memberof ConfirmComponent
   */
  edit(anchor) {
    this.confirm.show = false;
    switch (anchor) {
      case 3:
        this.util.anchorTo('step3');
        break;
      case 4:
        this.util.anchorTo('step4');
        break;
      default:
        break;
    }
  }

  /**
   * 返回重新填寫表單
   * @memberof ConfirmComponent
   */
  back() {
    this.confirm.show = false;
    this.util.goTop();
  }

  /**
   * 前往付款
   * @memberof ConfirmComponent
   */
  next() {}

  constructor(private util: UtilService) {}

  ngOnInit() {}
}
