import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.less']
})
export class ConfirmComponent implements OnInit {
  agreement = {
    checked: true
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
  back() {}

  /**
   * 前往付款
   * @memberof ConfirmComponent
   */
  next() {}

  constructor() {}

  ngOnInit() {}
}
