import React from "react";
import Icon from "#/Components/Icon";

type Props = {
  glyph: typeof Glyph[keyof typeof Glyph];
  label?: string;
};
type State = {};

/**
 * SVGアイコンボタン
 */
export default class IconBtn extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  static get glyph() {
    return Glyph;
  }

  render() {
    const label = this.props.label;
    const glyph = this.props.glyph;
    return label ? (
      <button type="button" className="icon-button">
        <Icon glyph={glyph} />
        <label>{label}</label>
      </button>
    ) : (
      <button type="button" className="icon-button">
        <Icon glyph={glyph} />
      </button>
    );
  }
}

const Glyph = {
  Dashboard: 'dashboard',
  Gear: 'gear',
  Note: 'note',
  User: 'user',
};
