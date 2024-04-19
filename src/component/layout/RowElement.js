
import { LitElement, html, css, nothing } from 'lit';

/**
 * A row element which allows you to create a row with cells, either populating
 * the row elements left to right or right to left.
 * 
 * @class
 * 
 * Example:
 * 
 * ```html
 * <wc-row>
 *  <wc-row-6>
 *      <!-- content goes here -->
 *  </wc-row-6>
 * </wc-row>
 * ```
 */
export class RowElement extends LitElement {
  static localName = 'wc-row';

  constructor() {
    super();
    this.backgroundColor = '';
  }
  static get properties() {
    return {
      /** 
       * The badge background color. One of the following: primary, secondary, success, warning, danger, light, dark
       * @type {String}
       * @memberof BadgeElement
       */
      backgroundColor: { type: String },
    };
  }
  static get styles() {
    return css`
      slot {
          position: relative;
          display: flex;
          flex: 0 1 auto;
          flex-direction: row;
          flex-wrap: wrap;
      }
      .bg-color-primary {
        background-color: var(--primary-color);
        color: var(--light-color);
      }
      .bg-color-secondary {
        background-color: var(--secondary-color);
        color: var(--dark-color);
      }
      .bg-color-success {
        background-color: var(--success-color);
        color: var(--light-color);
      }
      .bg-color-warning {
        background-color: var(--warning-color);
        color: var(--light-color);
      }
      .bg-color-error {
        background-color: var(--error-color);
        color: var(--light-color);
      }
      .bg-color-light {
        background-color: var(--light-color);
        color: var(--dark-color);
      }
      .bg-color-dark {
        background-color: var(--dark-color);
        color: var(--light-color);
      }
    `;
  }
  render() {
    return html`
        <slot class="bg-color-${this.backgroundColor}"></slot>
    `;
  }
}

export class RowCellElement extends LitElement {
  static localName = 'wc-row-cell';

  constructor() {
    super();
    this.width = 0;
  }
  static get properties() {
    return {
      /** 
       * The width of the cell, in a 12 column grid
       * @type {Number}
       * @memberof RowCellElement
       */
      width: { type: Number },
    };
  }
  get flexBasis() {
    if (this.width <= 12) {
      return `${this.width * (100 / 12)}%`;
    }
    return 'none';
  }

  get display() {
    return this.width ? 'block' : 'none';
  }
  render() {
    this.style.maxWidth = `${this.flexBasis}`;
    this.style.flexBasis = `${this.flexBasis}`;
    this.style.display = `${this.display}`;
    return html`
        <slot></slot>
    `;
  }
}

export class RowCell1Element extends RowCellElement {
  static localName = 'wc-row-1';

  constructor() {
    super();
    this.width = 1;
  }
}

export class RowCell2Element extends RowCellElement {
  static localName = 'wc-row-2';

  constructor() {
    super();
    this.width = 2;
  }
}

export class RowCell3Element extends RowCellElement {
  static localName = 'wc-row-3';

  constructor() {
    super();
    this.width = 3;
  }
}

export class RowCell4Element extends RowCellElement {
  static localName = 'wc-row-4';

  constructor() {
    super();
    this.width = 4;
  }
}

export class RowCell5Element extends RowCellElement {
  static localName = 'wc-row-5';

  constructor() {
    super();
    this.width = 5;
  }
}

export class RowCell6Element extends RowCellElement {
  static localName = 'wc-row-6';

  constructor() {
    super();
    this.width = 6;
  }
}

export class RowCell7Element extends RowCellElement {
  static localName = 'wc-row-7';

  constructor() {
    super();
    this.width = 7;
  }
}

export class RowCell8Element extends RowCellElement {
  static localName = 'wc-row-8';

  constructor() {
    super();
    this.width = 8;
  }
}

export class RowCell9Element extends RowCellElement {
  static localName = 'wc-row-9';

  constructor() {
    super();
    this.width = 9;
  }
}

export class RowCell10Element extends RowCellElement {
  static localName = 'wc-row-10';

  constructor() {
    super();
    this.width = 10;
  }
}

export class RowCell11Element extends RowCellElement {
  static localName = 'wc-row-11';

  constructor() {
    super();
    this.width = 11;
  }
}


export class RowCell12Element extends RowCellElement {
  static localName = 'wc-row-12';

  constructor() {
    super();
    this.width = 12;
  }
}
