// CST to AST converter

module MECH_LL {
    export class CSTtoAST {
        public static convert(CSTN:NODE): void {
            var i = 0;
            while(i < CSTN.children.length) {
                if( !CSTN.children[i].isLeaf) {
                    if(CSTN.children[i].value[0] === "Block"
                    || CSTN.children[i].value[0] === "VarDecl"
                    || CSTN.children[i].value[0] === "IntExpr"
                    || CSTN.children[i].value[0] === "PrintStmt"
                    || CSTN.children[i].value[0] === "IfStmt"
                    || CSTN.children[i].value[0] === "WhileStmt"
                    || CSTN.children[i].value[0] === "CharList"
                    || CSTN.children[i].value[0] === "BooleanExpr"
                    || CSTN.children[i].value[0] === "AssignStmt"){
                        ASyntaxTree.addNode(new NODE(null,null,false,CSTN.children[i].value));
                    } else if(CSTN.children[i].value[0] === "T_Type"
                           || CSTN.children[i].value[0] === "T_Char"
                           || CSTN.children[i].value[0] === "T_Digit"
                           || CSTN.children[i].value[0] === "T_Boolval"
                           || CSTN.children[i].value[0] === "T_Space"
                           || CSTN.children[i].value[0] === "T_BoolOP"){
                        ASyntaxTree.addNode(new NODE(null,null,true,CSTN.children[i].value));
                    }
                }
                i++;
            }
        }
    }
}
