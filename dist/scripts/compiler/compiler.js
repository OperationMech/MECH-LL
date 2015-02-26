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
            var keyWord = "";
            var extBoolOP = "";
            var locToken;
            var inStrMode = false;
            var i = 0;
            while (i < localCode.length) {
                switch (localCode[i].match("[^a-zA-Z0-9]|[a-z]|[0-9]")[0]) {
                    case "{":
                        locToken = new MECH_LL.Token(["T_LCBrace", "{"], curLine, curCol);
                        Tokens.push(locToken);
                        break;
                    case "}":
                        locToken = new MECH_LL.Token(["T_RCBrace", "}"], curLine, curCol);
                        Tokens.push(locToken);
                        break;
                    case "(":
                        locToken = new MECH_LL.Token(["T_LParen", "("], curLine, curCol);
                        Tokens.push(locToken);
                        break;
                    case ")":
                        locToken = new MECH_LL.Token(["T_RParen", ")"], curLine, curCol);
                        Tokens.push(locToken);
                        break;
                    case "\"":
                        locToken = new MECH_LL.Token(["T_Quote", "\""], curLine, curCol);
                        inStrMode = !inStrMode;
                        Tokens.push(locToken);
                        break;
                    case "$":
                        locToken = new MECH_LL.Token(["T_EOP", "$"], curLine, curCol);
                        Tokens.push(locToken);
                        if (localCode.length < 1 + i) {
                            break;
                        }
                        ErrList.push("End of program is before end of code at [" + curLine + ", " + curCol + "]");
                        break;
                    case "\n":
                        curLine++;
                        break;
                    case "!":
                        if (extBoolOP.length < 2) {
                            extBoolOP += "!";
                        }
                        else {
                            extBoolOP += "";
                        }
                        break;
                    case "=":
                        locToken = new MECH_LL.Token(["T_AsignOP", "="], curLine, curCol);
                        if (extBoolOP.length < 2) {
                            extBoolOP += "=";
                        }
                        else {
                            extBoolOP += "";
                        }
                        Tokens.push(locToken);
                        break;
                    case "+":
                        locToken = new MECH_LL.Token(["T_IntPlusOP", "+"], curLine, curCol);
                    case " ":
                        if (inStrMode) {
                            locToken = new MECH_LL.Token(["T_Space", " "], curLine, curCol);
                            Tokens.push(locToken);
                        }
                        break;
                    case localCode[i].match("[a-z]|[0-9]")[0]:
                        if (parseInt(localCode[i], 10) < 10) {
                            locToken = new MECH_LL.Token(["T_Digit", localCode[i]], curLine, curCol);
                            Tokens.push(locToken);
                            break;
                        }
                        locToken = new MECH_LL.Token(["T_ID", localCode[i]], curLine, curCol);
                        if (keyWord.length < 7) {
                            keyWord += localCode[i];
                        }
                        else {
                            keyWord = "";
                        }
                        Tokens.push(locToken);
                        break;
                    default:
                        ErrList.push("Invalid character at [" + curLine + ", " + curCol + "]");
                        break;
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
