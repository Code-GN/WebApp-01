import React from "react";
import Application from "#/Core/Application";

type Props = {
  app: Application;
};
type State = {};

/**
 * メモページ
 */
export default class NotePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="note-page" className="page">
        <header><h2>メモ</h2></header>
        <main></main>
        <footer></footer>
      </div>
    );
  }
}
