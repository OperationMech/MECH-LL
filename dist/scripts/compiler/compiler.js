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
            OutputArea.value = "Compiling the code...\n\n";
            while (i < localCode.length) {
                if (localCode[i].match("[^a-zA-Z0-9]|[a-z]|[0-9]|")) {
                    if (localCode[i].match("[a-z]")) {
                        if (!inStrMode && keyWord.length < 8) {
                            keyWord = keyWord + localCode[i];
                        }
                        else if (!inStrMode) {
                            keyWord = localCode[i];
                        }
                        else {
                            keyWord = "";
                        }
                        Tokens.push(new MECH_LL.Token(["T_Char", localCode[i]], curLine, curCol));
                        OutputArea.value = OutputArea.value + "Found token: " + localCode[i] + "\n";
                    }
                    else if (localCode[i] === "{" && !inStrMode) {
                        Tokens.push(new MECH_LL.Token(["T_LCBrace", localCode[i]], curLine, curCol));
                        OutputArea.value = OutputArea.value + "Found token: " + localCode[i] + "\n";
                    }
                    else if (localCode[i] === "}" && !inStrMode) {
                        Tokens.push(new MECH_LL.Token(["T_RCBrace", localCode[i]], curLine, curCol));
                        OutputArea.value = OutputArea.value + "Found token: " + localCode[i] + "\n";
                    }
                    else if (localCode[i] === "(" && !inStrMode) {
                        Tokens.push(new MECH_LL.Token(["T_LParen", localCode[i]], curLine, curCol));
                        OutputArea.value = OutputArea.value + "Found token: " + localCode[i] + "\n";
                    }
                    else if (localCode[i] === ")" && !inStrMode) {
                        Tokens.push(new MECH_LL.Token(["T_RParen", localCode[i]], curLine, curCol));
                        OutputArea.value = OutputArea.value + "Found token: " + localCode[i] + "\n";
                    }
                    else if (localCode[i] === "=" && !inStrMode) {
                        if (localCode[i + 1] === "=") {
                            Tokens.push(new MECH_LL.Token(["T_BoolOP", localCode[i] + localCode[i + 1]], curLine, curCol));
                            OutputArea.value = OutputArea.value + "Found token: " + localCode[i] + localCode[i + 1] + "\n";
                            curCol++;
                            i++;
                        }
                        else {
                            Tokens.push(new MECH_LL.Token(["T_AssignOP", localCode[i]], curLine, curCol));
                            OutputArea.value = OutputArea.value + "Found token: " + localCode[i] + "\n";
                        }
                        keyWord = "";
                    }
                    else if (localCode[i] === "!" && !inStrMode) {
                        if (localCode[i + 1] === "=") {
                            Tokens.push(new MECH_LL.Token(["T_BoolOP", localCode[i] + localCode[i + 1]], curLine, curCol));
                            OutputArea.value = OutputArea.value + "Found token: " + localCode[i] + localCode[i + 1] + "\n";
                            curCol++;
                            i++;
                        }
                    }
                    else if (localCode[i] === "\n" && !inStrMode) {
                        curLine++;
                        curCol = 0;
                        keyWord = "";
                    }
                    else if (localCode[i] === " ") {
                        if (inStrMode) {
                            Tokens.push(new MECH_LL.Token(["T_Space", localCode[i]], curLine, curCol));
                            OutputArea.value = OutputArea.value + "Found token: space\n";
                        }
                        else {
                            curCol++;
                        }
                        keyWord = "";
                    }
                    else if (localCode[i] === "\"") {
                        Tokens.push(new MECH_LL.Token(["T_Quote", localCode[i]], curLine, curCol));
                        OutputArea.value = OutputArea.value + "Found token: " + localCode[i] + "\n";
                        inStrMode = !inStrMode;
                    }
                    else if (localCode[i] === "+" && !inStrMode) {
                        Tokens.push(new MECH_LL.Token(["T_IntOP", localCode[i]], curLine, curCol));
                        OutputArea.value = OutputArea.value + "Found token: " + localCode[i] + "\n";
                    }
                    else if (localCode[i].match("[0-9]") && !inStrMode) {
                        Tokens.push(new MECH_LL.Token(["T_Digit", localCode[i]], curLine, curCol));
                        OutputArea.value = OutputArea.value + "Found token: " + localCode[i] + "\n";
                    }
                    else if (localCode[i] === "$" && !inStrMode) {
                        if (i < localCode.length - 1) {
                            Tokens.push(new MECH_LL.Token(["T_EOF", localCode[i]], curLine, curCol));
                            OutputArea.value = OutputArea.value + "Found token: " + localCode[i] + "\n";
                            OutputArea.value = OutputArea.value + "Warning ignoring all code after EOF\n";
                            i = localCode.length - 1;
                        }
                        else {
                            Tokens.push(new MECH_LL.Token(["T_EOF", localCode[i]], curLine, curCol));
                            OutputArea.value = OutputArea.value + "Found token: " + localCode[i] + "\n";
                        }
                    }
                    else {
                        ErrList.push("Invalid symbol: " + localCode[i] + " at (" + curLine + ", " + curCol + ")\n");
                    }
                    if (keyWord === "print" || keyWord === "while" || keyWord === "if" || keyWord === "int" ||
                        keyWord === "boolean" || keyWord === "string" || keyWord === "true" || keyWord === "false") {
                        for (var j = keyWord.length; j > 0; j--) {
                            Tokens.pop();
                        }
                        OutputArea.value = OutputArea.value + "Replacing " + keyWord.length + " tokens with: ";
                        if (keyWord === "true" || keyWord === "false") {
                            Tokens.push(new MECH_LL.Token(["T_Boolval", keyWord], curLine, curCol));
                            OutputArea.value = OutputArea.value + "T_Boolval\n";
                        }
                        else if (keyWord === "int" || keyWord === "boolean" || keyWord === "string") {
                            Tokens.push(new MECH_LL.Token(["T_Type", keyWord], curLine, curCol));
                            OutputArea.value = OutputArea.value + "T_Type" + "\n";
                        }
                        else {
                            Tokens.push(new MECH_LL.Token(["T_Kwd" + keyWord, keyWord], curLine, curCol));
                            OutputArea.value = OutputArea.value + "T_Kwd" + keyWord + "\n";
                        }
                        keyWord = "";
                    }
                }
                else {
                    OutputArea.value = "This should not happen.";
                }
                i++;
                curCol++;
            }
            if (Tokens.length === 0) {
                // empty code error case
                OutputArea.value = "No code halting compilation.";
                ErrList.push("No code halting.");
            }
            else if (Tokens[Tokens.length - 1].value[0] != "T_EOF") {
                OutputArea.value = OutputArea.value + "\nWarning EOF found without program terminator "
                    + "'$' repairing.\n\n";
                locToken = new MECH_LL.Token(["T_EOF", "$"], curLine, curCol);
                Tokens.push(locToken);
            }
            i = 0;
            var strTokens = "";
            while (i < Tokens.length) {
                strTokens += "[" + Tokens[i].value[0] +
                    "," + Tokens[i].value[1] +
                    "] ";
                i++;
            }
            if (ErrList.length > 0) {
                while (ErrList.length > 0) {
                    ErrArea.value = ErrList.pop() + ErrArea.value;
                }
            }
            else {
                OutputArea.value = OutputArea.value + "Lex found the following tokens: " + strTokens + "\n";
                MECH_LL.Parser.doParseCode();
                if (!ParseError) {
                    OutputArea.value = OutputArea.value + "Parse successful.\nBusy building CST.\n";
                    MECH_LL.ParserCST.doParseCode();
                    OutputArea.value = OutputArea.value + "CST built.\n\n";
                    OutputArea.value = OutputArea.value + "Generating AST.\n";
                    MECH_LL.CSTtoAST.convert(CSyntaxTree.rt);
                    OutputArea.value = OutputArea.value + "AST Built.\n\n";
                    OutputArea.value = OutputArea.value + "Checking content.\n";
                    if (!ContentError) {
                        MECH_LL.Analyzer.analyze(ASyntaxTree.rt);
                        OutputArea.value = OutputArea.value + "Content valid.\n\n";
                        OutputArea.value = OutputArea.value + "Starting machine code engine.\n";
                    }
                }
                else {
                    OutputArea.value = OutputArea.value + "\n*Parse Error*\n\n";
                }
            }
        };
        return Compiler;
    })();
    MECH_LL.Compiler = Compiler;
})(MECH_LL || (MECH_LL = {}));
