import EventEmitter from 'eventemitter3';
import instances from './instances';
import logger from './logger';

const debug = logger('quill:events');
const EVENTS = ['selectionchange', 'mousedown', 'mouseup', 'click'];

EVENTS.forEach(eventName => {
  document.addEventListener(eventName, (...args) => {
    Array.from(document.querySelectorAll('.ql-container')).forEach(node => {
      const quill = instances.get(node);
      if (quill && quill.emitter) {
        quill.emitter.handleDOM(...args);
      }
    });
  });
});

class Emitter extends EventEmitter<string> {
  static events = {
    EDITOR_CHANGE: 'editor-change',
    SCROLL_BEFORE_UPDATE: 'scroll-before-update',
    SCROLL_BLOT_MOUNT: 'scroll-blot-mount',
    SCROLL_BLOT_UNMOUNT: 'scroll-blot-unmount',
    SCROLL_OPTIMIZE: 'scroll-optimize',
    SCROLL_UPDATE: 'scroll-update',
    SCROLL_EMBED_UPDATE: 'scroll-embed-update',
    SELECTION_CHANGE: 'selection-change',
    TEXT_CHANGE: 'text-change',
  } as const;

  static sources = {
    API: 'api',
    SILENT: 'silent',
    USER: 'user',
  } as const;

  // @ts-expect-error listeners is declared in EventEmitter as a function
  listeners: Record<string, { node: Node; handler: Function }[]>;

  debug: boolean;
  callDepth: number;

  constructor(debugMode = false) {
    super();
    this.debug = debugMode;
    this.callDepth = 0;
    this.listeners = {};
    this.on('error', debug.error);
  }

  emit(...args: unknown[]): boolean {
    debug.log.call(debug, ...args);
    if (this.debug) {
      this.callDepth += 1;
      if (this.callDepth > 1000) {
        throw new Error('Too deep of call depth in emitter!');
      }
    }
    // @ts-expect-error
    const emitValue = super.emit(...args);
    if (this.debug) {
      this.callDepth -= 1;
    }

    return emitValue;
  }

  handleDOM(event, ...args: unknown[]) {
    (this.listeners[event.type] || []).forEach(({ node, handler }) => {
      if (event.target === node || node.contains(event.target)) {
        handler(event, ...args);
      }
    });
  }

  listenDOM(eventName: string, node, handler) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push({ node, handler });
  }
}

export type EmitterSource =
  (typeof Emitter.sources)[keyof typeof Emitter.sources];

export default Emitter;
