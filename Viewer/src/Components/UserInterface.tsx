import React from "react";
import Application from "#/Core/Application";
import DashboardPage from "#/Components/Pages/DashboardPage";
import Icon from "#/Components/Icon";
import IconBtn from "#/Components/IconBtn";
import Modal from "#/Components/Modal/Modal";
import NotePage from "#/Components/Pages/NotePage";


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
        this.showPage(Pages.Dashboard);
      }
    }
  }

  /**
   * グローバルメニューアイテム 押下時イベント
   * @param e イベント
   */
  onClickGlobalMenuItem(e: React.PointerEvent<HTMLButtonElement>) {
    const app = this.props.app;

    // 押されたアイテムのIDを取得
    const id = e.currentTarget.id;
    const prefix = this.globalNaviItemIDPrefix;

    // 押されたアイテムのページを取得
    const targetKey = id.substring(prefix.length);
    let targetItem: typeof Pages[keyof typeof Pages] | undefined = undefined;
    Object.keys(Pages).forEach(key => {
      const menuItem = Pages[key as keyof typeof Pages];
      if (targetKey === menuItem.name) {
        targetItem = Pages[key as keyof typeof Pages];
      }
    });

    // END: アイテムが無い
    if (!targetItem) {
      throw new Error('Global menu item not found.');
    }

    // ページを更新
    this.showPage(targetItem);
  }

  /**
   * ページを表示
   * @param page ページ
   */
  showPage(page: typeof Pages[keyof typeof Pages]) {
    const app = this.props.app;
    app.browserTitle = `${app.title} | ${page.label}`;
    this.setState({ page: page });
  }

  /**
   * 表示するページを選択
   * @returns ページ
   */
  getPage() {
    const app = this.props.app;
    const page = this.state.page;
    if (!page) {
      return null;
    }

    switch (page.name) {
      case 'dashboard':
        return <DashboardPage app={app} />;
      case 'memo':
        return <NotePage app={app} />;
    }

    throw new Error(`Unknown page "${page.name}".`);
  }

  render() {
    const app = this.props.app;
    const page = this.state.page;
    const pageHeaderLabel = page ? (<span> | {page.label}</span>) : undefined;
    return (
      <div id="ui">
        <header>
          <div><h1>{app.title}{pageHeaderLabel}</h1></div>
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

          <div id="content">{this.getPage()}</div>
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
  'Dashboard': { name: 'dashboard', label: 'ダッシュボード', glyph: Icon.glyph.Dashboard },
  'Memo': { name: 'memo', label: 'メモ', glyph: Icon.glyph.Note },
};
