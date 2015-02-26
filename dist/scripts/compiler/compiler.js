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
            var locToken;
            var inStrMode = false;
            var i = 0;
            OutputArea.value = "Compiling the code...\n";
            while (i < localCode.length) {
                switch (localCode[i].match("[^a-zA-Z0-9]|[a-z]|[0-9]|")[0]) {
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
                        ErrList.push("End of program is before end of code at [" + curLine + ", " + curCol + "]\n");
                        break;
                    case "\n":
                        curLine++;
                        break;
                    case "!":
                        if (localCode[i + 1] == "=") {
                            locToken = new MECH_LL.Token(["T_BoolOP", "!="], curLine, curCol);
                            i++;
                            curCol++;
                            Tokens.push(locToken);
                            break;
                        }
                        else {
                            ErrList.push("Invalid character '!' at [" + curLine + ", " + curCol + "]\n");
                        }
                        break;
                    case "=":
                        locToken = new MECH_LL.Token(["T_AsignOP", "="], curLine, curCol);
                        if (localCode[i + 1] == "=") {
                            locToken = new MECH_LL.Token(["T_BoolOP", "=="], curLine, curCol);
                            i++;
                            curCol++;
                            Tokens.push(locToken);
                            break;
                        }
                        Tokens.push(locToken);
                        break;
                    case "+":
                        locToken = new MECH_LL.Token(["T_IntOP", "+"], curLine, curCol);
                        Tokens.push(locToken);
                        break;
                    case " ":
                        if (inStrMode) {
                            locToken = new MECH_LL.Token(["T_Space", " "], curLine, curCol);
                            Tokens.push(locToken);
                        }
                        break;
                    case localCode[i].match("[a-z]|[0-9]|[A-Z]")[0]:
                        if (localCode[i] >= "A" && localCode[i] <= "Z") {
                            ErrList.push("Invalid character '" + localCode[i] + "' at [" + curLine + ", " + curCol + "]\n");
                            break;
                        }
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
                        ErrList.push("Invalid character '" + localCode[i] + "' at [" + curLine + ", " + curCol + "]\n");
                        break;
                }
                i++;
                curCol++;
            }
            if (Tokens[Tokens.length - 1].value[0] != "T_EOP") {
                OutputArea.value = OutputArea.value + "\nWarning EOF found without program terminator " + "'$' repairing.\n\n";
                locToken = new MECH_LL.Token(["T_EOP", "$"], curLine, curCol);
                Tokens.push(locToken);
            }
            i = 0;
            var strTokens = "";
            while (i < Tokens.length) {
                strTokens += "[" + Tokens[i].value[0] + "," + Tokens[i].value[1] + "] ";
                i++;
            }
            OutputArea.value = OutputArea.value + "Lex found the following tokens: " + strTokens + "\n";
            i = 0;
            if (ErrList.length > 0) {
                while (i < ErrList.length) {
                    ErrArea.value = ErrArea.value + ErrList[i];
                    ErrList.pop();
                    i++;
                }
            }
            else {
            }
        };
        return Compiler;
    })();
    MECH_LL.Compiler = Compiler;
})(MECH_LL || (MECH_LL = {}));
