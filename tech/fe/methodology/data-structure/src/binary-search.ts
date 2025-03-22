function BST(value: any) {
  this.value = value;
  this.left = null;
  this.right = null;
}

BST.prototype.insert = function (value: any) {
  if (value <= this.value) {
    if (!this.left) this.left = new (BST as any)(value);
    else this.left.insert(value);
  } else {
    if (!this.right) this.right = new (BST as any)(value);
    else this.right.insert(value);
  }
};

BST.prototype.contains = function (value: any) {
  if (value === this.value) return true;
  if (value < this.value) {
    if (!this.left) return false;
    else return this.left.contains(value);
  } else {
    if (!this.right) return false;
    else return this.right.contains(value);
  }
};

// 深度优先
BST.prototype.depthFirstTraversal = function (iteratorFunc: any, order: string) {
  if (order === "pre-order") iteratorFunc(this);
  if (this.left) this.left.depthFirstTraversal(iteratorFunc, order);
  if (order === "in-order") iteratorFunc(this);
  if (this.right) this.right.depthFirstTraversal(iteratorFunc, order);
  if (order === "post-order") iteratorFunc(this);
};

// 广度优先
BST.prototype.breadthFirstTraversal = function (iteratorFunc: any) {
  const queue = [this];
  while (queue.length) {
    const treeNode = queue.shift();
    iteratorFunc(treeNode);
    if (treeNode.left) queue.push(treeNode.left);
    if (treeNode.right) queue.push(treeNode.right);
  }
};

BST.prototype.getMinVal = function () {
  if (this.left) return this.left.getMinVal();
  else return this.value;
};

BST.prototype.getMaxVal = function () {
  if (this.right) return this.right.getMaxVal();
  else return this.value;
};

const bst = new (BST as any)(50);
bst.insert(30);
bst.insert(70);
bst.insert(100);
bst.insert(60);
bst.insert(59);
bst.insert(20);
bst.insert(45);
bst.insert(35);
bst.insert(85);
bst.insert(105);
bst.insert(10);

console.log(`[bst]: `, bst);
console.log(`[bst.contains(50)]: `, bst.contains(50));

bst.depthFirstTraversal(log, "pre-order");

bst.breadthFirstTraversal(log);

function log(node: any) {
  console.log(`[log]: `, node.value);
}
