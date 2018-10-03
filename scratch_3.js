class Tree {

  constructor(value) {
    this.value = value;
    this.children = [];
    Tree.registry.set(value, this);
  }

  addChildFor(value) {
    if (this.children.includes(value)) {
      return;
    }
    if (!tree.registry.has(value)) {
      tree.registry.set(value, new Tree(value));
    }
    this.children.push(v);
  }

  render() {
   return '(' + this.value + this.children.map((a) => tree.registry.get(a).render()).join(',') +  ')';
  }
}

Tree.registry = new Map();

Tree.addPair = (a, b) => {
  if (!Tree.registry.has(a)) {
    Tree.registry.set(a, new Tree(a));
  }
  Tree.registry.get(a).addChildFor(b);
}

Tree.getParent = () => {
  let letters = Array.from(Tree.registry.keys());
  let trees = Array.from(Tree.registry.values());
  let children = _(trees)
    .map((t) => t.children)
    .uniq()
    .value();

  let upv = letters.difference(children);
  if (upv.length !== 1) {
    return 'E4';
  }

  return Tree.registry.get(upv[0]).render();
}
