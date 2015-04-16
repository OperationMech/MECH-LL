// MECH-LL Compiler Parse

module MECH_LL {
    export class Parser {

        public static count = 0;
        public static doParseCode(): void {
            MECH_LL.Parser.parseProgram();
        }

        public static parseProgram(): void {
            MECH_LL.Parser.parseBlock();
            if(ParseError){
                //Error State
            }
            if(Tokens[MECH_LL.Parser.count].value[0] === "T_EOF") {
                // code closed
            } else {
                // raise exception and halt
                MECH_LL.Parser.raiseExceptionAndHalt();
            }

        }

        public static parseBlock(): void {
            if(ParseError){
                //Error State
            } else {
                if(Tokens[MECH_LL.Parser.count].value[0] === "T_LCBrace"){
                    MECH_LL.Parser.count++;
                    MECH_LL.Parser.parseStatementList();
                    if(Tokens[MECH_LL.Parser.count].value[0] === "T_RCBrace"){
                        // code good
                        MECH_LL.Parser.count++;
                    } else {
                        // raise exception and halt
                        MECH_LL.Parser.raiseExceptionAndHalt();
                    }
                } else {
                    // raise exception and halt
                    MECH_LL.Parser.raiseExceptionAndHalt();
                }
            }
        }

        public static parseStatementList(): void {
            if(ParseError){
                //Error State
            } else {
                if(Tokens[MECH_LL.Parser.count].value[0] === "T_RCBrace") {
                    // epsilon transition
                } else {
                    MECH_LL.Parser.parseStatement();
                    MECH_LL.Parser.parseStatementList();
                }
            }
        }

        public static parseStatement(): void {
            if(ParseError){
                //Error State
            } else {
                if(Tokens[MECH_LL.Parser.count].value[0] === "T_Kwdprint") {
                    MECH_LL.Parser.parsePrintStatement();
                } else if(Tokens[MECH_LL.Parser.count].value[0] === "T_Char") {
                    MECH_LL.Parser.parseAssignmentStatement();
                } else if(Tokens[MECH_LL.Parser.count].value[0] === "T_Type") {
                    MECH_LL.Parser.parseVarDecl();
                } else if(Tokens[MECH_LL.Parser.count].value[0] === "T_Kwdwhile") {
                    MECH_LL.Parser.parseWhileStatement();
                } else if(Tokens[MECH_LL.Parser.count].value[0] === "T_Kwdif") {
                    MECH_LL.Parser.parseIfStatement();
                } else if(Tokens[MECH_LL.Parser.count].value[0] === "T_LCBrace") {
                    MECH_LL.Parser.parseBlock();
                }
            }
        }

        public static parsePrintStatement(): void {
            if(ParseError){
                //Error State
            } else {
                MECH_LL.Parser.count++;
                if(Tokens[MECH_LL.Parser.count].value[0] === "T_LParen"){
                    MECH_LL.Parser.count++;
                    MECH_LL.Parser.parseExpr();
                    if(Tokens[MECH_LL.Parser.count].value[0] === "T_RParen"){
                        MECH_LL.Parser.count++;
                    } else {
                        // raise exception and halt
                        MECH_LL.Parser.raiseExceptionAndHalt();
                    }
                } else {
                    // raise exception and halt
                    MECH_LL.Parser.raiseExceptionAndHalt();
                }
            }
        }

        public static parseAssignmentStatement(): void {
            if(ParseError){
                //Error State
            } else {
                MECH_LL.Parser.parseId();
                if(Tokens[MECH_LL.Parser.count].value[0] === "T_AssignOP") {
                    MECH_LL.Parser.count++;
                    MECH_LL.Parser.parseExpr();
                } else {
                    // raise exception and halt
                    MECH_LL.Parser.raiseExceptionAndHalt();
                }
            }
        }

        public static parseVarDecl(): void {
            if(ParseError){
                //Error State
            } else {
                MECH_LL.Parser.parseType();
                MECH_LL.Parser.parseId();
            }
        }

        public static parseWhileStatement(): void {
            if(ParseError){
                //Error State
            } else {
                if(Tokens[MECH_LL.Parser.count].value[0] === "T_Kwdwhile") {
                    MECH_LL.Parser.count++;
                    MECH_LL.Parser.parseBooleanExpr();
                    MECH_LL.Parser.parseBlock();
                } else {
                    // raise exception and halt
                    MECH_LL.Parser.raiseExceptionAndHalt();
                }
            }
        }

        public static parseIfStatement(): void {
            if(ParseError){
                //Error State
            } else {
                if(Tokens[MECH_LL.Parser.count].value[0] === "T_Kwdif"){
                    MECH_LL.Parser.count++;
                    MECH_LL.Parser.parseBooleanExpr();
                    MECH_LL.Parser.parseBlock();
                } else {
                    // raise exception and halt
                    MECH_LL.Parser.raiseExceptionAndHalt();
                }
            }
        }

