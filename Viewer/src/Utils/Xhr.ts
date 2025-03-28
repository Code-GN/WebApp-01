export default class Xhr {

  /**
   * JSONデータを取得
   * @param url URL
   * @param auth 認証情報
   * @param raiseError エラー時に raise error
   * @returns 
   */
  static async getJson(
    url: string,
    auth: string,
    raiseError: boolean = true,
  ): Promise<any | null> {

    // ヘッダを作成
    const headers: HeadersInit = {};
    if (auth) {
      headers.Authorization = auth;
    }

    // リクエストを送信
    const response = await fetch(url, {
      'method': 'GET',
      'headers': headers,
    });

    // END: レスポンスがエラー
    if (!response.ok) {
      if (raiseError) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return null;
    }

    return await response.json();
  }
}
