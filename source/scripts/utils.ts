// Utility function handlers for tree structure output and such

module MECH_LL {
    export class Utils{

        public static printTree(): string {
           if(isCST){
               return MECH_LL.Utils.printCST();
           } else {
               return MECH_LL.Utils.printAST();
           }
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