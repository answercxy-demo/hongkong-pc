import { Component, OnInit } from '@angular/core';
import { UniversalRequestService } from '../../service/request/universal/universal-request.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less']
})
export class CarouselComponent implements OnInit {
  banners = [];

  /**
   * 獲取banner圖片
   * @memberof CarouselComponent
   */
  getBanners() {
    this.universalApi
      .getBanners({
        advertType: 863,
        pageNumber: 1,
        pageSize: 10
      })
      .subscribe(data => {
        if (data.returnCode === '1000') {
          this.banners = data.records;
        }
      });
  }

  constructor(private universalApi: UniversalRequestService) {}

  ngOnInit() {
    this.getBanners();
  }
}
