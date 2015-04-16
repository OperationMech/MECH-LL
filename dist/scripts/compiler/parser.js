// MECH-LL Compiler Parse
var MECH_LL;
(function (MECH_LL) {
    var Parser = (function () {
        function Parser() {
        }
        Parser.doParseCode = function () {
            MECH_LL.Parser.parseProgram();
        };
        Parser.parseProgram = function () {
            MECH_LL.Parser.parseBlock();
            if (ParseError) {
            }
            if (Tokens[MECH_LL.Parser.count].value[0] === "T_EOF") {
            }
            else {
                // raise exception and halt
                MECH_LL.Parser.raiseExceptionAndHalt();
            }
        };
        Parser.parseBlock = function () {
            if (ParseError) {
            }
            else {
                if (Tokens[MECH_LL.Parser.count].value[0] === "T_LCBrace") {
                    MECH_LL.Parser.count++;
                    MECH_LL.Parser.parseStatementList();
                    if (Tokens[MECH_LL.Parser.count].value[0] === "T_RCBrace") {
                        // code good
                        MECH_LL.Parser.count++;
                    }
                    else {
                        // raise exception and halt
                        MECH_LL.Parser.raiseExceptionAndHalt();
                    }
                }
                else {
                    // raise exception and halt
                    MECH_LL.Parser.raiseExceptionAndHalt();
                }
            }
        };
        Parser.parseStatementList = function () {
            if (ParseError) {
            }
            else {
                if (Tokens[MECH_LL.Parser.count].value[0] === "T_RCBrace") {
                }
                else {
                    MECH_LL.Parser.parseStatement();
                    MECH_LL.Parser.parseStatementList();
                }
            }
        };
        Parser.parseStatement = function () {
            if (ParseError) {
            }
            else {
                if (Tokens[MECH_LL.Parser.count].value[0] === "T_Kwdprint") {
                    MECH_LL.Parser.parsePrintStatement();
                }
                else if (Tokens[MECH_LL.Parser.count].value[0] === "T_Char") {
                    MECH_LL.Parser.parseAssignmentStatement();
                }
                else if (Tokens[MECH_LL.Parser.count].value[0] === "T_Type") {
                    MECH_LL.Parser.parseVarDecl();
                }
                else if (Tokens[MECH_LL.Parser.count].value[0] === "T_Kwdwhile") {
                    MECH_LL.Parser.parseWhileStatement();
                }
                else if (Tokens[MECH_LL.Parser.count].value[0] === "T_Kwdif") {
                    MECH_LL.Parser.parseIfStatement();
                }
                else if (Tokens[MECH_LL.Parser.count].value[0] === "T_LCBrace") {
                    MECH_LL.Parser.parseBlock();
                }
            }
        };
        Parser.parsePrintStatement = function () {
            if (ParseError) {
            }
            else {
                MECH_LL.Parser.count++;
                if (Tokens[MECH_LL.Parser.count].value[0] === "T_LParen") {
                    MECH_LL.Parser.count++;
                    MECH_LL.Parser.parseExpr();
                    if (Tokens[MECH_LL.Parser.count].value[0] === "T_RParen") {
                        MECH_LL.Parser.count++;
                    }
                    else {
                        // raise exception and halt
                        MECH_LL.Parser.raiseExceptionAndHalt();
                    }
                }
                else {
                    // raise exception and halt
                    MECH_LL.Parser.raiseExceptionAndHalt();
                }
            }
        };
        Parser.parseAssignmentStatement = function () {
            if (ParseError) {
            }
            else {
                MECH_LL.Parser.parseId();
                if (Tokens[MECH_LL.Parser.count].value[0] === "T_AssignOP") {
                    MECH_LL.Parser.count++;
                    MECH_LL.Parser.parseExpr();
                }
                else {
                    // raise exception and halt
                    MECH_LL.Parser.raiseExceptionAndHalt();
                }
            }
        };
        Parser.parseVarDecl = function () {
            if (ParseError) {
            }
            else {
                MECH_LL.Parser.parseType();
                MECH_LL.Parser.parseId();
            }
        };
        Parser.parseWhileStatement = function () {
            if (ParseError) {
            }
            else {
                if (Tokens[MECH_LL.Parser.count].value[0] === "T_Kwdwhile") {
                    MECH_LL.Parser.count++;
                    MECH_LL.Parser.parseBooleanExpr();
                    MECH_LL.Parser.parseBlock();
                }
                else {
                    // raise exception and halt
                    MECH_LL.Parser.raiseExceptionAndHalt();
                }
            }
        };
        Parser.parseIfStatement = function () {
            if (ParseError) {
            }
            else {
                if (Tokens[MECH_LL.Parser.count].value[0] === "T_Kwdif") {
                    MECH_LL.Parser.count++;
                    MECH_LL.Parser.parseBooleanExpr();
                    MECH_LL.Parser.parseBlock();
                }
                else {
                    // raise exception and halt
                    MECH_LL.Parser.raiseExceptionAndHalt();
                }
            }
        };
        Parser.parseExpr = function () {
            if (ParseError) {
            }
            else {
                if (Tokens[MECH_LL.Parser.count].value[0] === "T_Digit") {
                    MECH_LL.Parser.parseIntExpr();
                }
                else if (Tokens[MECH_LL.Parser.count].value[0] === "T_Quote") {
                    MECH_LL.Parser.parseStringExpr();
                }
                else if (Tokens[MECH_LL.Parser.count].value[0] === "T_LParen" || Tokens[MECH_LL.Parser.count].value[0] === "T_Boolval") {
                    MECH_LL.Parser.parseBooleanExpr();
                }
                else {
                    MECH_LL.Parser.parseId();
                }
            }
        };
        Parser.parseIntExpr = function () {
            if (ParseError) {
            }
            else {
                MECH_LL.Parser.parseDigit();
                if (Tokens[MECH_LL.Parser.count].value[0] === "T_IntOP") {
                    MECH_LL.Parser.count++;
                    MECH_LL.Parser.parseExpr();
                }
                else {
                }
            }
        };
        Parser.parseStringExpr = function () {
            if (ParseError) {
            }
            else {
                if (Tokens[MECH_LL.Parser.count].value[0] === "T_Quote") {
                    MECH_LL.Parser.count++;
                    MECH_LL.Parser.parseCharList();
                    if (Tokens[MECH_LL.Parser.count].value[0] === "T_Quote") {
                        // fine
                        MECH_LL.Parser.count++;
                    }
                    else {
                        // raise exception and halt
                        MECH_LL.Parser.raiseExceptionAndHalt();
                    }
                }
                else {
                    // raise exception and halt
                    MECH_LL.Parser.raiseExceptionAndHalt();
                }
            }
        };
        Parser.parseBooleanExpr = function () {
            if (ParseError) {
            }
            else {
                if (Tokens[MECH_LL.Parser.count].value[0] === "T_LParen") {
                    MECH_LL.Parser.count++;
                    MECH_LL.Parser.parseExpr();
                    if (Tokens[MECH_LL.Parser.count].value[0] === "T_BoolOP") {
                        MECH_LL.Parser.count++;
                        MECH_LL.Parser.parseExpr();
                        if (Tokens[MECH_LL.Parser.count].value[0] === "T_RParen") {
                            MECH_LL.ParserCST.count++;
                        }
                        else {
                            // raise exception and halt
                            MECH_LL.Parser.raiseExceptionAndHalt();
                        }
                    }
                    else {
                        // raise exception and halt
                        MECH_LL.Parser.raiseExceptionAndHalt();
                    }
                }
                else {
                    MECH_LL.Parser.parseBoolval();
                }
            }
        };
        Parser.parseId = function () {
            if (ParseError) {
            }
            else {
                MECH_LL.Parser.parseChar();
            }
        };
        Parser.parseCharList = function () {
            if (ParseError) {
            }
            else {
                if (!(Tokens[MECH_LL.Parser.count].value[0] === "T_Char") && !(Tokens[MECH_LL.Parser.count].value[0] === "T_Space")) {
                }
                else if (Tokens[MECH_LL.Parser.count].value[0] === "T_Char") {
                    MECH_LL.Parser.parseChar();
                    MECH_LL.Parser.parseCharList();
                }
                else if (Tokens[MECH_LL.Parser.count].value[0] === "T_Space") {
                    MECH_LL.Parser.parseSpace();
                    MECH_LL.Parser.parseCharList();
                }
            }
        };
        Parser.parseType = function () {
            if (ParseError) {
            }
            else {
                if (Tokens[MECH_LL.Parser.count].value[0] === "T_Type") {
                    MECH_LL.Parser.count++;
                }
                else {
                    // raise exception and halt
                    MECH_LL.Parser.raiseExceptionAndHalt();
                }
            }
        };
        Parser.parseChar = function () {
            if (ParseError) {
            }
            else {
                if (Tokens[MECH_LL.Parser.count].value[0] === "T_Char") {
                    MECH_LL.Parser.count++;
                }
                else {
                    // raise exception and halt
                    MECH_LL.Parser.raiseExceptionAndHalt();
                }
            }
        };
        Parser.parseSpace = function () {
            if (ParseError) {
            }
            else {
                if (Tokens[MECH_LL.Parser.count].value[0] === "T_Space") {
                    MECH_LL.Parser.count++;
                }
                else {
                    // raise exception and halt
                    MECH_LL.Parser.raiseExceptionAndHalt();
                }
            }
        };
        Parser.parseDigit = function () {
            if (ParseError) {
            }
            else {
                if (Tokens[MECH_LL.Parser.count].value[0] === "T_Digit") {
                    MECH_LL.Parser.count++;
                }
                else {
                    // raise exception and halt
                    MECH_LL.Parser.raiseExceptionAndHalt();
                }
            }
        };
        Parser.parseBoolval = function () {
            if (ParseError) {
            }
            else {
                if (Tokens[MECH_LL.Parser.count].value[0] === "T_Boolval") {
                    MECH_LL.Parser.count++;
                }
                else {
                    // raise exception and halt
                    MECH_LL.Parser.raiseExceptionAndHalt();
                }
            }
        };
        Parser.raiseExceptionAndHalt = function () {
            ErrArea.value = ErrArea.value + "Unexpected token: " + Tokens[MECH_LL.Parser.count].value[0] + "\n";
            ParseError = true;
        };
        Parser.count = 0;
        return Parser;
    })();
    MECH_LL.Parser = Parser;
})(MECH_LL || (MECH_LL = {}));
