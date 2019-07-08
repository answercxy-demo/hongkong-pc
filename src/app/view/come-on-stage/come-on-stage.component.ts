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
    modeValue: 'A',
    cardValue: 'A'
  };

  step3 = {
    order: 3,
    name: '個人資料',
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
    currentDate: new Date(2000, 0, 1)
  };

  step4 = {
    order: 4,
    name: '生效日期',
    //   New sales: 周四至周五是 T+4     周日至周三是 T+2          周六是T+3
    // M N P:       周四至周五是T+5      周日至周三是T+3              周六是T+4
    disabledDate: current => {
      if (this.step2.modeValue === 'A') {
      } else {
      }
    }
  };

  validateForm: FormGroup;

  confirm = {
    show: false
  };

  detail = {};

  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

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

          this.activityDetail.items[0].value =
            data.dataInfo.businessSpecDesc || '--';
          this.activityDetail.items[1].value = `${data.dataInfo.callMinutes ||
            '--'}分鐘`;
        }
      });
  }

  /**
   * 獲取業務子集詳情信息
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
   * 頁面數據初始化
   * @memberof ComeOnStageComponent
   */
  dataInit() {
    if (!!this.id) {
      this.getBusinessInfo();
      this.getSaleAndVasInfo();
    } else {
      this.notice.create(
        'warning',
        '提示',
        '您好，請確認您的業務包id是否正確！'
      );
    }
  }

  /**
   * 确认表单填写无误
   * @memberof ComeOnStageComponent
   */
  next() {
    this.util.goTop();
    this.confirm.show = true;
  }

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
    private customValidator: FormValidatorService
  ) {}

  ngOnInit() {
    this.dataInit();
    this.validateForm = this.fb.group(
      {
        months: [
          null,
          [
            Validators.required
            // Validators.pattern(this.customValidator.verCode())
          ]
        ],
        xx: [
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
        ],
        phone: [
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
}
