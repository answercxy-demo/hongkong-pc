import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  activityList: any[] = [];

  ngOnInit(): void {
    this.dataInit();
  }

  dataInit() {
    for (let i = 0; i < 100; i++) {
      this.activityList.push({ id: i });
    }
  }
}
