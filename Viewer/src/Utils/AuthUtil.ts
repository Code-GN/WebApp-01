export default class AuthUtil {

  static basicCredential(id: string, pw: string): string {
    return `Basic ${btoa(`${id}:${pw}`)}`;
  }
}
