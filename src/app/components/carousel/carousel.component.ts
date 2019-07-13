import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api/api.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less']
})
export class CarouselComponent implements OnInit {
  getBanners() {
    this.api
      .post(
        'moses/advert/consumer/advertInfo/advertPage',
        {
          orgId: '977090533766828033',
          shopId: '1006756252527853569',
          userId: '1010053936724500480',
          appId: 10000188,
          advertType: 863,
          pageNumber: 1,
          pageSize: 4
        },
        false,
        '獲取廣告圖片'
      )
      .subscribe(data => {});
  }

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getBanners();
  }
}
