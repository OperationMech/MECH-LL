// CST to AST converter
var MECH_LL;
(function (MECH_LL) {
    var CSTtoAST = (function () {
        function CSTtoAST() {
        }
        CSTtoAST.convert = function (CSTN) {
            if (CSTN.children != null) {
                var i = 0;
                while (CSTN.children.length > i) {
                    if (!CSTN.children[i].isLeaf) {
                        if (CSTN.children[i].value[0] === "Block"
                            || CSTN.children[i].value[0] === "VarDecl"
                            || CSTN.children[i].value[0] === "IntExpr"
                            || CSTN.children[i].value[0] === "PrintStmt"
                            || CSTN.children[i].value[0] === "StringExpr"
                            || CSTN.children[i].value[0] === "IfStmt"
                            || CSTN.children[i].value[0] === "WhileStmt"
                            || CSTN.children[i].value[0] === "BooleanExpr"
                            || CSTN.children[i].value[0] === "AssignStmt") {
                            ASyntaxTree.addNode(new MECH_LL.NODE(null, null, false, CSTN.children[i].value));
                        }
                        if (CSTN.children.length > 1) {
                            MECH_LL.CSTtoAST.convert(CSTN.children[i]);
                        }
                        else {
                            MECH_LL.CSTtoAST.convert(CSTN.children[i]);
                            ASyntaxTree.returnCurrentPtrToParent();
                        }
                    }
                    else if (CSTN.children[i].value[0] === "T_Type"
                        || CSTN.children[i].value[0] === "T_Char"
                        || CSTN.children[i].value[0] === "T_Digit"
                        || CSTN.children[i].value[0] === "T_Boolval"
                        || CSTN.children[i].value[0] === "T_Space"
                        || CSTN.children[i].value[0] === "T_BoolOP") {
                        ASyntaxTree.addNode(new MECH_LL.NODE(null, null, true, CSTN.children[i].value));
                    }
                    i++;
                }
            }
        };
        return CSTtoAST;
    })();
    MECH_LL.CSTtoAST = CSTtoAST;
})(MECH_LL || (MECH_LL = {}));
