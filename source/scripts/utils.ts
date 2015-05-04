// Utility function handlers for tree structure output and such

module MECH_LL {
    export class Utils{

        public static printTree(): string {
           if(isCST && !isSymbTbl ) {
               isCST = false;
               return MECH_LL.Utils.printCST();
           } else if (!isSymbTbl) {
               isSymbTbl = true ;
               return MECH_LL.Utils.printAST();
           } else {
               isSymbTbl = false;
               isCST = true;
               return MECH_LL.Utils.printSymbTbl();
           }
        }

        public static printSymbTbl(): string {
            var outStr: string = "SymbolTable:\n";
            outStr = outStr + SymTable.printTreeNode(SymTable.rt);
            return outStr;
        }

        public static printCST(): string {
            var outStr: string = "CST:\n";
            outStr = outStr + CSyntaxTree.printTreeNode(CSyntaxTree.rt);
            return outStr;
        }

        public static printAST(): string {
            var outStr: string = "AST:\n";
            outStr = outStr + ASyntaxTree.printTreeNode(ASyntaxTree.rt);
            return outStr;
        }
    }
}