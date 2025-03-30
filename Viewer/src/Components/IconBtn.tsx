import React from "react";
import Icon from "#/Components/Icon";

type Props = {
  glyph: typeof Icon.glyph[keyof typeof Icon.glyph];
  label?: string;
  iconAlign?: 'Left' | 'Right';
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

  render() {
    const label = this.props.label;
    const glyph = this.props.glyph;
    const onClick = this.props.onClick;

    const align = this.props.iconAlign || 'Left';

    const id = this.props.id;
    const className = [
      'icon-button',
      this.props.className,
      align === 'Right' ? 'icon-right' : undefined,
    ].filter(item => !!item).join(' ');

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
