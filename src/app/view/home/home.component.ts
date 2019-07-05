import { Component, OnInit } from '@angular/core';
import { StateService } from '../../service/state/state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  activityList: any[] = [];

  constructor(private state: StateService) {}

  ngOnInit(): void {
    this.dataInit();
  }

  dataInit() {
    for (let i = 0; i < 100; i++) {
      this.activityList.push({ id: i });
    }
  }
}
