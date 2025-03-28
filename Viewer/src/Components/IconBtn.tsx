import React from "react";
import Icon from "#/Components/Icon";

type Props = {
  glyph: typeof Glyph[keyof typeof Glyph];
  label?: string;
  id?: string;
  className?: string;
  onClick?: React.PointerEventHandler<HTMLButtonElement>;
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
    const onClick = this.props.onClick;

    const id = this.props.id;
    const className = (this.props.className || '') + ' icon-button';

    return label ? (
      <button type="button" id={id} className={className} onClick={onClick}>
        <Icon glyph={glyph} />
        <label>{label}</label>
      </button>
    ) : (
      <button type="button" id={id} className={className} onClick={onClick}>
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
