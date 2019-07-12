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
      const scrollTop =
        document.querySelector('html').scrollTop +
        document.querySelector('body').scrollTop -
        document.querySelector('nz-header').clientHeight;
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
      console.log();
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
      e.preventDefault();
      const scrollTop =
        document.querySelector('html').scrollTop +
        document.querySelector('body').scrollTop -
        document.querySelector('nz-header').clientHeight;
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
        ev.preventDefault();
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

  /**
   * 生成圖片
   * @returns
   * @memberof SignatureCanvasComponent
   */
  getPng() {
    const canvas: HTMLCanvasElement = document.querySelector(
      'canvas#signatureCanvas'
    );
    return this.dataURItoBlob(canvas.toDataURL('image/png'));
  }

  /**
   * 將base64轉化爲blob對象
   * @param {*} base64Data
   * @returns {Blob}
   * @memberof SignatureCanvasComponent
   */
  dataURItoBlob(base64Data): Blob {
    let byteString: string;
    if (base64Data.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(base64Data.split(',')[1]);
    } else {
      byteString = unescape(base64Data.split(',')[1]);
    }
    const mimeString = base64Data
      .split(',')[0]
      .split(':')[1]
      .split(';')[0];
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }

  constructor() {}

  ngOnInit() {
    this.canvasInit();
  }
}
