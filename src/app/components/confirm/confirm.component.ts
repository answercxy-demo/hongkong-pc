import {
  Component,
  OnInit,
  Input,
  ViewChild,
  TemplateRef
} from '@angular/core';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { UtilService } from '../../service/util/util.service';
import { StateService } from '../../service/state/state.service';
import { ApiService } from '../../service/api/api.service';
import { SignatureCanvasComponent } from '../signature-canvas/signature-canvas.component';
import { UniversalRequestService } from '../../service/request/universal/universal-request.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.less']
})
export class ConfirmComponent implements OnInit {
  @Input() confirm;
  @Input() activityInfo;
  @Input() formInfo;
  @Input() saleInfo;
  @ViewChild('signature', { static: true }) signature: SignatureCanvasComponent;

  seeContract = false;

  signatured = false;

  agreement = {
    checked: true
  };

  payType = {
    value: 'D',
    items: []
  };

  signatureUrl = '';

  contractContent = '';

  /**
   * 獲取支付列表
   * @memberof ConfirmComponent
   */
  getPayList() {
    this.universal
      .getPayList({
        orgId: '977090533766828033',
        userId: '1010053936724500480',
        appId: 10000188,
        purchaseType: 1,
        registerType: this.formInfo.registerType,
        scene: 1
      })
      .subscribe(data => {
        if (data.returnCode === '1000') {
          data.dataInfo.payTypes.forEach(item => {
            if (item.identifying.toString() === '1') {
              item.value = item.type;
              this.payType.items.push(item);
            }
          });
          this.payType.value = this.payType.items[0].type;
        }
      });
  }

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
    if (this.seeContract) {
      const png = this.signature.getPng();
      const options = new FormData();
      options.append('fileData', png, 'file_' + Number(new Date()) + '.png');

      this.api
        .post('moses/upload/file/upload', options, true, '上傳簽名')
        .subscribe(data => {
          if (data.returnCode.toString() === '1000') {
            this.signatureUrl = data.dataInfo.url;
            this.submitSignature(data.dataInfo.url);
            this.notice.create('success', '成功', '恭喜您應用簽名成功');
          }
        });
    }
  }

  /**
   * 提交簽名
   * @param {string} url
   * @memberof ConfirmComponent
   */
  submitSignature(url: string) {
    this.api
      .post(
        'umall/business/consumer/contract/submitContract',
        {
          registerId: this.state.orderId.value,
          signImgPath: url,
          htmlPath: '1',
          lang: 'C',
          orgId: '977090533766828033',
          userId: '1010053936724500480',
          appId: 10000188
        },
        true,
        '提交簽名'
      )
      .subscribe(data => {
        this.signatured = true;
      });
  }

  /**
   * 獲取合約
   * @memberof ConfirmComponent
   */
  getContract(tplContent: TemplateRef<{}>) {
    this.api
      .get(
        'umall/attachment/consumer/contract/electronicContract',
        {
          registerId: this.state.orderId.value,
          signImgPath: this.signatureUrl
        },
        true,
        '獲取合約'
      )
      .subscribe(data => {
        this.seeContract = true;
        this.contractContent = data.dataInfo;
        this.modalService.create({
          nzTitle: '合約信息',
          nzContent: tplContent,
          nzClosable: true,
          nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000))
        });
      });
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
    private state: StateService,
    private universal: UniversalRequestService,
    private modalService: NzModalService,
    private notice: NzNotificationService
  ) {}

  ngOnInit() {
    this.getPayList();
    setInterval(() => {
      console.log(this.confirm, this.saleInfo, this.activityInfo);
    }, 10000);
  }
}
