import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {
  /**
   * 表单中不允许输入某些敏感信息
   * @param {RegExp} nameRe
   * @returns {ValidatorFn}
   * @memberof FormValidatorService
   */
  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }

  /**
   * 香港電話號碼
   * @returns {RegExp}
   * @memberof FormValidatorService
   */
  hongkongPhone(): RegExp {
    return /^([6|9])\d{7}$/;
  }

  /**
   * 目前系統支持的4位英文或數字驗證碼
   * @returns {RegExp}
   * @memberof FormValidatorService
   */
  verCode(): RegExp {
    return /[0-9a-zA-Z]{4}/;
  }

  /**
   * 英文
   * @returns {RegExp}
   * @memberof FormValidatorService
   */
  en(): RegExp {
    return /^[a-zA-Z][a-zA-Z]*$/;
  }

  number(): RegExp {
    return /^[0-9][0-9]*$/;
  }

  /**
   * 香港身份證前半段
   * @returns {RegExp}
   * @memberof FormValidatorService
   */
  idCardHead(): RegExp {
    return /^[A-Za-z]{1}[0-9]{6}$/;
  }

  idCardEnd(): RegExp {
    return /^[0-9aA]$/;
  }

  constructor() {}
}
