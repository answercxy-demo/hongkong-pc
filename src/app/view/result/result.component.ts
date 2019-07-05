import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.less']
})
export class ResultComponent implements OnInit {
  uploadModal = {
    isVisible: false
  };

  showModal(): void {
    this.uploadModal.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.uploadModal.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.uploadModal.isVisible = false;
  }

  constructor() {}

  ngOnInit() {}
}
