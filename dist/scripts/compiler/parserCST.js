// MECH-LL Compiler Parse
var MECH_LL;
(function (MECH_LL) {
    var ParserCST = (function () {
        function ParserCST() {
        }
        ParserCST.doParseCode = function () {
            ParseCountCST = 0;
            MECH_LL.ParserCST.parseProgram();
        };
        ParserCST.parseProgram = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["Program"]));
            MECH_LL.ParserCST.parseBlock();
            if (Tokens[ParseCountCST].value[0] === "T_EOF") {
                CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[ParseCountCST].value));
            }
            else {
                // raise exception halt compilation
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
        };
        ParserCST.parseBlock = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["Block"]));
            if (Tokens[ParseCountCST].value[0] === "T_LCBrace") {
                CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[ParseCountCST].value));
                ParseCountCST++;
                MECH_LL.ParserCST.parseStatementList();
                if (Tokens[ParseCountCST].value[0] === "T_RCBrace") {
                    CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[ParseCountCST].value));
                    ParseCountCST++;
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
            CSyntaxTree.returnCurrentPtrToParent();
        };
        ParserCST.parseStatementList = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["StmtList"]));
            if (Tokens[ParseCountCST].value[0] === "T_RCBrace") {
            }
            else {
                MECH_LL.ParserCST.parseStatement();
                MECH_LL.ParserCST.parseStatementList();
            }
            CSyntaxTree.returnCurrentPtrToParent();
        };
        ParserCST.parseStatement = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["Stmt"]));
            if (Tokens[ParseCountCST].value[0] === "T_Kwdprint") {
                MECH_LL.ParserCST.parsePrintStatement();
            }
            else if (Tokens[ParseCountCST].value[0] === "T_Char") {
                MECH_LL.ParserCST.parseAssignmentStatement();
            }
            else if (Tokens[ParseCountCST].value[0] === "T_Type") {
                MECH_LL.ParserCST.parseVarDecl();
            }
            else if (Tokens[ParseCountCST].value[0] === "T_Kwdwhile") {
                MECH_LL.ParserCST.parseWhileStatement();
            }
            else if (Tokens[ParseCountCST].value[0] === "T_Kwdif") {
                MECH_LL.ParserCST.parseIfStatement();
            }
            else if (Tokens[ParseCountCST].value[0] === "T_LCBrace") {
                MECH_LL.ParserCST.parseBlock();
            }
            CSyntaxTree.returnCurrentPtrToParent();
        };
        ParserCST.parsePrintStatement = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["PrintStmt"]));
            ParseCountCST++;
            if (Tokens[ParseCountCST].value[0] === "T_LParen") {
                CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[ParseCountCST].value));
                ParseCountCST++;
                MECH_LL.ParserCST.parseExpr();
                if (Tokens[ParseCountCST].value[0] === "T_RParen") {
                    CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[ParseCountCST].value));
                    ParseCountCST++;
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
            CSyntaxTree.returnCurrentPtrToParent();
        };
        ParserCST.parseAssignmentStatement = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["AssignStmt"]));
            MECH_LL.ParserCST.parseId();
            if (Tokens[ParseCountCST].value[0] === "T_AssignOP") {
                CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[ParseCountCST].value));
                ParseCountCST++;
                MECH_LL.ParserCST.parseExpr();
            }
            else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
            CSyntaxTree.returnCurrentPtrToParent();
        };
        ParserCST.parseVarDecl = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["VarDecl"]));
            MECH_LL.ParserCST.parseType();
            MECH_LL.ParserCST.parseId();
            CSyntaxTree.returnCurrentPtrToParent();
        };
        ParserCST.parseWhileStatement = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["WhileStmt"]));
            if (Tokens[ParseCountCST].value[0] === "T_Kwdwhile") {
                ParseCountCST++;
                MECH_LL.ParserCST.parseBooleanExpr();
                MECH_LL.ParserCST.parseBlock();
            }
            else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
            CSyntaxTree.returnCurrentPtrToParent();
        };
        ParserCST.parseIfStatement = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["IfStmt"]));
            if (Tokens[ParseCountCST].value[0] === "T_Kwdif") {
                ParseCountCST++;
                MECH_LL.ParserCST.parseBooleanExpr();
                MECH_LL.ParserCST.parseBlock();
            }
            else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
            CSyntaxTree.returnCurrentPtrToParent();
        };
        ParserCST.parseExpr = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["Expr"]));
            if (Tokens[ParseCountCST].value[0] === "T_Digit") {
                MECH_LL.ParserCST.parseIntExpr();
            }
            else if (Tokens[ParseCountCST].value[0] === "T_Quote") {
                MECH_LL.ParserCST.parseStringExpr();
            }
            else if (Tokens[ParseCountCST].value[0] === "T_LParen" ||
                Tokens[ParseCountCST].value[0] === "T_Boolval") {
                MECH_LL.ParserCST.parseBooleanExpr();
            }
            else {
                MECH_LL.ParserCST.parseId();
            }
            CSyntaxTree.returnCurrentPtrToParent();
        };
        ParserCST.parseIntExpr = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["IntExpr"]));
            MECH_LL.ParserCST.parseDigit();
            if (Tokens[ParseCountCST].value[0] === "T_IntOP") {
                CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[ParseCountCST].value));
                ParseCountCST++;
                MECH_LL.ParserCST.parseExpr();
            }
            else {
            }
            CSyntaxTree.returnCurrentPtrToParent();
        };
        ParserCST.parseStringExpr = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["StringExpr"]));
            if (Tokens[ParseCountCST].value[0] === "T_Quote") {
                CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[ParseCountCST].value));
                ParseCountCST++;
                MECH_LL.ParserCST.parseCharList();
                if (Tokens[ParseCountCST].value[0] === "T_Quote") {
                    CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[ParseCountCST].value));
                    ParseCountCST++;
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
            CSyntaxTree.returnCurrentPtrToParent();
        };
        ParserCST.parseBooleanExpr = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["BooleanExpr"]));
            if (Tokens[ParseCountCST].value[0] === "T_LParen") {
                CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[ParseCountCST].value));
                ParseCountCST++;
                MECH_LL.ParserCST.parseExpr();
                if (Tokens[ParseCountCST].value[0] === "T_BoolOP") {
                    CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[ParseCountCST].value));
                    ParseCountCST++;
                    MECH_LL.ParserCST.parseExpr();
                    if (Tokens[ParseCountCST].value[0] === "T_RParen") {
                        CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[ParseCountCST].value));
                        ParseCountCST++;
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
            CSyntaxTree.returnCurrentPtrToParent();
        };
        ParserCST.parseId = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["Id"]));
            MECH_LL.ParserCST.parseChar();
            CSyntaxTree.returnCurrentPtrToParent();
        };
        ParserCST.parseCharList = function () {
            CSyntaxTree.addNode(new MECH_LL.NODE(null, null, false, ["CharList"]));
            if (!(Tokens[ParseCountCST].value[0] === "T_Char") &&
                !(Tokens[ParseCountCST].value[0] === "T_Space")) {
            }
            else if (Tokens[ParseCountCST].value[0] === "T_Char") {
                MECH_LL.ParserCST.parseChar();
                MECH_LL.ParserCST.parseCharList();
            }
            else if (Tokens[ParseCountCST].value[0] === "T_Space") {
                MECH_LL.ParserCST.parseSpace();
                MECH_LL.ParserCST.parseCharList();
            }
            CSyntaxTree.returnCurrentPtrToParent();
        };
        ParserCST.parseType = function () {
            if (Tokens[ParseCountCST].value[0] === "T_Type") {
                CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[ParseCountCST].value));
                ParseCountCST++;
            }
            else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
        };
        ParserCST.parseChar = function () {
            if (Tokens[ParseCountCST].value[0] === "T_Char") {
                CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[ParseCountCST].value));
                ParseCountCST++;
            }
            else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
        };
        ParserCST.parseSpace = function () {
            if (Tokens[ParseCountCST].value[0] === "T_Space") {
                CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[ParseCountCST].value));
                ParseCountCST++;
            }
            else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
        };
        ParserCST.parseDigit = function () {
            if (Tokens[ParseCountCST].value[0] === "T_Digit") {
                CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[ParseCountCST].value));
                ParseCountCST++;
            }
            else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
        };
        ParserCST.parseBoolval = function () {
            if (Tokens[ParseCountCST].value[0] === "T_Boolval") {
                CSyntaxTree.addNode(new MECH_LL.NODE(null, null, true, Tokens[ParseCountCST].value));
                ParseCountCST++;
            }
            else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
        };
        ParserCST.raiseExceptionAndHalt = function () {
            ErrArea.value = ErrArea.value + "Unexpected token: " + Tokens[ParseCountCST].value[0] + "\n";
            ParseError = true;
        };
        return ParserCST;
    })();
    MECH_LL.ParserCST = ParserCST;
})(MECH_LL || (MECH_LL = {}));
