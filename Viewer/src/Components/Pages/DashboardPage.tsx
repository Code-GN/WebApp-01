import React from "react";
import Application from "#/Core/Application";

type Props = {
  app: Application;
};
type State = {};

/**
 * ダッシュボードページ
 */
export default class DashboardPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="dashboard-page" className="page">
        <header><h2>ダッシュボード</h2></header>
        <main></main>
        <footer></footer></div>
    );
  }
}
