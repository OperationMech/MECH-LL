// Tree class and node class
// Declares the tree definition and simple node
var MECH_LL;
(function (MECH_LL) {
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
    var Tree = (function () {
        function Tree() {
            this.rt = null;
            this.cur = null;
        }
        Tree.prototype.addNode = function (nodeIn) {
            if (this.rt == null) {
                this.rt = this.cur = nodeIn;
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
        return Tree;
    })();
    MECH_LL.Tree = Tree;
})(MECH_LL || (MECH_LL = {}));
