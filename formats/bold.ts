import Inline from '../blots/inline';

const NON_BOLD_FONT_WEIGHTS = ['normal', 'lighter'];

// @ts-expect-error TODO: Inline.tagName should be string[] | string
class Bold extends Inline {
  static blotName = 'bold';
  static tagName = ['STRONG', 'B'];

  static create() {
    // @ts-expect-error
    return super.create();
  }

  static formats(node) {
    const fontWeightNumber = parseInt(node.style.fontWeight, 10);
    const isNormalWeight =
      fontWeightNumber <= 400 ||
      NON_BOLD_FONT_WEIGHTS.includes(node.style.fontWeight);
    // If this is a b-tag that is supposed to format normally, just return undefined so no format is not applied.
    if (isNormalWeight) return undefined;
    return true;
  }

  optimize(context) {
    super.optimize(context);
    if (this.domNode.tagName !== this.statics.tagName[0]) {
      this.replaceWith(this.statics.blotName);
    }
  }
}

export default Bold;
