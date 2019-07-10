// TODO: 後期爭取能夠將所有的接口返回數據類型全部在此處定義（或者分文件定義）

/**
 * 狀態類型
 * @export
 * @class StateBase
 */
export class StateBase {
  id: string; // 唯一标识
  value: any; // 值
  name: string; // 名字
  describe: string; // 描述
}
