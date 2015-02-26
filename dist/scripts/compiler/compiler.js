// MECH-LL Compiler
var MECH_LL;
(function (MECH_LL) {
    var Compiler = (function () {
        function Compiler() {
        }
        Compiler.doLex = function () {
            var localCode = CodeArea.value;
            var curLine = 0;
            var curCol = 0;
            var locToken;
            var i = 0;
            while (i < localCode.length) {
                if (localCode.match("{")) {
                    locToken = new MECH_LL.Token(["T_LCBrace", "{"], curLine, localCode.match("{").index);
                    Tokens.push(locToken);
                }
                if (localCode.match("print|while|if")) {
                    locToken = new MECH_LL.Token(["T_KeyWrd", localCode.match("print|while|if")], curLine, localCode.match("print|while|if").index);
                    Tokens.push(locToken);
                }
                if (localCode.match("int|string|boolean")) {
                    locToken = new MECH_LL.Token(["T_TypeDef", localCode.match("int|string|boolean")], curLine, curCol);
                    Tokens.push(locToken);
                }
                if (localCode.match("[0-9]")) {
                    locToken = new MECH_LL.Token(["T_Digit", localCode.match("[0-9]")], curLine, curCol);
                    Tokens.push(locToken);
                }
                if (localCode.match("[a-z]")) {
                    locToken = new MECH_LL.Token(["T_ID", localCode.match("[a-z]")], curLine, curCol);
                    Tokens.push(locToken);
                }
                if (localCode.match("\n")) {
                    curLine++;
                }
                i++;
                curCol++;
            }
            i = 0;
            var strTokens = "";
            while (i < Tokens.length) {
                strTokens += "[" + Tokens[i].value[0] + "," + Tokens[i].value[1] + "] ";
                i++;
            }
            OutputArea.value = "Lex found the following tokens: " + strTokens + "\n";
        };
        return Compiler;
    })();
    MECH_LL.Compiler = Compiler;
})(MECH_LL || (MECH_LL = {}));
