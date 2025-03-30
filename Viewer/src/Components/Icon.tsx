import React from "react";


type Props = {
  glyph: typeof Glyph[keyof typeof Glyph];
};
type State = {};

/**
 * SVGアイコン
 */
export default class Icon extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  static get glyph() {
    return Glyph;
  }

  render() {
    const g = this.props.glyph;
    const href = `svg/${g}.svg#icon-${g}`;
    return (
      <svg className="icon" viewBox="0 0 24 24">
        <use href={href} />
      </svg>
    );
  }
}

const Glyph = {
  Chevron: 'chevron',
  Dashboard: 'dashboard',
  Gear: 'gear',
  Note: 'note',
  User: 'user',
};
