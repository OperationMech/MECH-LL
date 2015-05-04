// HTML interfaces for MECH-LL

module MECH_LL {
    export class Control {
        public static init(): void {
            CodeArea = (<HTMLTextAreaElement>document.getElementById("taCodeArea"));
            ErrArea = (<HTMLTextAreaElement>document.getElementById("taErrArea"));
            TreeArea = (<HTMLTextAreaElement>document.getElementById("taTreeArea"));
            OutputArea = (<HTMLTextAreaElement>document.getElementById("taOutArea"));

        }

        public static do_btnCompileClick(btn): void {
            // clear error log and other logs
            ErrArea.value = "";
            TreeArea.value = "";
            OutputArea.value = "";

            // initialize classes
            CSyntaxTree = new MECH_LL.Tree;
            ASyntaxTree = new MECH_LL.Tree;
            SymTable = new MECH_LL.Tree;
            Tokens = Array();
            ErrList = Array();
            ParseError = false;
            ContentError = false;


            btn.disabled = true;
            MECH_LL.Compiler.doLex();
            btn.disabled = false;
        }

        public static do_btnTreeSwap(btn): void {
            TreeArea.value = MECH_LL.Utils.printTree();
        }
    }
}