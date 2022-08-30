class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);
    if (this.root == null) {
      this.root = newNode;
      return this;
    }
    let currentNode = this.root;
    while (true) {
      //Left
      if (value < currentNode.value) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return this;
        }
        currentNode = currentNode.left;
      }
      else {
        //Right
        if (!currentNode.right) {
          currentNode.right = newNode;
          return this;
        }
        currentNode = currentNode.right;
      }
    }
  }

  lookup(value) {
    let currentNode = this.root;
    while (currentNode) {
      if (value == currentNode.value) {
        return currentNode;
      }
      currentNode = value < currentNode.value ? currentNode.left : currentNode.right;
    }
    return false;
  }

  traverse(node) {
    const tree = node;
    tree.left = node.left == null ? null : this.traverse(node.left);
    tree.right = node.right == null ? null : this.traverse(node.right);
    return tree;
  }

  remove(value) {
    if (!this.root) {
      return false;
    }
    let currentNode = this.root;
    let parentNode = null;
    while (currentNode) {
      if (value < currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      }
      else if (value > currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      }
      else if (value === currentNode.value) {
        //We have a match, time to work

        //Option 1:currentNode has no right child
        if (!currentNode.right) {
          if (parentNode === null) {
            this.root = currentNode.left;
          }
          else {
            if (value < parentNode.value) {
              parentNode.left = currentNode.left;
            }
            else {
              parentNode.right = currentNode.left;
            }
          }
        }

        //Option 2: currentNode has right child that doesn't have a left child
        else if (!currentNode.right.left) {
          currentNode.right.left = currentNode.left;
          if (parentNode === null) {
            this.root = currentNode.right;
          }
          else {
            if (value < parentNode.value) {
              parentNode.left = currentNode.right;
            }
            else {
              parentNode.right = currentNode.right;
            }
          }
        }

        //Option 3: Current node has a right child that has a left child
        else {
          //Find the right child's left most child
          let leftmost = currentNode.right.left;
          let leftmostParent = currentNode.right;
          while (leftmost.left) {
            leftmostParent = leftmost;
            leftmost = leftmost.left;
          }
          leftmostParent.left = leftmost.right;
          leftmost.left = currentNode.left;
          leftmost.right = currentNode.right;
          if (parentNode === null) {
            this.root = leftmost;
          }
          else {
            if (value < parentNode.value) {
              parentNode.left = leftmost;
            }
            else {
              parentNode.right = leftmost;
            }
          }
        }
        return true;
      }
    }
  }

  //Time complexity O(N) but since we have to store children of the current tree row we are traversing into the queue, it can take a lot of space if the tree is very wide(i.e each node has many children).
  // BFS is useful for finding shortest path or closest connection

  // Iterative approach
  breadthFirstSearch() {
    let currentNode;
    let list = [];
    let queue = [];

    queue.push(this.root);

    while (queue.length > 0) {
      currentNode = queue.shift();
      list.push(currentNode.value);
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }

    return list;
  }

  // Recursive approach
  breadthFirstSearchRecursive(queue, list) {
    if (!queue.length) {
      return list;
    }

    let currentNode = queue.shift();
    list.push(currentNode.value);
    if (currentNode.left) {
      queue.push(currentNode.left);
    }
    if (currentNode.right) {
      queue.push(currentNode.right);
    }
    return this.breadthFirstSearchRecursive(queue, list);
  }

  //   9
  //  4     20
  //1  6  15  170

  // All DFS have a time complexity of logN
  // DFS is useful for finding if a path exists
  // DFS goes to the depth of the tree faster than BFS and will also take less memoey than BFS in doing so.

  //Prints data in sorted order
  DFSInOrder(node, list) {
    if (node.left) {
      this.DFSInOrder(node.left, list);
    }
    list.push(node.value);
    if (node.right) {
      this.DFSInOrder(node.right, list);
    }
    return list;
  }

  //Useful for recreating the tree with the list
  DFSPreOrder(node, list) {
    list.push(node.value);
    if (node.left) {
      this.DFSPreOrder(node.left, list);
    }
    if (node.right) {
      this.DFSPreOrder(node.right, list);
    }
    return list;
  }

  DFSPostOrder(node, list) {
    if (node.left) {
      this.DFSPostOrder(node.left, list);
    }
    if (node.right) {
      this.DFSPostOrder(node.right, list);
    }
    list.push(node.value);
    return list;
  }



}


const tree = new BinarySearchTree();
tree.insert(9);
tree.insert(4);
tree.insert(6);
tree.insert(20);
tree.insert(170);
tree.insert(15);
tree.insert(1);
//console.log(tree.lookup(9));
//tree.remove(9);
console.log(JSON.stringify(tree.traverse(tree.root)));
// console.log(tree.breadthFirstSearch());
// console.log(tree.breadthFirstSearchRecursive([tree.root], []));
console.log(tree.DFSInOrder(tree.root, []));
console.log(tree.DFSPreOrder(tree.root, []));
console.log(tree.DFSPostOrder(tree.root, []));