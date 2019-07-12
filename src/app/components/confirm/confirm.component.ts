import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UtilService } from '../../service/util/util.service';
import { StateService } from '../../service/state/state.service';
import { ApiService } from '../../service/api/api.service';
import { SignatureCanvasComponent } from '../signature-canvas/signature-canvas.component';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.less']
})
export class ConfirmComponent implements OnInit {
  @Input() confirm;
  @ViewChild('signature', { static: true }) signature: SignatureCanvasComponent;

  agreement = {
    checked: true
  };

  payType = {
    value: 'D'
  };

  /**
   * 返回表單頁進行更改
   * @param {*} anchor
   * @memberof ConfirmComponent
   */
  edit(anchor) {
    this.confirm.show = false;
    switch (anchor) {
      case 3:
        this.util.anchorTo('step3');
        break;
      case 4:
        this.util.anchorTo('step4');
        break;
      default:
        break;
    }
  }

  /**
   * 上傳簽名
   * @memberof ConfirmComponent
   */
  uploadSignature() {
    const png = this.signature.getPng();
    const options = new FormData();
    options.append('fileData', png, 'file_' + Number(new Date()) + '.png');

    this.api
      .post('moses/upload/file/upload', options, true, '上傳簽名')
      .subscribe(data => {
        if (data.returnCode.toString() === '1000') {
          this.submitSignature(data.dataInfo.url);
        }
      });
  }

  /**
   * 提交簽名
   * @param {string} url
   * @memberof ConfirmComponent
   */
  submitSignature(url: string) {
    this.api
      .post(
        'umall/business/consumer/handle/sumbitSignaturePic',
        {
          id: this.state.orderId.value,
          signaturePicPath: url
        },
        true,
        '提交簽名'
      )
      .subscribe(data => {});
  }

  /**
   * 獲取合約
   * @memberof ConfirmComponent
   */
  getContract() {
    this.api
      .post(
        'umall/business/consumer/paperless/getContract',
        {
          orderId: this.state.orderId.value
        },
        true,
        '獲取合約'
      )
      .subscribe(data => {});
  }

  /**
   * 返回重新填寫表單
   * @memberof ConfirmComponent
   */
  back() {
    this.confirm.show = false;
    this.util.goTop();
  }

  /**
   * 前往付款
   * @memberof ConfirmComponent
   */
  next() {}

  constructor(
    private util: UtilService,
    private api: ApiService,
    private state: StateService
  ) {}

  ngOnInit() {}
}
