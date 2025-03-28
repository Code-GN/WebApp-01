import React from "react";

type Props = {
  app: any;
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
  }

  render() {
    return (
      <div>Hello world</div>
    );
  }
}
