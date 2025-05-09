import React from "react";
import ReactDOM from "react-dom/client";
import User from "#/Models/User";
import Modal from "#/Components/Modal/Modal";
import UserInterface from "#/Components/UserInterface";

/**
 * アプリケーション
 */
export default class Application {
  private renderTargetSelector: string;
  public components: Components;
  public title: string;
  public user: User;

  constructor(selector: string) {
    this.user = User.dummy;
    this.title = 'WebApps';
    this.browserTitle = 'WebApps';
    this.renderTargetSelector = selector;
    this.components = {};
    this._init();
  }

  /** @param isRendered 描画済みか */
  get isRendered() {
    return !!this.components.ui;
  }

  /** @param text ブラウザに表示する文字列 */
  set browserTitle(text: string) {
    document.querySelector('title')!.textContent = text;
  }

  /**
   * 初期化処理
   */
  async _init() {
    this.render();
  }

  /**
   * 描画処理
   */
  render() {

    // 描画済みの場合は更新
    if (this.isRendered) {
      this.components.ui!.forceUpdate();
      return;
    }

    // 描画先Elementの取得
    const selector = this.renderTargetSelector;
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`Element with selector "${selector}" not found`);
    }

    // 描画
    const root = ReactDOM.createRoot(element);
    root.render(React.createElement(UserInterface, { app: this }));
  }
}

type Components = {
  ui?: UserInterface;
  modal?: Modal;
};
