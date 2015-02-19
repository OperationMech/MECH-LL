// HTML interfaces for MECH-LL

module MECH_LL {
    export class Control {
        public static init(): void {
            CodeArea = <HTMLTextAreaElement>document.getElementById("taCodeArea");
            ErrArea = <HTMLTextAreaElement>document.getElementById("taErrArea");
            TreeArea = <HTMLTextAreaElement>document.getElementById("taTreeArea");
            OutputArea = <HTMLTextAreaElement>document.getElementById("taOutArea");
        }

        public static do_btnCompileClick(btn): void {
            btn.disabled = true;
            MECH_LL.Compiler.doLex();

            btn.disabled = false;
        }

        public static do_btnTreeSwap(btn): void {
            if(isCST) {
                isCST = false;
                TreeArea.innerText = MECH_LL.Utils.printAST();
            } else {
                TreeArea.innerText = MECH_LL.Utils.printCST();
            }
        }
    }
}