import { Component, OnInit } from '@angular/core';
import { StateService } from '../../service/state/state.service';
import { ApiService } from '../../service/api/api.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // 業務子集，bussinessInfo
  cardType = 'business';

  activityList: any[] = [];

  dataInit() {
    // this.state.spinning(true);
    this.apiService
      .post('umall/business/consumer/packageInfo/query', {
        packageId: '1129312805249921024',
        orgId: '977090533766828033',
        userId: '1010053936724500480',
        appId: 10000188
      })
      .subscribe(data => {
        if (data.returnCode === '1000') {
          this.activityList = data.dataInfo.businessList;

          // 默認選中第一條contract
          this.activityList.forEach(item => {
            item.selectedContract = item.contractList[0];
          });
        } else {
          if (!!data.message) {
            this.message.warning(data.message);
          }
        }
      });
  }

  constructor(
    private state: StateService,
    private apiService: ApiService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.dataInit();
  }
}
