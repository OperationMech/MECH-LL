// Utility function handlers for tree structure output and such
var MECH_LL;
(function (MECH_LL) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.printTree = function () {
            if (isCST && !isSymbTbl) {
                isCST = false;
                return MECH_LL.Utils.printCST();
            }
            else if (!isSymbTbl) {
                isSymbTbl = true;
                return MECH_LL.Utils.printAST();
            }
            else {
                isSymbTbl = false;
                isCST = true;
                return MECH_LL.Utils.printSymbTbl();
            }
        };
        Utils.printSymbTbl = function () {
            var outStr;
            outStr = SymTable.printTreeNode(SymTable.rt);
            return outStr;
        };
        Utils.printCST = function () {
            var outStr;
            outStr = CSyntaxTree.printTreeNode(CSyntaxTree.rt);
            return outStr;
        };
        Utils.printAST = function () {
            var outStr;
            outStr = ASyntaxTree.printTreeNode(ASyntaxTree.rt);
            return outStr;
        };
        return Utils;
    })();
    MECH_LL.Utils = Utils;
})(MECH_LL || (MECH_LL = {}));
