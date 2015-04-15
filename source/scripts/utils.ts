// Utility function handlers for tree structure output and such

module MECH_LL {
    export class Utils{

        public static printTree(): string {
           if(isCST && !isSymbTbl ) {
               return MECH_LL.Utils.printCST();
           } else if (!isSymbTbl) {
               return MECH_LL.Utils.printAST();
           } else {
               return MECH_LL.Utils.printSymbTbl();
           }
        }

        public static printSymbTbl(): string {
            var outStr: string = "";

            return outStr;
        }

        public static printCST(): string {
            var outStr: string = "";

            return outStr;
        }

        public static printAST(): string {
            var outStr: string = "";

            return outStr;
        }
    }
}