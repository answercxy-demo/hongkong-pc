import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent implements OnInit {
  @Input() activityInfo: any;
  @Input() type: string;

  PACKAGE_TYPE = 'package';
  BUSINESS_TYPE = 'business';

  // business
  businessContractType = 0;

  content = {};

  footerBtn = {
    name: '選擇此計劃',
    link: '/comeOnStage'
  };

  constructor() {}

  ngOnInit() {}
}
