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
            if (Tokens[MECH_LL.Parser.count].value[0] === "$") {
            }
            else {
            }
        };
        Parser.parseBlock = function () {
            if (Tokens[MECH_LL.Parser.count].value[0] === "T_LCBrace") {
                MECH_LL.Parser.count++;
                MECH_LL.Parser.parseStatementList();
                if (Tokens[MECH_LL.Parser.count].value[0] === "T_RCBrace") {
                    // code good
                    MECH_LL.Parser.count++;
                }
                else {
                }
            }
            else {
            }
        };
        Parser.parseStatementList = function () {
            if (Tokens[MECH_LL.Parser.count].value[0] === "T_RCBrace") {
            }
            else {
                MECH_LL.Parser.parseStatement();
                MECH_LL.Parser.parseStatementList();
            }
        };
        Parser.parseStatement = function () {
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
            else {
                MECH_LL.Parser.parseBlock();
            }
        };
        Parser.parsePrintStatement = function () {
            MECH_LL.Parser.count++;
            if (Tokens[MECH_LL.Parser.count].value[0] === "T_LParen") {
                MECH_LL.Parser.count++;
                MECH_LL.Parser.parseExpr();
                if (Tokens[MECH_LL.Parser.count].value[0] === "T_RParen") {
                    MECH_LL.Parser.count++;
                }
                else {
                }
            }
            else {
            }
        };
        Parser.parseAssignmentStatement = function () {
            MECH_LL.Parser.parseId();
            if (Tokens[MECH_LL.Parser.count].value[0] === "T_AssignOP") {
                MECH_LL.Parser.count++;
                MECH_LL.Parser.parseExpr();
            }
            else {
            }
        };
        Parser.parseVarDecl = function () {
            MECH_LL.Parser.parseType();
            MECH_LL.Parser.parseId();
        };
        Parser.parseWhileStatement = function () {
            if (Tokens[MECH_LL.Parser.count].value[0] === "T_Kwdwhile") {
                MECH_LL.Parser.count++;
                MECH_LL.Parser.parseBooleanExpr();
                MECH_LL.Parser.parseBlock();
            }
            else {
            }
        };
        Parser.parseIfStatement = function () {
            if (Tokens[MECH_LL.Parser.count].value[0] === "T_Kwdif") {
                MECH_LL.Parser.count++;
                MECH_LL.Parser.parseBooleanExpr();
                MECH_LL.Parser.parseBlock();
            }
        };
        Parser.parseExpr = function () {
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
        };
        Parser.parseIntExpr = function () {
            MECH_LL.Parser.parseDigit();
            if (Tokens[MECH_LL.Parser.count].value[0] === "T_IntOP") {
                MECH_LL.Parser.count++;
                MECH_LL.Parser.parseExpr();
            }
            else {
            }
        };
        Parser.parseStringExpr = function () {
            if (Tokens[MECH_LL.Parser.count].value[0] === "T_Quote") {
                MECH_LL.Parser.count++;
                MECH_LL.Parser.parseCharList();
                if (Tokens[MECH_LL.Parser.count].value[0] === "T_Quote") {
                    // fine
                    MECH_LL.Parser.count++;
                }
                else {
                }
            }
            else {
            }
        };
        Parser.parseBooleanExpr = function () {
            if (Tokens[MECH_LL.Parser.count].value[0] === "T_LParen") {
                MECH_LL.Parser.count++;
                MECH_LL.Parser.parseExpr();
                if (Tokens[MECH_LL.Parser.count].value[0] === "T_BoolOP") {
                    MECH_LL.Parser.count++;
                    MECH_LL.Parser.parseExpr();
                }
                else {
                }
            }
            else {
                MECH_LL.Parser.parseBoolval();
            }
        };
        Parser.parseId = function () {
            MECH_LL.Parser.parseChar();
        };
        Parser.parseCharList = function () {
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
        };
        Parser.parseType = function () {
            if (Tokens[MECH_LL.Parser.count].value[0] === "T_Type") {
                MECH_LL.Parser.count++;
            }
            else {
            }
        };
        Parser.parseChar = function () {
            if (Tokens[MECH_LL.Parser.count].value[0] === "T_Char") {
                MECH_LL.Parser.count++;
            }
            else {
            }
        };
        Parser.parseSpace = function () {
            if (Tokens[MECH_LL.Parser.count].value[0] === "T_Space") {
                MECH_LL.Parser.count++;
            }
            else {
            }
        };
        Parser.parseDigit = function () {
            if (Tokens[MECH_LL.Parser.count].value[0] === "T_Digit") {
                MECH_LL.Parser.count++;
            }
            else {
            }
        };
        Parser.parseBoolval = function () {
            if (Tokens[MECH_LL.Parser.count].value[0] === "T_Boolval") {
                MECH_LL.Parser.count++;
            }
            else {
            }
        };
        Parser.count = 0;
        return Parser;
    })();
    MECH_LL.Parser = Parser;
})(MECH_LL || (MECH_LL = {}));
