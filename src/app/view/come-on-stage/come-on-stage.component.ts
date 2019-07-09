import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from '../../service/util/util.service';
import { ApiService } from '../../service/api/api.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { FormValidatorService } from '../../service/formValidator/form-validator.service';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl
} from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import { PhoneQueryComponent } from 'src/app/components/phone-query/phone-query.component';

@Component({
  selector: 'app-come-on-stage',
  templateUrl: './come-on-stage.component.html',
  styleUrls: ['./come-on-stage.component.less']
})
export class ComeOnStageComponent implements OnInit {
  id = this.route.snapshot.queryParamMap.get('id');

  activityInfo = { contractList: [] };

  title = {
    name: '服務計劃',
    desc: '計劃名稱'
  };

  activityDetail = {
    name: '服務計劃詳情',
    items: [
      { name: '規格説明', value: '--' },
      { name: '本地通話分鐘', value: '--' }
    ]
  };

  step1 = {
    order: 1,
    name: '合約期',
    businessContractType: 0,
    sale: {}
  };

  step2 = {
    order: 2,
    name: '請選擇上臺方式',
    phoneValue: '',
    modeValue: 1,
    cardValue: 'A'
  };

  step3 = {
    order: 3,
    name: '個人資料',
    sex: '1',
    disabledBirthDate: (current: Date): boolean => {
      const nowDate = new Date();
      const birthYear = nowDate.getFullYear() - 18;
      const birthMonth = nowDate.getMonth();
      const birthDate =
        nowDate.getDate() === 29 && nowDate.getMonth() === 1
          ? nowDate.getDate() - 1
          : nowDate.getDate();
      return current > new Date(birthYear, birthMonth, birthDate);
    },
    currentDate: new Date(2000, 0, 1),
    certFileUrlList: [],
    addressOptions: [
      {
        value: '香港',
        label: '香港',
        children: []
      },
      {
        value: '香港',
        label: '九龍',
        children: []
      },
      {
        value: '香港',
        label: '新界',
        children: []
      }
    ],
    addressValue: ['香港', '銅鑼灣'],
    uploadAction: `${this.apiService.getOrigin()}/moses/upload/file/upload`
  };

  step4 = {
    order: 4,
    name: '生效日期',
    //   New sales: 周四至周五是 T+4     周日至周三是 T+2          周六是T+3
    // M N P:       周四至周五是T+5      周日至周三是T+3              周六是T+4
    disabledDate: current => {
      switch (this.step2.modeValue) {
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        default:
          break;
      }
    }
  };

  validateForm: FormGroup;

  confirm = {
    show: false
  };

  detail = {};

  /**
   * 獲取業務子集詳情信息
   * @memberof ComeOnStageComponent
   */
  getBusinessInfo() {
    this.apiService
      .post(
        'umall/business/consumer/businessInfo/query',
        {
          id: this.id,
          orgId: '977090533766828033',
          userId: '1010053936724500480',
          appId: 10000188
        },
        true,
        '業務詳情'
      )
      .subscribe(data => {
        if (data.returnCode === '1000') {
          this.activityInfo = data.dataInfo;
          this.title.desc = data.dataInfo.businessName;
          this.activityDetail.items[0].value =
            data.dataInfo.businessSpecDesc || '--';
          this.activityDetail.items[1].value = `${data.dataInfo.callMinutes ||
            '--'}分鐘`;
        }
      });
  }

  /**
   * 獲取業務子集優惠及VAS信息
   * @memberof ComeOnStageComponent
   */
  getSaleAndVasInfo() {
    this.apiService
      .post(
        'umall/business/consumer/businessInfo/getDiscountsAndVas',
        {
          id: this.id,
          orgId: '977090533766828033',
          userId: '1010053936724500480',
          appId: 10000188
        },
        true,
        '獲取業務優惠及VAS信息'
      )
      .subscribe(data => {
        if (data.returnCode === '1000') {
          if (data.dataInfo.discDataLv1List.length) {
            data.dataInfo.discDataLv1List.forEach(item => {
              if (!!item.months) {
                this.step1.sale[item.months] = item;
              }
            });
          }
        }
      });
  }

