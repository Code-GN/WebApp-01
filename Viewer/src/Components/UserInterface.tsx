import React from "react";
import Application from "#/Core/Application";
import Icon from "#/Components/Icon";
import IconBtn from "#/Components/IconBtn";
import Modal from "#/Components/Modal/Modal";
import '#/SCSS/user-interface.scss';


type Props = {
  app: Application;
};
type State = {};

/**
 * ユーザーインターフェース
 */
export default class UserInterface extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidMount(): void {
    const app = this.props.app;
    app.components.ui = this;

    // ログオンしていない場合 ログオンパネルを表示
    if (!app.user.isLogon) {
      app.components.modal!.showPanel(
        Modal.Panel.LogonPanel
      );
    }
  }

  render() {
    const app = this.props.app;
    return (
      <div id="ui">
        <header>
          <div><h1>{app.title}</h1></div>
          <div>
            <IconBtn glyph={Icon.glyph.User} label={app.user.displayName} />
            <IconBtn glyph={Icon.glyph.Gear} />
          </div>
        </header>

        <main>
          <nav id="global-navi">
            <ul>
              <li><IconBtn glyph={Icon.glyph.Dashboard} /></li>
              <li><IconBtn glyph={Icon.glyph.Note} /></li>
            </ul>
          </nav>

          <div id="content">content</div>
        </main>

        <footer><span>(c) Code-GN all rights received.</span></footer>
        <Modal
          app={app}
          ui={this} />
      </div>
    );
  }
}
