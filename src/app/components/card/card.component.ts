import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

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

  next(options) {
    switch (this.type) {
      case this.PACKAGE_TYPE:
        this.router.navigate(['home'], {
          queryParams: { packageId: options.id }
        });
        break;
      case this.BUSINESS_TYPE:
        this.router.navigate(['comeOnStage'], {
          queryParams: { id: options.id }
        });
        break;
      default:
        break;
    }
  }

  constructor(private router: Router) {}

  ngOnInit() {}
}
