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

  title = {
    name: '服務計劃',
    desc: '計劃名稱'
  };

  activityDetail = {
    name: '服務計劃詳情',
    items: [
      { name: '數據用量', value: '無限大' },
      { name: '本地通話分鐘', value: '無限大' },
      { name: '額外數據用量', value: '無限大' }
    ]
  };

  step_1 = {
    order: 1,
    name: '合約期'
  };

  step_2 = {
    order: 2,
    name: '請選擇上臺方式',
    modeValue: 'A',
    cardValue: 'A'
  };

  step_3 = {
    order: 3,
    name: '個人資料'
  };

  step_4 = {
    order: 4,
    name: '生效日期'
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

  dataInit() {
    if (!!this.id) {
      this.apiService
        .post('umall/business/consumer/business/query', {
          id: this.id,
          orgId: '977090533766828033',
          userId: '1010053936724500480',
          appId: 10000188
        })
        .subscribe(data => {});
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

  constructor(
    private route: ActivatedRoute,
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
        firstName: [
          null,
          [
            Validators.required,
            Validators.pattern(this.customValidator.hongkongPhone())
          ]
        ],
        xx: [
          null,
          [
            Validators.required,
            Validators.pattern(this.customValidator.verCode())
          ]
        ],
        dd: [
          null,
          [
            Validators.required,
            Validators.pattern(this.customValidator.verCode())
          ]
        ]
      }
      // { updateOn: 'blur' }
    );
  }
}
