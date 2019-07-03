import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent implements OnInit {
  content = {};

  footerBtn = {
    name: '選擇此計劃',
    link: '/comeOnStage'
  };

  constructor() {}

  ngOnInit() {}
}
