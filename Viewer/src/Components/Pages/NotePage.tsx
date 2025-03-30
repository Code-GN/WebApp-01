import React from "react";
import Application from "#/Core/Application";
import Icon from "#/Components/Icon";
import IconBtn from "#/Components/IconBtn";

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

        <div
          className="page-content">
          <header>
            <div>
              <input type="text" className="note-title" defaultValue={'新しいメモ'} />
            </div>
            <div className="controller">
              <IconBtn
                className="positive"
                glyph={Icon.glyph.Chevron}
                iconAlign="Right"
                label="メモを追加" />
            </div>
          </header>

          <main>
            <textarea className="typeA"></textarea>
          </main>

          <footer>
          </footer>
        </div>

        <nav
          className="side-menu">
          <ul>
            <li>メモを作成</li>
            <li>note A</li>
            <li>note B</li>
            <li>note C</li>
          </ul>
        </nav>

      </div>
    );
  }
}
