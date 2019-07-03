import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit() {}
}
