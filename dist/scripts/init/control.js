// HTML interfaces for MECH-LL
var MECH_LL;
(function (MECH_LL) {
    var Control = (function () {
        function Control() {
        }
        Control.init = function () {
            CodeArea = document.getElementById("taCodeArea");
            ErrArea = document.getElementById("taErrArea");
            TreeArea = document.getElementById("taTreeArea");
            OutputArea = document.getElementById("taOutArea");
        };
        Control.do_btnCompileClick = function (btn) {
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
        };
        Control.do_btnTreeSwap = function (btn) {
            TreeArea.value = MECH_LL.Utils.printTree();
        };
        return Control;
    })();
    MECH_LL.Control = Control;
})(MECH_LL || (MECH_LL = {}));
