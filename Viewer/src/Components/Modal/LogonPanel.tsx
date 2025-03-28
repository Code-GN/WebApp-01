import React from "react";
import Application from "#/Core/Application";
import User from "#/Models/User";
import Icon from "#/Components/Icon";
import Modal from "#/Components/Modal/Modal";

type Props = {
  app: Application;
  modal: Modal;
};

type State = {
  id: string;
  password: string;
};

/**
 * モーダル用 ログオンパネル
 */
export default class LogonPanel extends React.Component<Props, State> {
  private idFormID: string;
  private pwFormID: string;

  constructor(props: Props) {
    super(props);

    this.idFormID = 'modal-logon-panel-id';
    this.pwFormID = 'modal-logon-panel-password';

    this.state = {
      id: '',
      password: '',
    };
  }

  /**
   * Input要素 変更時イベント
   * @param e イベント
   */
  onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.currentTarget;
    const inputID = target.id;
    if (inputID === this.idFormID) {
      this.setState({ id: target.value });
    } else {
      this.setState({ password: target.value });
    }
  }

  /**
   * ログオンボタン 押下時イベント
   * @param e イベント
   */
  async tryLogon(e: React.PointerEvent<HTMLButtonElement>) {
    const app = this.props.app;
    const id = this.state.id;
    const pw = this.state.password;

    const user = await User.logon(id, pw);
    if (user) {
      app.user = user;
      app.render();
    } else {
      // TODO:
      alert('ログオンに失敗しました');
    }
  }

  render() {
    return (
      <div
        id="modal-logon-panel"
        className="modal">
        <header>
          <Icon glyph={Icon.glyph.User} />
          <span>ログオン</span>
        </header>

        <main>
          <table>
            <tbody>
              <tr>
                <th>
                  <label htmlFor={this.idFormID}>ログオンID</label>
                </th>
                <td>
                  <input
                    id={this.idFormID}
                    className="typeA"
                    type="text"
                    value={this.state.id}
                    onChange={this.onChangeInput.bind(this)} />
                </td>
              </tr>
              <tr>
                <th>
                  <label htmlFor={this.pwFormID}>パスワード</label>
                </th>
                <td>
                  <input
                    id={this.pwFormID}
                    className="typeA"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChangeInput.bind(this)} />
                </td>
              </tr>
            </tbody>
          </table>
        </main>

        <footer>
          <button
            className="typeA"
            onClick={this.tryLogon.bind(this)}>ログオン</button>
        </footer>
      </div>
    );
  }
}
