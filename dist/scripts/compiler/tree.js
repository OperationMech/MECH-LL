// Tree class and node class
// Declares the tree definition and simple node
var MECH_LL;
(function (MECH_LL) {
    var Tree = (function () {
        function Tree(root) {
            this.root = root;
        }
        Tree.addNode = function (nodeIn) {
            if (root != null) {
                root.children[head.children.length] = nodeIn;
            }
            else {
                root = nodeIn;
            }
        };
        return Tree;
    })();
    MECH_LL.Tree = Tree;
    var NODE = (function () {
        function NODE(parent, children, isLeaf, value) {
            if (parent === void 0) { parent = null; }
            if (children === void 0) { children = null; }
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
})(MECH_LL || (MECH_LL = {}));
