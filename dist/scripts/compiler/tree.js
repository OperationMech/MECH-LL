// Tree class and node class
// Declares the tree definition and simple node
var MECH_LL;
(function (MECH_LL) {
    var NODE = (function () {
        function NODE(parent, children, isLeaf, value) {
            if (parent === void 0) { parent = null; }
            if (children === void 0) { children = []; }
            if (isLeaf === void 0) { isLeaf = false; }
            if (value === void 0) { value = []; }
            this.parent = parent;
            this.children = children;
            this.isLeaf = isLeaf;
            this.value = value;
        }
        return NODE;
    })();
    MECH_LL.NODE = NODE;
    var Tree = (function () {
        function Tree() {
            this.rt = null;
            this.cur = null;
        }
        Tree.prototype.addNode = function (nodeIn) {
            if (this.rt == null) {
                this.rt = this.cur = nodeIn;
            }
            else if (this.cur.children == null) {
                nodeIn.parent = this.cur;
                this.cur.children = [nodeIn];
                this.cur = nodeIn;
                if (nodeIn.isLeaf) {
                    this.cur = nodeIn.parent; // Reset parent if leaf node
                }
            }
            else {
                nodeIn.parent = this.cur;
                this.cur.children.push(nodeIn);
                this.cur = nodeIn;
                if (nodeIn.isLeaf) {
                    this.cur = nodeIn.parent; // Reset parent if leaf node
                }
            }
        };
        Tree.prototype.returnCurrentPtrToParent = function () {
            if (this.cur.parent == null) {
                // fall off tree prevention
                this.cur = this.rt;
            }
            else {
                this.cur = this.cur.parent;
            }
        };
        Tree.prototype.printTreeNode = function (nodeIn, depth) {
            if (depth === void 0) { depth = 0; }
            var recurse = "";
            for (var i = 0; i < depth; i++) {
                recurse = recurse + " ";
            }
            if (nodeIn != null) {
                recurse = recurse + nodeIn.value[0] + "\n";
                if (nodeIn.isLeaf === true) {
                }
                else if (nodeIn.children === null) {
                    for (var i = 0; i < depth + 1; i++) {
                        recurse = recurse + " ";
                    }
                    recurse = recurse + "epsilon" + "\n";
                }
                else {
                    for (var j = 0; j < nodeIn.children.length; j++) {
                        recurse = recurse + this.printTreeNode(nodeIn.children[j], depth + 1);
                    }
                }
            }
            else {
            }
            return recurse;
        };
        return Tree;
    })();
    MECH_LL.Tree = Tree;
})(MECH_LL || (MECH_LL = {}));
