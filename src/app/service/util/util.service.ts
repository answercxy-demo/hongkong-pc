import { Injectable } from '@angular/core';
import { StateService } from '../state/state.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  /**
   * 快速定位至相应区域
   * @param {*} id
   * @memberof UtilService
   */
  anchorTo(id) {
    // 找到已定义在最外层的锚点控制节点
    const anchorLinkElement: HTMLElement = document.querySelector(
      '#anchorLink a'
    );
    const TARGET_ID_NAME = 'temp_anchorLinkTarget';
    let targetId = TARGET_ID_NAME;

    // 清除此前设置的临时id
    if (!!document.getElementById(targetId)) {
      document.getElementById(targetId).id = null;
    }

    switch (typeof id) {
      case 'string':
        targetId = id;
        break;
      case 'object':
        if (id instanceof HTMLElement) {
          id.id = targetId;
        }
        break;
      default:
        break;
    }

    // id节点不存在错误抛出
    if (!document.getElementById(targetId)) {
      console.warn(`不存在id为${targetId}的节点`);
      return void 0;
    }

    this.state.anchor.value = '#' + targetId;

    // TODO: 这里可能是不准确的一个隐患【待优化】,需要研究angular对于单向绑定的实现机制或者重写锚点实现
    setTimeout(() => {
      anchorLinkElement.click();
    });
  }

  /**
   * 設置等待中
   * @param {boolean} bool
   * @memberof UtilService
   */
  spinning(bool: boolean) {
    this.state.spinning.value = bool;
  }

  constructor(private state: StateService) {}
}
