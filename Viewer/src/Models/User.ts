import { APIURL } from "#/Constants";
import AuthUtil from "#/Utils/AuthUtil";
import Xhr from "#/Utils/Xhr";

/**
 * ユーザモデル
 */
export default class User {
  UID: number;
  userID: string;
  displayName: string;

  constructor(
    uid: number,
    userID: string,
    displayName: string,
  ) {
    this.UID = uid;
    this.userID = userID;
    this.displayName = displayName;
  };

  static get dummy() {
    return new User(-1, '', 'Nobody');
  }

  /**
   * オブジェクトをユーザに変換
   * @param data ユーザ情報
   * @returns ユーザ
   */
  static fromObj(data: any): User {
    return new User(
      Number.parseInt(data.UID),
      data.UserID,
      data.DisplayName,
    );
  }

  /**
   * ログオンを試行
   * @param id ユーザID
   * @param pw パスワード
   * @returns ユーザ
   */
  static async logon(id: string, pw: string): Promise<User | null> {
    // 前処理
    const cred = AuthUtil.basicCredential(id, pw);
    const url = APIURL.Logon;

    // リクエスト送信
    const response = await Xhr.getJson(url, cred, false);
    if (!response) {
      return null;
    }

    // ユーザを復元
    const user = User.fromObj(response.User);
    return user;
  }
}
