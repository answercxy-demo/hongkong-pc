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
import { Observer, Observable, timer } from 'rxjs';

@Component({
  selector: 'app-come-on-stage',
  templateUrl: './come-on-stage.component.html',
  styleUrls: ['./come-on-stage.component.less']
})
export class ComeOnStageComponent implements OnInit {
  id = this.route.snapshot.queryParamMap.get('id');

  activityInfo = { contractList: [], businessImg: '' };

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
    sex: 1,
    searchData: [],
    searchShow: false,
    searchLoading: true,
    searchFlag: 0,
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
    /**
     * 上傳前校驗
     * @param {File} file
     * @returns
     * @memberof ComeOnStageComponent
     */
    beforeUpload: (file: File) => {
      return new Observable((observer: Observer<boolean>) => {
        const isImg =
          file.type === 'image/jpeg' ||
          file.type === 'image/jpg' ||
          file.type === 'image/gif' ||
          file.type === 'image/png';
        if (!isImg) {
          this.notice.create(
            'error',
            '圖片格式錯誤',
            '僅支持上載jpg，jpeg及gif格式圖片'
          );
          observer.complete();
          return;
        }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
          this.notice.create(
            'error',
            '圖片大小錯誤',
            '僅支持上載不超過5mb的圖片'
          );
          observer.complete();
          return;
        }

        observer.next(isImg && isLt5M);
        observer.complete();
      });
    },
    currentDate: new Date(2000, 0, 1),
    certFileUrlList: [],
    areaAndDistrictOptions: [
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
    areaAndDistrictValue: ['香港', '銅鑼灣'],
    addressValue: '',
    streetValue: '',
    uploadAction: `${this.apiService.getOrigin()}/umall/business/consumer/picture/uploadPict` // /moses/upload/file/upload
  };

  step4 = {
    order: 4,
    name: '生效日期',
    //   New sales: 周四至周五是 T+4     周日至周三是 T+2          周六是T+3
    // M N P:       周四至周五是T+5      周日至周三是T+3              周六是T+4
    disabledDate: (current: Date): boolean => {
      const nowDate = new Date();
      const nowDateNum = Number(nowDate);
      const ONE_DAY_NUM = 86400000;
      let afterDayNum = 2;

      if (nowDate.getDay() === 6) {
        afterDayNum++;
      } else if (nowDate.getDay() === 4 || nowDate.getDay() === 5) {
        afterDayNum += 2;
      }

      switch (this.step2.modeValue) {
        // 新號上臺
        case 1:
          break;
        // 携號上臺
        case 2:
          afterDayNum++;
          break;
        // 預付賺後付
        case 3:
          break;
        default:
          break;
      }

      return current < new Date(nowDateNum + afterDayNum * ONE_DAY_NUM);
    }
  };

  validateForm: FormGroup;

  confirm = {
    show: false
  };

  detail = [];

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

          if (!!data.dataInfo.businessInfo) {
            this.detail.push({
              name: '月費詳情',
              value: data.dataInfo.businessInfo
            });
          }

          if (!!data.dataInfo.businessDesc) {
            this.detail.push({
              name: '條款及明細',
              value: data.dataInfo.businessDesc
            });
          }
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
                this.step3.areaAndDistrictOptions[0].children.push({
                  label: item.districtTcResult,
                  value: item.districtTcResult,
                  isLeaf: true
                });
                break;
              case '2':
                this.step3.areaAndDistrictOptions[1].children.push({
                  label: item.districtTcResult,
                  value: item.districtTcResult,
                  isLeaf: true
                });
                break;
              case '3':
                this.step3.areaAndDistrictOptions[2].children.push({
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
   * 提交表單信息
   * @memberof ComeOnStageComponent
   */
  submitForm(options) {
    this.util.simpleMergeOptions(options, {
      orgId: '977090533766828033',
      userId: '1010053936724500480',
      appId: 10000188
    });
    this.apiService
      .post('umall/business/consumer/submitOrder', options, true, '提交表單')
      .subscribe(data => {});
  }

  confirmPhone() {
    // this.
  }

  confirmCard() {}

  /**
   * 搜索相關地區信息信息
   * @memberof ComeOnStageComponent
   */
  search() {
    const ele: HTMLInputElement = document.querySelector('input#searchText');
    const value = ele.value;

    this.step3.searchLoading = true;
    this.step3.searchData = [];
    this.step3.searchShow = true;
    this.apiService
      .post(
        'umall/business/consumer/maparea/search',
        {
          wd: value,
          orgId: '977090533766828033',
          userId: '1010053936724500480',
          appId: 10000188
        },
        false,
        '搜索地址信息'
      )
      .subscribe(data => {
        this.step3.searchLoading = false;

        if (data.returnCode === '1000') {
          for (const item of data.records) {
            this.step3.searchData.push(
              `${item.areaTcResult}-${item.districtTcResult}-${
                item.streetTcResult
              }-${item.bldgTcResult}`
            );
          }
          console.log(this.step3.searchData);
        }
      });
  }

  /**
   * 搜索框邊輸入邊搜索
   * @memberof ComeOnStageComponent
   */
  inputSearch() {
    const searchFlag = this.step3.searchFlag;

    if (searchFlag) {
      clearTimeout(searchFlag);
    }

    this.step3.searchFlag = Number(
      setTimeout(() => {
        this.search();
      }, 1000)
    );
  }

  /**
   * 搜索綁定enter
   * @param {KeyboardEvent} e
   * @memberof ComeOnStageComponent
   */
  enterSearch(e: KeyboardEvent) {
    console.log(e);
    if (e.keyCode === 13) {
      e.preventDefault();
      this.search();
    }
  }

  /**
   * 選中搜索内容
   * @param {*} item
   * @memberof ComeOnStageComponent
   */
  chooseSearchItem(item) {
    const addressArr = item.split('-');
    const area = addressArr[0];
    const district = addressArr[1];
    const street = addressArr[2];
    const address = addressArr[3];

    this.step3.searchShow = false;

    this.step3.areaAndDistrictValue = [area, district];
    this.step3.streetValue = street;
    this.step3.addressValue = address;
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
        linkTitle: '換另一組新號碼',
        selectPhone: value => {
          this.step2.phoneValue = value;
        }
      },
      nzFooter: null
    });
  }

  /**
   * 選擇上臺方式時清空手機號碼選項
   * @memberof ComeOnStageComponent
   */
  registerTypeChange() {
    this.step2.phoneValue = '';
    this.validateForm.value.choosePhone = '';
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
        phoneNo: [
          null,
          [Validators.required, pattern(validator.hongkongPhone())]
        ],
        firstName: [null, [Validators.required, pattern(validator.en())]],
        lastName: [null, [Validators.required, pattern(validator.en())]],
        sex: [null, [Validators.required, pattern(validator.number())]],
        birth: [null, [Validators.required]],
        idCardHead: [
          null,
          [Validators.required, pattern(validator.idCardHead())]
        ],
        idCardEnd: [
          null,
          [Validators.required, pattern(validator.idCardEnd())]
        ],
        phone: [
          null,
          [Validators.required, pattern(validator.hongkongPhone())]
        ],
        email: [null, [Validators.required]],
        file: [null, [Validators.required]],
        areaAndDistrict: [null, [Validators.required]],
        street: [null, [Validators.required]],
        address: [null, [Validators.required]],
        effectDate: [null, [Validators.required]],
        effectTime: [null, [Validators.required]],
        months: [null, []],
        registerType: [null, [Validators.required]],
        card: [null, [Validators.required]]
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
      if (
        item.status === 'done' &&
        item.response &&
        item.response.returnCode.toString() === '1000'
      ) {
        fileUrlArr.push(item.response.dataInfo.url);
      } else {
        if (item.response && item.response.returnCode.toString() !== '1000') {
          item.status = 'error';
          if (!item.isTiped) {
            item.isTiped = true;
            this.notice.create('error', '上載失敗', item.response.message);
          }
        }
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

    // 校驗手機號碼
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
