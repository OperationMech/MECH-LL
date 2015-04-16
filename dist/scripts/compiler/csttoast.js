// CST to AST converter
var MECH_LL;
(function (MECH_LL) {
    var CSTtoAST = (function () {
        function CSTtoAST() {
        }
        CSTtoAST.convert = function (CSTN) {
            var i = 0;
            while (i < CSTN.children.length) {
                if (CSTN.children[i].value[0] === "Block" || CSTN.children[i].value[0] === "VarDecl" || CSTN.children[i].value[0] === "IntExpr" || CSTN.children[i].value[0] === "PrintStmt" || CSTN.children[i].value[0] === "IfStmt" || CSTN.children[i].value[0] === "WhileStmt" || CSTN.children[i].value[0] === "CharList" || CSTN.children[i].value[0] === "BooleanExpr" || CSTN.children[i].value[0] === "AssignStmt" || CSTN.children[i].value[0] === "T_Type" || CSTN.children[i].value[0] === "T_Char" || CSTN.children[i].value[0] === "T_Digit" || CSTN.children[i].value[0] === "T_Boolval" || CSTN.children[i].value[0] === "T_Space" || CSTN.children[i].value[0] === "T_BoolOP") {
                    ASyntaxTree.addNode(CSTN.children[i]);
                    if (CSTN.children != null) {
                        MECH_LL.CSTtoAST.convert(CSTN.children[i]);
                    }
                }
                i++;
            }
        };
        return CSTtoAST;
    })();
    MECH_LL.CSTtoAST = CSTtoAST;
})(MECH_LL || (MECH_LL = {}));
