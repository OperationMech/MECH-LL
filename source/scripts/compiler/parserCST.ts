// MECH-LL Compiler Parse

module MECH_LL {
    export class ParserCST {

        public static count = 0;
        public static doParseCode(): void {
            MECH_LL.ParserCST.parseProgram();
        }

        public static parseProgram(): void {
            CSyntaxTree.addNode(new NODE(null,null,false,["Program"]));
            MECH_LL.ParserCST.parseBlock();
            if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_EOF") {
                CSyntaxTree.addNode(new NODE(null,null,true,Tokens[MECH_LL.ParserCST.count].value));
            } else {
                // raise exception halt compilation
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }

        }

        public static parseBlock(): void {
            CSyntaxTree.addNode(new NODE(null,null,false,["Block"]));
            if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_LCBrace"){
                CSyntaxTree.addNode(new NODE(null,null,true,Tokens[MECH_LL.ParserCST.count].value));
                MECH_LL.ParserCST.count++;
                MECH_LL.ParserCST.parseStatementList();
                if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_RCBrace"){
                    CSyntaxTree.addNode(new NODE(null,null,true,Tokens[MECH_LL.ParserCST.count].value));
                    MECH_LL.ParserCST.count++;
                } else {
                    // raise exception and halt
                    MECH_LL.ParserCST.raiseExceptionAndHalt();
                }
            } else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
            CSyntaxTree.returnCurrentPtrToParent();
        }

        public static parseStatementList(): void {
            CSyntaxTree.addNode(new NODE(null,null,false,["StmtList"]));
            if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_RCBrace") {
                // epsilon transition
            } else {
                MECH_LL.ParserCST.parseStatement();
                MECH_LL.ParserCST.parseStatementList();
            }
            CSyntaxTree.returnCurrentPtrToParent();
        }

        public static parseStatement(): void {
            CSyntaxTree.addNode(new NODE(null,null,false,["Stmt"]));
            if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_Kwdprint") {
                MECH_LL.ParserCST.parsePrintStatement();
            } else if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_Char") {
                MECH_LL.ParserCST.parseAssignmentStatement();
            } else if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_Type") {
                MECH_LL.ParserCST.parseVarDecl();
            } else if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_Kwdwhile") {
                MECH_LL.ParserCST.parseWhileStatement();
            } else if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_Kwdif") {
                MECH_LL.ParserCST.parseIfStatement();
            } else if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_LCBrace") {
                MECH_LL.ParserCST.parseBlock();
            }
            CSyntaxTree.returnCurrentPtrToParent();
        }

        public static parsePrintStatement(): void {
            CSyntaxTree.addNode(new NODE(null,null,false,["PrintStmt"]));
            MECH_LL.ParserCST.count++;
            if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_LParen"){
                CSyntaxTree.addNode(new NODE(null,null,true,Tokens[MECH_LL.ParserCST.count].value));
                MECH_LL.ParserCST.count++;
                MECH_LL.ParserCST.parseExpr();
                if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_RParen"){
                    CSyntaxTree.addNode(new NODE(null,null,true,Tokens[MECH_LL.ParserCST.count].value));
                    MECH_LL.ParserCST.count++;
                } else {
                    // raise exception and halt
                    MECH_LL.ParserCST.raiseExceptionAndHalt();
                }
            } else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
            CSyntaxTree.returnCurrentPtrToParent();
        }

        public static parseAssignmentStatement(): void {
            CSyntaxTree.addNode(new NODE(null,null,false,["AssignStmt"]));
            MECH_LL.ParserCST.parseId();
            if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_AssignOP") {
                CSyntaxTree.addNode(new NODE(null,null,true,Tokens[MECH_LL.ParserCST.count].value));
                MECH_LL.ParserCST.count++;
                MECH_LL.ParserCST.parseExpr();
            } else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
            CSyntaxTree.returnCurrentPtrToParent();
        }

        public static parseVarDecl(): void {
            CSyntaxTree.addNode(new NODE(null,null,false,["VarDecl"]));
            MECH_LL.ParserCST.parseType();
            MECH_LL.ParserCST.parseId();
            CSyntaxTree.returnCurrentPtrToParent();
        }

        public static parseWhileStatement(): void {
            CSyntaxTree.addNode(new NODE(null,null,false,["WhileStmt"]));
            if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_Kwdwhile") {
                MECH_LL.ParserCST.count++;
                MECH_LL.ParserCST.parseBooleanExpr();
                MECH_LL.ParserCST.parseBlock();
            } else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
            CSyntaxTree.returnCurrentPtrToParent();
        }

        public static parseIfStatement(): void {
            CSyntaxTree.addNode(new NODE(null,null,false,["IfStmt"]));
            if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_Kwdif"){
                MECH_LL.ParserCST.count++;
                MECH_LL.ParserCST.parseBooleanExpr();
                MECH_LL.ParserCST.parseBlock();
            } else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
            CSyntaxTree.returnCurrentPtrToParent();
        }

        public static parseExpr(): void {
            CSyntaxTree.addNode(new NODE(null,null,false,["Expr"]));
            if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_Digit"){
                MECH_LL.ParserCST.parseIntExpr();
            } else if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_Quote"){
                MECH_LL.ParserCST.parseStringExpr();
            } else if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_LParen" ||
                      Tokens[MECH_LL.ParserCST.count].value[0] === "T_Boolval" ) {
                MECH_LL.ParserCST.parseBooleanExpr();
            } else {
                MECH_LL.ParserCST.parseId();
            }
            CSyntaxTree.returnCurrentPtrToParent();
        }

        public static parseIntExpr(): void {
            CSyntaxTree.addNode(new NODE(null,null,false,["IntExpr"]));
            MECH_LL.ParserCST.parseDigit();
            if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_IntOP") {
                CSyntaxTree.addNode(new NODE(null,null,true,Tokens[MECH_LL.ParserCST.count].value));
                MECH_LL.ParserCST.count++;
                MECH_LL.ParserCST.parseExpr();
            } else {
                // only is a digit
            }
            CSyntaxTree.returnCurrentPtrToParent();
        }

        public static parseStringExpr(): void {
            CSyntaxTree.addNode(new NODE(null,null,false,["StringExpr"]));
            if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_Quote"){
                CSyntaxTree.addNode(new NODE(null,null,true,Tokens[MECH_LL.ParserCST.count].value));
                MECH_LL.ParserCST.count++;
                MECH_LL.ParserCST.parseCharList();
                if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_Quote"){
                    CSyntaxTree.addNode(new NODE(null,null,true,Tokens[MECH_LL.ParserCST.count].value));
                    MECH_LL.ParserCST.count++;
                } else {
                    // raise exception and halt
                    MECH_LL.ParserCST.raiseExceptionAndHalt();
                }
            } else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
            CSyntaxTree.returnCurrentPtrToParent();
        }

        public static parseBooleanExpr(): void {
            CSyntaxTree.addNode(new NODE(null,null,false,["BooleanExpr"]));
            if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_LParen") {
                CSyntaxTree.addNode(new NODE(null,null,true,Tokens[MECH_LL.ParserCST.count].value));
                MECH_LL.ParserCST.count++;
                MECH_LL.ParserCST.parseExpr();
                if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_BoolOP") {
                    CSyntaxTree.addNode(new NODE(null,null,true,Tokens[MECH_LL.ParserCST.count].value));
                    MECH_LL.ParserCST.count++;
                    MECH_LL.ParserCST.parseExpr();
                    if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_RParen") {
                        CSyntaxTree.addNode(new NODE(null, null, true, Tokens[MECH_LL.ParserCST.count].value));
                        MECH_LL.ParserCST.count++;
                    } else {
                        // raise exception and halt
                        MECH_LL.ParserCST.raiseExceptionAndHalt();
                    }
                } else {
                    // raise exception and halt
                    MECH_LL.ParserCST.raiseExceptionAndHalt();
                }

            } else {
                MECH_LL.ParserCST.parseBoolval();
            }
            CSyntaxTree.returnCurrentPtrToParent();
        }

        public static parseId(): void {
            CSyntaxTree.addNode(new NODE(null,null,false,["Id"]));
            MECH_LL.ParserCST.parseChar();
            CSyntaxTree.returnCurrentPtrToParent();
        }

        public static parseCharList(): void {
            CSyntaxTree.addNode(new NODE(null,null,false,["CharList"]));
            if(!(Tokens[MECH_LL.ParserCST.count].value[0] === "T_Char") &&
                !(Tokens[MECH_LL.ParserCST.count].value[0] === "T_Space")) {
                // epsilon transition
            } else if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_Char") {
                MECH_LL.ParserCST.parseChar();
                MECH_LL.ParserCST.parseCharList();
            } else if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_Space") {
                MECH_LL.ParserCST.parseSpace();
                MECH_LL.ParserCST.parseCharList();
            }
            CSyntaxTree.returnCurrentPtrToParent();
        }

        public static parseType(): void {
            if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_Type") {
                CSyntaxTree.addNode(new NODE(null,null,true,Tokens[MECH_LL.ParserCST.count].value));
                MECH_LL.ParserCST.count++;
            } else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
        }

        public static parseChar(): void {
            if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_Char") {
                CSyntaxTree.addNode(new NODE(null,null,true,Tokens[MECH_LL.ParserCST.count].value));
                MECH_LL.ParserCST.count++;
            } else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
        }

        public static parseSpace(): void {
            if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_Space") {
                CSyntaxTree.addNode(new NODE(null,null,true,Tokens[MECH_LL.ParserCST.count].value));
                MECH_LL.ParserCST.count++;
            } else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
        }

        public static parseDigit(): void {
            if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_Digit") {
                CSyntaxTree.addNode(new NODE(null,null,true,Tokens[MECH_LL.ParserCST.count].value));
                MECH_LL.ParserCST.count++;
            } else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
        }

        public static parseBoolval(): void {
            if(Tokens[MECH_LL.ParserCST.count].value[0] === "T_Boolval") {
                CSyntaxTree.addNode(new NODE(null,null,true,Tokens[MECH_LL.ParserCST.count].value));
                MECH_LL.ParserCST.count++;
            } else {
                // raise exception and halt
                MECH_LL.ParserCST.raiseExceptionAndHalt();
            }
        }

        public static raiseExceptionAndHalt(): void {
            ErrArea.value = ErrArea.value + "Unexpected token: " + Tokens[MECH_LL.ParserCST.count].value[0] + "\n";
            ParseError = true;
        }
    }
}
