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
      // TODO: 这里若改变canvas外部dom结构会有计算错误风险【需注意后期优化】
      const offsetTop = canvas.parentElement.parentElement.offsetTop + 1;
      const offsetLeft = canvas.parentElement.parentElement.offsetLeft + 1;

      // 若調整視口，需要及時更新畫布
      if (
        canvas.width !== canvas.offsetWidth ||
        canvas.height !== canvas.offsetHeight
      ) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }

      context.moveTo(
        scrollLeft + e.clientX - offsetLeft,
        scrollTop + e.clientY - offsetTop
      );

      document.onmousemove = ev => {
        context.lineTo(
          scrollLeft + ev.clientX - offsetLeft,
          scrollTop + ev.clientY - offsetTop
        );
        context.stroke();
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };

    canvas.ontouchstart = e => {
      console.log(1);
      const scrollTop = document.querySelector('html').scrollTop;
      const scrollLeft = document.querySelector('html').scrollLeft;
      // TODO: 这里若改变canvas外部dom结构会有计算错误风险【需注意后期优化】
      const offsetTop = canvas.parentElement.parentElement.offsetTop + 1;
      const offsetLeft = canvas.parentElement.parentElement.offsetLeft + 1;

      // 若調整視口，需要及時更新畫布
      if (
        canvas.width !== canvas.offsetWidth ||
        canvas.height !== canvas.offsetHeight
      ) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }

      context.moveTo(
        scrollLeft + e.touches[0].clientX - offsetLeft,
        scrollTop + e.touches[0].clientY - offsetTop
      );

      document.ontouchmove = ev => {
        document.querySelector('html').scrollTop = scrollTop;
        context.lineTo(
          scrollLeft + ev.changedTouches[0].clientX - offsetLeft,
          scrollTop + ev.changedTouches[0].clientY - offsetTop
        );
        context.stroke();
      };

      document.ontouchend = () => {
        document.ontouchmove = null;
        document.ontouchend = null;
      };
    };
  }

  clearCanvas() {
    const canvas: HTMLCanvasElement = document.querySelector(
      'canvas#signatureCanvas'
    );
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  constructor() {}

  ngOnInit() {
    this.canvasInit();
  }
}
