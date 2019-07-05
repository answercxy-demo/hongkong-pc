import { Component, OnInit } from '@angular/core';
import { StateService } from '../../service/state/state.service';
import { ApiService } from '../../service/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  activityList: any[] = [];

  dataInit() {
    for (let i = 0; i < 100; i++) {
      this.activityList.push({ id: i });
    }
    this.apiService.post('xx', { a: 1 }).subscribe(data => {});
  }

  constructor(private state: StateService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.dataInit();
  }
}
