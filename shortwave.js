import Quill from './core';
import Indent from './formats/indent';

import Blockquote from './formats/blockquote';
import Header from './formats/header';
import List from './formats/list';

import Bold from './formats/bold';
import Italic from './formats/italic';
import Link from './formats/link';
import Strike from './formats/strike';
import Underline from './formats/underline';

import CodeBlock, {Code as InlineCode} from './formats/code';

// Only stuff that shortwave needs here.

Quill.register(
  {
    'formats/indent': Indent,

    'formats/blockquote': Blockquote,
    'formats/code-block': CodeBlock,
    'formats/header': Header,
    'formats/list': List,

    'formats/bold': Bold,
    'formats/code': InlineCode,
    'formats/italic': Italic,
    'formats/link': Link,
    'formats/strike': Strike,
    'formats/underline': Underline,
  },
  true,
);

export default Quill;
