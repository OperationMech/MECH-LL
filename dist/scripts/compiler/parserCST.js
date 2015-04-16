// MECH-LL Compiler Parse
var MECH_LL;
(function (MECH_LL) {
    var ParserCST = (function () {
        function ParserCST() {
        }
        ParserCST.doParseCode = function () {
            MECH_LL.ParserCST.parseProgram();
        };
        ParserCST.parseProgram = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["Program"]));
            MECH_LL.ParserCST.parseBlock();
            if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_EOP") {
                CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[MECH_LL.ParserCST.count].value));
            }
            else {
                // raise exception halt compilation
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
        };
        ParserCST.parseBlock = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["Block"]));
            if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_LCBrace") {
                CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[MECH_LL.ParserCST.count].value));
                MECH_LL.ParserCST.count++;
                MECH_LL.ParserCST.parseStatementList();
                if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_RCBrace") {
                    CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[MECH_LL.ParserCST.count].value));
                    MECH_LL.ParserCST.count++;
                }
                else {
                    // raise exception and halt
                    MECH_LL.ParserCST.raiseExceptionAndHalt();
                }
            }
            else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
        };
        ParserCST.parseStatementList = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["StmtList"]));
            if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_RCBrace") {
            }
            else {
                MECH_LL.ParserCST.parseStatement();
                MECH_LL.ParserCST.parseStatementList();
            }
        };
        ParserCST.parseStatement = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["Stmt"]));
            if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_Kwdprint") {
                MECH_LL.ParserCST.parsePrintStatement();
            }
            else if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_Char") {
                MECH_LL.ParserCST.parseAssignmentStatement();
            }
            else if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_Type") {
                MECH_LL.ParserCST.parseVarDecl();
            }
            else if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_Kwdwhile") {
                MECH_LL.ParserCST.parseWhileStatement();
            }
            else if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_Kwdif") {
                MECH_LL.ParserCST.parseIfStatement();
            }
            else {
                MECH_LL.ParserCST.parseBlock();
            }
        };
        ParserCST.parsePrintStatement = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["PrintStmt"]));
            MECH_LL.ParserCST.count++;
            if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_LParen") {
                CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[MECH_LL.ParserCST.count].value));
                MECH_LL.ParserCST.count++;
                MECH_LL.ParserCST.parseExpr();
                if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_RParen") {
                    CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[MECH_LL.ParserCST.count].value));
                    MECH_LL.ParserCST.count++;
                }
                else {
                    // raise exception and halt
                    MECH_LL.ParserCST.raiseExceptionAndHalt();
                }
            }
            else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
        };
        ParserCST.parseAssignmentStatement = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["AssignStmt"]));
            MECH_LL.ParserCST.parseId();
            if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_AssignOP") {
                CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[MECH_LL.ParserCST.count].value));
                MECH_LL.ParserCST.count++;
                MECH_LL.ParserCST.parseExpr();
            }
            else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
        };
        ParserCST.parseVarDecl = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["VarDecl"]));
            MECH_LL.ParserCST.parseType();
            MECH_LL.ParserCST.parseId();
        };
        ParserCST.parseWhileStatement = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["WhileStmt"]));
            if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_Kwdwhile") {
                MECH_LL.ParserCST.count++;
                MECH_LL.ParserCST.parseBooleanExpr();
                MECH_LL.ParserCST.parseBlock();
            }
            else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
        };
        ParserCST.parseIfStatement = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["IfStmt"]));
            if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_Kwdif") {
                MECH_LL.ParserCST.count++;
                MECH_LL.ParserCST.parseBooleanExpr();
                MECH_LL.ParserCST.parseBlock();
            }
            else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
        };
        ParserCST.parseExpr = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["Expr"]));
            if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_Digit") {
                MECH_LL.ParserCST.parseIntExpr();
            }
            else if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_Quote") {
                MECH_LL.ParserCST.parseStringExpr();
            }
            else if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_LParen" || Tokens[MECH_LL.ParserCST.count].value[0] === "T_Boolval") {
                MECH_LL.ParserCST.parseBooleanExpr();
            }
            else {
                MECH_LL.ParserCST.parseId();
            }
        };
        ParserCST.parseIntExpr = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["IntExpr"]));
            MECH_LL.ParserCST.parseDigit();
            if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_IntOP") {
                CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[MECH_LL.ParserCST.count].value));
                MECH_LL.ParserCST.count++;
                MECH_LL.ParserCST.parseExpr();
            }
            else {
            }
        };
        ParserCST.parseStringExpr = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["StringExpr"]));
            if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_Quote") {
                CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[MECH_LL.ParserCST.count].value));
                MECH_LL.ParserCST.count++;
                MECH_LL.ParserCST.parseCharList();
                if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_Quote") {
                    CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[MECH_LL.ParserCST.count].value));
                    MECH_LL.ParserCST.count++;
                }
                else {
                    // raise exception and halt
                    MECH_LL.ParserCST.raiseExceptionAndHalt();
                }
            }
            else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
        };
        ParserCST.parseBooleanExpr = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["BooleanExpr"]));
            if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_LParen") {
                CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[MECH_LL.ParserCST.count].value));
                MECH_LL.ParserCST.count++;
                MECH_LL.ParserCST.parseExpr();
                if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_BoolOP") {
                    CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[MECH_LL.ParserCST.count].value));
                    MECH_LL.ParserCST.count++;
                    MECH_LL.ParserCST.parseExpr();
                    if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_RParen") {
                        CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[MECH_LL.ParserCST.count].value));
                        MECH_LL.ParserCST.count++;
                    }
                    else {
                        // raise exception and halt
                        MECH_LL.ParserCST.raiseExceptionAndHalt();
                    }
                }
                else {
                    // raise exception and halt
                    MECH_LL.ParserCST.raiseExceptionAndHalt();
                }
            }
            else {
                MECH_LL.ParserCST.parseBoolval();
            }
        };
        ParserCST.parseId = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["Id"]));
            MECH_LL.ParserCST.parseChar();
        };
        ParserCST.parseCharList = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["CharList"]));
            if (!(Tokens[MECH_LL.ParserCST.count].value[0] === "T_Char") && !(Tokens[MECH_LL.ParserCST.count].value[0] === "T_Space")) {
            }
            else if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_Char") {
                MECH_LL.ParserCST.parseChar();
                MECH_LL.ParserCST.parseCharList();
            }
            else if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_Space") {
                MECH_LL.ParserCST.parseSpace();
                MECH_LL.ParserCST.parseCharList();
            }
        };
        ParserCST.parseType = function () {
            if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_Type") {
                CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[MECH_LL.ParserCST.count].value));
                MECH_LL.ParserCST.count++;
            }
            else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
        };
        ParserCST.parseChar = function () {
            if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_Char") {
                CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[MECH_LL.ParserCST.count].value));
                MECH_LL.ParserCST.count++;
            }
            else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
        };
        ParserCST.parseSpace = function () {
            if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_Space") {
                CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[MECH_LL.ParserCST.count].value));
                MECH_LL.ParserCST.count++;
            }
            else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
        };
        ParserCST.parseDigit = function () {
            if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_Digit") {
                CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[MECH_LL.ParserCST.count].value));
                MECH_LL.ParserCST.count++;
            }
            else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
        };
        ParserCST.parseBoolval = function () {
            if (Tokens[MECH_LL.ParserCST.count].value[0] === "T_Boolval") {
                CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[MECH_LL.ParserCST.count].value));
                MECH_LL.ParserCST.count++;
            }
            else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
        };
        ParserCST.raiseExceptionAndHalt = function () {
            ErrArea.value = ErrArea.value + "Unexpected token: " + Tokens[MECH_LL.ParserCST.count].value[0] + "\n";
            ParseError = true;
        };
        ParserCST.count = 0;
        return ParserCST;
    })();
    MECH_LL.ParserCST = ParserCST;
})(MECH_LL || (MECH_LL = {}));
