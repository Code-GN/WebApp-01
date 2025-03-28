import React from "react";
import Application from "#/Core/Application";
import UserInterface from "#/Components/UserInterface";
import '#/SCSS/modal.scss';

type Props = {
  app: Application;
  ui: UserInterface;
};

type State = {
  panel?: typeof Panel[keyof typeof Panel];
  target?: any;
  animState: typeof AnimState[keyof typeof AnimState];
};

/**
 * モーダル
 */
export default class Modal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      panel: undefined,
      target: undefined,
      animState: AnimState.Hidden,
    };
  }

  /** @param Panel 表示可能なパネル */
  static get Panel() {
    return Panel;
  }

  componentDidMount(): void {
    const app = this.props.app;
    app.components.modal = this;
  }

  /**
   * モーダル表示アニメーション 完了時イベント
   */
  onAnimEnd() {
    const animState = this.state.animState;
    if (animState === AnimState.Open) {
      this.setState({ animState: AnimState.Visible });
    } else if (animState === AnimState.Close) {
      this.setState({
        animState: AnimState.Hidden,
        panel: undefined,
        target: undefined,
      });
    }
  }

  /**
   * パネルを表示・非表示
   * @param panel 表示するパネル
   * @param target 編集対象
   */
  showPanel(
    panel?: typeof Panel[keyof typeof Panel],
    target?: any
  ) {
    const animState = this.state.animState;
    if (panel) {
      if ([AnimState.Hidden, AnimState.Close].includes(animState)) {
        this.setState({
          animState: AnimState.Open,
          panel: panel,
          target: target
        });
      }
    } else {
      if ([AnimState.Visible, AnimState.Open].includes(animState)) {
        this.setState({ animState: AnimState.Close });
      }
    }
  }

  render() {
    const animState = this.state.animState;
    if (animState === AnimState.Hidden) {
      return null;
    }

    const anim = animState.toLowerCase();

    return (
      <div
        id="modal-wrap"
        className={anim}
        onAnimationEnd={this.onAnimEnd.bind(this)}>
        <div id="modal"></div>
      </div>
    );
  }
}

const AnimState = {
  Open: 'Open',
  Close: 'Close',
  Visible: 'Visible',
  Hidden: 'Hidden',
};

const Panel = {
  LogonPanel: 'LogonPanel',
};
