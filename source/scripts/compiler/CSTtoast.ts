// CST to AST converter

module MECH_LL {
    export class CSTtoAST {
        public static convert(CSTN:NODE): void {
            if(CSTN.children != null) {
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
                            ASyntaxTree.addNode(new NODE(null, null, false, CSTN.children[i].value));
                        }
                        if (CSTN.children.length < 3) {
                            MECH_LL.CSTtoAST.convert(CSTN.children[i]);
                            ASyntaxTree.returnCurrentPtrToParent();
                        } else {
                            MECH_LL.CSTtoAST.convert(CSTN.children[i]);
                        }
                    } else if (CSTN.children[i].value[0] === "T_Type"
                        || CSTN.children[i].value[0] === "T_Char"
                        || CSTN.children[i].value[0] === "T_Digit"
                        || CSTN.children[i].value[0] === "T_Boolval"
                        || CSTN.children[i].value[0] === "T_Space"
                        || CSTN.children[i].value[0] === "T_BoolOP"
                        || CSTN.children[i].value[0] === "T_IntOP") {
                        ASyntaxTree.addNode(new NODE(null, null, true, CSTN.children[i].value));
                    }
                    i++;
                }
            }
        }
    }
}
