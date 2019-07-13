import { Component, OnInit } from '@angular/core';
import { FormValidatorService } from '../../service/formValidator/form-validator.service';
import { NzMessageService } from 'ng-zorro-antd';

import { ApiService } from '../../service/api/api.service';
import { UniversalRequestService } from '../../service/request/universal/universal-request.service';

import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-order-query',
  templateUrl: './order-query.component.html',
  styleUrls: ['./order-query.component.less']
})
export class OrderQueryComponent implements OnInit {
  validateForm: FormGroup;

  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.message.error('驗證碼錯誤');
  }

  constructor(
    private fb: FormBuilder,
    private customValidator: FormValidatorService,
    private message: NzMessageService,
    private apiService: ApiService,
    private universal: UniversalRequestService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group(
      {
        phone: [
          null,
          [
            Validators.required,
            Validators.pattern(this.customValidator.hongkongPhone())
          ]
        ],
        code: [
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
