import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signature-canvas',
  templateUrl: './signature-canvas.component.html',
  styleUrls: ['./signature-canvas.component.less']
})
export class SignatureCanvasComponent implements OnInit {
  /**
   * 可編輯的畫布初始化
   * @memberof SignatureCanvasComponent
   */
  canvasInit() {
    const canvas: HTMLCanvasElement = document.querySelector(
      'canvas#signatureCanvas'
    );
    const context = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    canvas.onmousedown = e => {
      const scrollTop = document.querySelector('html').scrollTop;
      const scrollLeft = document.querySelector('html').scrollLeft;

      // 若調整視口，需要及時更新畫布
      if (
        canvas.width !== canvas.offsetWidth ||
        canvas.height !== canvas.offsetHeight
      ) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }

      context.moveTo(
        scrollLeft + e.clientX - canvas.offsetLeft,
        scrollTop + e.clientY - canvas.offsetTop
      );

      document.onmousemove = ev => {
        context.lineTo(
          scrollLeft + ev.clientX - canvas.offsetLeft,
          scrollTop + ev.clientY - canvas.offsetTop
        );
        context.stroke();
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }

  clearCanvas() {
    const canvas: HTMLCanvasElement = document.querySelector(
      'canvas#signatureCanvas'
    );
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  constructor() {}

  ngOnInit() {
    this.canvasInit();
  }
}
