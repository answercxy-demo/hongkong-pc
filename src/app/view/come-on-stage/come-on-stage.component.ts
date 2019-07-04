import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-come-on-stage',
  templateUrl: './come-on-stage.component.html',
  styleUrls: ['./come-on-stage.component.less']
})
export class ComeOnStageComponent implements OnInit {
  title = {
    name: '服務計劃',
    desc: '計劃名稱'
  };

  activityDetail = {};

  confirm = {
    show: false
  };

  /**
   * 确认表单填写无误
   * @memberof ComeOnStageComponent
   */
  next() {
    this.confirm.show = true;
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}
}