        public static parseExpr(): void {
            if(ParseError){
                //Error State
            } else {
                if(Tokens[MECH_LL.Parser.count].value[0] === "T_Digit"){
                    MECH_LL.Parser.parseIntExpr();
                } else if(Tokens[MECH_LL.Parser.count].value[0] === "T_Quote"){
                    MECH_LL.Parser.parseStringExpr();
                } else if(Tokens[MECH_LL.Parser.count].value[0] === "T_LParen" ||
                          Tokens[MECH_LL.Parser.count].value[0] === "T_Boolval" ) {
                    MECH_LL.Parser.parseBooleanExpr();
                } else {
                    MECH_LL.Parser.parseId();
                }
            }
        }

        public static parseIntExpr(): void {
            if(ParseError){
                //Error State
            } else {
                MECH_LL.Parser.parseDigit();
                if(Tokens[MECH_LL.Parser.count].value[0] === "T_IntOP") {
                    MECH_LL.Parser.count++;
                    MECH_LL.Parser.parseExpr();
                } else {
                    // only is a digit
                }
            }
        }

        public static parseStringExpr(): void {
            if(ParseError){
            } else {
                if(Tokens[MECH_LL.Parser.count].value[0] === "T_Quote"){
                    MECH_LL.Parser.count++;
                    MECH_LL.Parser.parseCharList();
                    if(Tokens[MECH_LL.Parser.count].value[0] === "T_Quote"){
                        // fine
                        MECH_LL.Parser.count++;
                    } else {
                        // raise exception and halt
                        MECH_LL.Parser.raiseExceptionAndHalt();
                    }
                } else {
                    // raise exception and halt
                    MECH_LL.Parser.raiseExceptionAndHalt();
                }
            }
        }

        public static parseBooleanExpr(): void {
            if(ParseError){
                //Error State
            } else {
                if(Tokens[MECH_LL.Parser.count].value[0] === "T_LParen") {
                    MECH_LL.Parser.count++;
                    MECH_LL.Parser.parseExpr();
                    if(Tokens[MECH_LL.Parser.count].value[0] === "T_BoolOP") {
                        MECH_LL.Parser.count++;
                        MECH_LL.Parser.parseExpr();
                        if(Tokens[MECH_LL.Parser.count].value[0] === "T_RParen") {
                            MECH_LL.ParserCST.count++;
                            // close BooleanExpr
                        } else {
                            // raise exception and halt
                            MECH_LL.Parser.raiseExceptionAndHalt();
                        }
                    } else {
                        // raise exception and halt
                        MECH_LL.Parser.raiseExceptionAndHalt();
                    }
                } else {
                    MECH_LL.Parser.parseBoolval();
                }
            }
        }

        public static parseId(): void {
            if(ParseError){
                //Error State
            } else {
                MECH_LL.Parser.parseChar();
            }
        }

        public static parseCharList(): void {
            if(ParseError){
                //Error State
            } else {
                if(!(Tokens[MECH_LL.Parser.count].value[0] === "T_Char") &&
                    !(Tokens[MECH_LL.Parser.count].value[0] === "T_Space")) {
                    // epsilon transition
                } else if(Tokens[MECH_LL.Parser.count].value[0] === "T_Char") {
                    MECH_LL.Parser.parseChar();
                    MECH_LL.Parser.parseCharList();
                } else if(Tokens[MECH_LL.Parser.count].value[0] === "T_Space") {
                    MECH_LL.Parser.parseSpace();
                    MECH_LL.Parser.parseCharList();
                }
            }
        }

        public static parseType(): void {
            if(ParseError){
                //Error State
            } else {
                if (Tokens[MECH_LL.Parser.count].value[0] === "T_Type") {
                    MECH_LL.Parser.count++;
                } else {
                    // raise exception and halt
                    MECH_LL.Parser.raiseExceptionAndHalt();
                }
            }
        }

        public static parseChar(): void {
            if(ParseError){
            } else {
                if (Tokens[MECH_LL.Parser.count].value[0] === "T_Char") {
                    MECH_LL.Parser.count++;
                } else {
                    // raise exception and halt
                    MECH_LL.Parser.raiseExceptionAndHalt();
                }
            }
        }

        public static parseSpace(): void {
            if(ParseError){
                //Error State
            } else {
                if(Tokens[MECH_LL.Parser.count].value[0] === "T_Space") {
                    MECH_LL.Parser.count++;
                } else {
                    // raise exception and halt
                    MECH_LL.Parser.raiseExceptionAndHalt();
                }
            }
        }

        public static parseDigit(): void {
            if (ParseError) {
            } else {
                if (Tokens[MECH_LL.Parser.count].value[0] === "T_Digit") {
                    MECH_LL.Parser.count++;
                } else {
                    // raise exception and halt
                    MECH_LL.Parser.raiseExceptionAndHalt();
                }
            }
        }

        public static parseBoolval(): void {
            if(ParseError){
                //Error State
            } else {
                if (Tokens[MECH_LL.Parser.count].value[0] === "T_Boolval") {
                    MECH_LL.Parser.count++;
                } else {
                    // raise exception and halt
                    MECH_LL.Parser.raiseExceptionAndHalt();
                }
            }
        }

        public static raiseExceptionAndHalt(): void {
            ErrArea.value = ErrArea.value + "Unexpected token: " + Tokens[MECH_LL.Parser.count].value[0] + "\n";
            ParseError = true;
        }
    }
}
