import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.less']
})
export class ActivityDetailComponent implements OnInit {
  @Input() activityDetail;

  constructor() {}

  ngOnInit() {}
}
