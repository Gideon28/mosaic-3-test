import { isIEorEdge } from './is-ie-or-edge.util';

export const buttonGenerator = (config) => ({
  get action() {
    return this.disable && this.enabled ? this.disable : this.enable;
  },
  get enabled() {
    if (this.command) {
      return this.checkCommand(this.command, this.value) || document.queryCommandState(this.command);
    }
    return false;
  },
  getParents(node: Node, parents: string[] = []) {
    const parent = node.parentNode;
    if (!parent) {
      return parents;
    }
    const nodeName = parent.nodeName.toLowerCase();
    if (nodeName !== 'div') {
      return this.getParents(parent, [...parents, nodeName]);
    }
    return parents;
  },
  checkCommand(command: string, value: string) {
    if (isIEorEdge() && value === 'blockquote') {
      const node = window.getSelection().anchorNode;
      if (node && node.parentElement) {
        const element = node.parentElement;
        return element.classList.contains('quote') || ((node as any).classList && (node as any).classList.contains('quote'));
      }
      return false;
    }
    if (isIEorEdge()) {
      const baseNode = window.getSelection().anchorNode;
      if (!baseNode) {
        return false;
      }
      const parents = this.getParents(baseNode);

      return parents && parents.includes(value);
    } else {
      return document.queryCommandValue(command) === value;
    }
  },
  ...config,
});
