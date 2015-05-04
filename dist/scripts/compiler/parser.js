// MECH-LL Compiler Parse
var MECH_LL;
(function (MECH_LL) {
    var Parser = (function () {
        function Parser() {
        }
        Parser.doParseCode = function () {
            ParseCount = 0;
            MECH_LL.Parser.parseProgram();
        };
        Parser.parseProgram = function () {
            MECH_LL.Parser.parseBlock();
            if (ParseError) {
            }
            if (Tokens[ParseCount].value[0] === "T_EOF") {
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
                if (Tokens[ParseCount].value[0] === "T_LCBrace") {
                    ParseCount++;
                    MECH_LL.Parser.parseStatementList();
                    if (Tokens[ParseCount].value[0] === "T_RCBrace") {
                        // code good
                        ParseCount++;
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
                if (Tokens[ParseCount].value[0] === "T_RCBrace") {
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
                if (Tokens[ParseCount].value[0] === "T_Kwdprint") {
                    MECH_LL.Parser.parsePrintStatement();
                }
                else if (Tokens[ParseCount].value[0] === "T_Char") {
                    MECH_LL.Parser.parseAssignmentStatement();
                }
                else if (Tokens[ParseCount].value[0] === "T_Type") {
                    MECH_LL.Parser.parseVarDecl();
                }
                else if (Tokens[ParseCount].value[0] === "T_Kwdwhile") {
                    MECH_LL.Parser.parseWhileStatement();
                }
                else if (Tokens[ParseCount].value[0] === "T_Kwdif") {
                    MECH_LL.Parser.parseIfStatement();
                }
                else if (Tokens[ParseCount].value[0] === "T_LCBrace") {
                    MECH_LL.Parser.parseBlock();
                }
                else {
                    MECH_LL.Parser.raiseExceptionAndHalt();
                }
            }
        };
        Parser.parsePrintStatement = function () {
            if (ParseError) {
            }
            else {
                ParseCount++;
                if (Tokens[ParseCount].value[0] === "T_LParen") {
                    ParseCount++;
                    MECH_LL.Parser.parseExpr();
                    if (Tokens[ParseCount].value[0] === "T_RParen") {
                        ParseCount++;
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
                if (Tokens[ParseCount].value[0] === "T_AssignOP") {
                    ParseCount++;
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
                if (Tokens[ParseCount].value[0] === "T_Kwdwhile") {
                    ParseCount++;
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
                if (Tokens[ParseCount].value[0] === "T_Kwdif") {
                    ParseCount++;
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
                if (Tokens[ParseCount].value[0] === "T_Digit") {
                    MECH_LL.Parser.parseIntExpr();
                }
                else if (Tokens[ParseCount].value[0] === "T_Quote") {
                    MECH_LL.Parser.parseStringExpr();
                }
                else if (Tokens[ParseCount].value[0] === "T_LParen" ||
                    Tokens[ParseCount].value[0] === "T_Boolval") {
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
                if (Tokens[ParseCount].value[0] === "T_IntOP") {
                    ParseCount++;
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
                if (Tokens[ParseCount].value[0] === "T_Quote") {
                    ParseCount++;
                    MECH_LL.Parser.parseCharList();
                    if (Tokens[ParseCount].value[0] === "T_Quote") {
                        // fine
                        ParseCount++;
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
                if (Tokens[ParseCount].value[0] === "T_LParen") {
                    ParseCount++;
                    MECH_LL.Parser.parseExpr();
                    if (Tokens[ParseCount].value[0] === "T_BoolOP") {
                        ParseCount++;
                        MECH_LL.Parser.parseExpr();
                        if (Tokens[ParseCount].value[0] === "T_RParen") {
                            ParseCount++;
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
                if (!(Tokens[ParseCount].value[0] === "T_Char") &&
                    !(Tokens[ParseCount].value[0] === "T_Space")) {
                }
                else if (Tokens[ParseCount].value[0] === "T_Char") {
                    MECH_LL.Parser.parseChar();
                    MECH_LL.Parser.parseCharList();
                }
                else if (Tokens[ParseCount].value[0] === "T_Space") {
                    MECH_LL.Parser.parseSpace();
                    MECH_LL.Parser.parseCharList();
                }
            }
        };
        Parser.parseType = function () {
            if (ParseError) {
            }
            else {
                if (Tokens[ParseCount].value[0] === "T_Type") {
                    ParseCount++;
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
                if (Tokens[ParseCount].value[0] === "T_Char") {
                    ParseCount++;
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
                if (Tokens[ParseCount].value[0] === "T_Space") {
                    ParseCount++;
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
                if (Tokens[ParseCount].value[0] === "T_Digit") {
                    ParseCount++;
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
                if (Tokens[ParseCount].value[0] === "T_Boolval") {
                    ParseCount++;
                }
                else {
                    // raise exception and halt
                    MECH_LL.Parser.raiseExceptionAndHalt();
                }
            }
        };
        Parser.raiseExceptionAndHalt = function () {
            ErrArea.value = ErrArea.value + "Unexpected token: " + Tokens[ParseCount].value[0] + "\n";
            ParseError = true;
        };
        return Parser;
    })();
    MECH_LL.Parser = Parser;
})(MECH_LL || (MECH_LL = {}));
