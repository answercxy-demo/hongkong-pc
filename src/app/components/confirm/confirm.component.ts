import { Component, OnInit, Input } from '@angular/core';

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
   * @memberof ConfirmComponent
   */
  edit() {}

  /**
   * 返回重新填寫表單
   * @memberof ConfirmComponent
   */
  back() {
    this.confirm.show = false;
  }

  /**
   * 前往付款
   * @memberof ConfirmComponent
   */
  next() {}

  constructor() {}

  ngOnInit() {}
}
