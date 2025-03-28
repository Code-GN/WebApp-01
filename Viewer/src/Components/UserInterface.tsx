import React from "react";
import Application from "#/Core/Application";
import Icon from "#/Components/Icon";
import IconBtn from "#/Components/IconBtn";
import Modal from "#/Components/Modal/Modal";
import '#/SCSS/user-interface.scss';


type Props = {
  app: Application;
};
type State = {
  page?: typeof Pages[keyof typeof Pages]; // TODO: keyだけで判別
};

/**
 * ユーザーインターフェース
 */
export default class UserInterface extends React.Component<Props, State> {
  private globalNaviItemIDPrefix: string;

  constructor(props: Props) {
    super(props);
    this.state = {
      page: undefined,
    };

    this.globalNaviItemIDPrefix = 'global-navi-item-';
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

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
    snapshot?: any
  ): void {
    const app = this.props.app;
    const page = this.state.page;

    // ログオン成功で モーダル非表示
    const modal = app.components.modal;
    if (modal && modal.state.panel === Modal.Panel.LogonPanel) {
      modal.showPanel();
      if (!page) {
        this.setState({ page: Pages.Dashboard });
      }
    }
  }

  onClickGlobalMenuItem(e: React.PointerEvent<HTMLButtonElement>) {
    const id = e.currentTarget.id;
    const prefix = this.globalNaviItemIDPrefix;

    const targetKey = id.substring(prefix.length);
    let targetItem = undefined;
    Object.keys(Pages).forEach(key => {
      const menuItem = Pages[key as keyof typeof Pages];
      if (targetKey === menuItem.name) {
        targetItem = Pages[key as keyof typeof Pages];
      }
    });

    if (!targetItem) {
      throw new Error('Global menu item not found.');
    }

    this.setState({ page: targetItem });
  }

  render() {
    const app = this.props.app;
    const page = this.state.page;
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
              {
                Object.keys(Pages).map(key => {
                  const menuItem = Pages[key as keyof typeof Pages];
                  const className = page === menuItem ? 'selected' : undefined;
                  const id = this.globalNaviItemIDPrefix + menuItem.name;
                  return (
                    <li key={id}>
                      <IconBtn
                        glyph={menuItem.glyph}
                        id={id}
                        className={className}
                        onClick={this.onClickGlobalMenuItem.bind(this)} />
                    </li>
                  );
                })
              }
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

const Pages = {
  'Dashboard': { name: 'dashboard', glyph: Icon.glyph.Dashboard },
  'Memo': { name: 'memo', glyph: Icon.glyph.Note },
};