  /**
   * 獲取地址及區域信息
   * @memberof ComeOnStageComponent
   */
  getAddressInfo() {
    this.apiService
      .post(
        'umall/business/consumer/maparea/searchAreaAndDistrict',
        {
          orgId: '977090533766828033',
          userId: '1010053936724500480',
          appId: 10000188
        },
        true,
        '獲取地區/區域信息'
      )
      .subscribe(data => {
        if (data.returnCode === '1000') {
          // 香港，九龍，新界
          for (const item of data.records) {
            switch (item.areaId) {
              case '1':
                this.step3.addressOptions[0].children.push({
                  label: item.districtTcResult,
                  value: item.districtTcResult,
                  isLeaf: true
                });
                break;
              case '2':
                this.step3.addressOptions[1].children.push({
                  label: item.districtTcResult,
                  value: item.districtTcResult,
                  isLeaf: true
                });
                break;
              case '3':
                this.step3.addressOptions[2].children.push({
                  label: item.districtTcResult,
                  value: item.districtTcResult,
                  isLeaf: true
                });
                break;
              default:
                break;
            }
          }
        }
      });
  }

  /**
   * 頁面數據初始化
   * @memberof ComeOnStageComponent
   */
  dataInit() {
    if (!!this.id) {
      this.getBusinessInfo();
      this.getSaleAndVasInfo();
      this.getAddressInfo();
    } else {
      this.notice.create(
        'warning',
        '提示',
        '您好，請確認您的業務包id是否正確！'
      );
    }
  }

  /**
   * 打開選擇電話彈窗
   * @memberof ComeOnStageComponent
   */
  openPhoneModal(): void {
    const modal = this.modalService.create({
      nzTitle: '新號碼上臺',
      nzContent: PhoneQueryComponent,
      nzComponentParams: {
        title: '我們提供以下號碼以供閣下選擇：',
        linkTitle: '換另一組新號碼'
      },
      nzFooter: [
        {
          disabled: true,
          label: '確認',
          type: 'primary',
          onClick: componentInstance => {
            // componentInstance.title! = 'title in inner component is changed';
          }
        }
      ]
    });
  }

  /**
   * form表單校驗初始化
   * @memberof ComeOnStageComponent
   */
  validateFormInit() {
    const pattern = Validators.pattern;
    const validator = this.customValidator;
    this.validateForm = this.fb.group(
      {
        choosePhone: [
          null,
          [Validators.required, pattern(validator.hongkongPhone())]
        ],
        firstName: [null, [Validators.required, pattern(validator.en())]],
        lastName: [null, [Validators.required, pattern(validator.en())]],
        sex: [null, [Validators.required, pattern(validator.number())]],
        birth: [null, [Validators.required]],
        idCardHead: [
          null,
          [Validators.required],
          pattern(validator.idCardHead())
        ],
        idCardEnd: [
          null,
          [Validators.required, pattern(validator.idCardEnd())]
        ],
        phone: [
          null,
          [Validators.required, pattern(validator.hongkongPhone())]
        ],
        email: [],
        file: [],
        area: [],
        street: [],
        address: [],
        date: [],
        months: [
          null,
          [
            Validators.required
            // Validators.pattern(this.customValidator.verCode())
          ]
        ],
        registerType: [
          null,
          [
            Validators.required
            // Validators.pattern(this.customValidator.verCode())
          ]
        ],
        dd: [
          null,
          [
            Validators.required
            // Validators.pattern(this.customValidator.verCode())
          ]
        ]
      }
      // { updateOn: 'blur' }
    );
  }

  /**
   * 身份證讀本文件變化時觸發
   * @memberof ComeOnStageComponent
   */
  certFileChange(info) {
    const fileUrlArr = [];
    for (const item of info.fileList) {
      if (item.status === 'done' && item.response.returnCode === '1000') {
        fileUrlArr.push(item.response.dataInfo.url);
      }
    }

    this.step3.certFileUrlList = fileUrlArr;
  }

  /**
   * 确认表单填写无误
   * @memberof ComeOnStageComponent
   */
  next() {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    console.log(this.validateForm.value);
    this.util.goTop();
    this.confirm.show = true;
  }

  /**
   * 返回上一頁
   * @memberof ComeOnStageComponent
   */
  back() {
    window.history.back();
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private util: UtilService,
    private notice: NzNotificationService,
    private apiService: ApiService,
    private fb: FormBuilder,
    private customValidator: FormValidatorService,
    private modalService: NzModalService
  ) {}

  ngOnInit() {
    this.dataInit();
    this.validateFormInit();
  }
}
