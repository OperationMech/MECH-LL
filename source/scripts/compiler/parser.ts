// MECH-LL Compiler Parse

module MECH_LL {
    export class Parser {

        public static doParseCode(): void {
            ParseCount = 0;
            MECH_LL.Parser.parseProgram();
        }

        public static parseProgram(): void {
            MECH_LL.Parser.parseBlock();
            if(ParseError){
                //Error State
            }
            if(Tokens[ParseCount].value[0] === "T_EOF") {
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
                if(Tokens[ParseCount].value[0] === "T_LCBrace"){
                    ParseCount++;
                    MECH_LL.Parser.parseStatementList();
                    if(Tokens[ParseCount].value[0] === "T_RCBrace"){
                        // code good
                        ParseCount++;
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
                if(Tokens[ParseCount].value[0] === "T_RCBrace") {
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
                if(Tokens[ParseCount].value[0] === "T_Kwdprint") {
                    MECH_LL.Parser.parsePrintStatement();
                } else if(Tokens[ParseCount].value[0] === "T_Char") {
                    MECH_LL.Parser.parseAssignmentStatement();
                } else if(Tokens[ParseCount].value[0] === "T_Type") {
                    MECH_LL.Parser.parseVarDecl();
                } else if(Tokens[ParseCount].value[0] === "T_Kwdwhile") {
                    MECH_LL.Parser.parseWhileStatement();
                } else if(Tokens[ParseCount].value[0] === "T_Kwdif") {
                    MECH_LL.Parser.parseIfStatement();
                } else if(Tokens[ParseCount].value[0] === "T_LCBrace") {
                    MECH_LL.Parser.parseBlock();
                } else {
                    MECH_LL.Parser.raiseExceptionAndHalt()
                }
            }
        }

        public static parsePrintStatement(): void {
            if(ParseError){
                //Error State
            } else {
                ParseCount++;
                if(Tokens[ParseCount].value[0] === "T_LParen"){
                    ParseCount++;
                    MECH_LL.Parser.parseExpr();
                    if(Tokens[ParseCount].value[0] === "T_RParen"){
                        ParseCount++;
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
                if(Tokens[ParseCount].value[0] === "T_AssignOP") {
                    ParseCount++;
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
                if(Tokens[ParseCount].value[0] === "T_Kwdwhile") {
                    ParseCount++;
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
                if(Tokens[ParseCount].value[0] === "T_Kwdif"){
                    ParseCount++;
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
                if(Tokens[ParseCount].value[0] === "T_Digit"){
                    MECH_LL.Parser.parseIntExpr();
                } else if(Tokens[ParseCount].value[0] === "T_Quote"){
                    MECH_LL.Parser.parseStringExpr();
                } else if(Tokens[ParseCount].value[0] === "T_LParen" ||
                          Tokens[ParseCount].value[0] === "T_Boolval" ) {
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
                if(Tokens[ParseCount].value[0] === "T_IntOP") {
                    ParseCount++;
                    MECH_LL.Parser.parseExpr();
                } else {
                    // only is a digit
                }
            }
        }

        public static parseStringExpr(): void {
            if(ParseError){
            } else {
                if(Tokens[ParseCount].value[0] === "T_Quote"){
                    ParseCount++;
                    MECH_LL.Parser.parseCharList();
                    if(Tokens[ParseCount].value[0] === "T_Quote"){
                        // fine
                        ParseCount++;
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
                if(Tokens[ParseCount].value[0] === "T_LParen") {
                    ParseCount++;
                    MECH_LL.Parser.parseExpr();
                    if(Tokens[ParseCount].value[0] === "T_BoolOP") {
                        ParseCount++;
                        MECH_LL.Parser.parseExpr();
                        if(Tokens[ParseCount].value[0] === "T_RParen") {
                            ParseCount++;
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
                if(!(Tokens[ParseCount].value[0] === "T_Char") &&
                    !(Tokens[ParseCount].value[0] === "T_Space")) {
                    // epsilon transition
                } else if(Tokens[ParseCount].value[0] === "T_Char") {
                    MECH_LL.Parser.parseChar();
                    MECH_LL.Parser.parseCharList();
                } else if(Tokens[ParseCount].value[0] === "T_Space") {
                    MECH_LL.Parser.parseSpace();
                    MECH_LL.Parser.parseCharList();
                }
            }
        }

        public static parseType(): void {
            if(ParseError){
                //Error State
            } else {
                if (Tokens[ParseCount].value[0] === "T_Type") {
                    ParseCount++;
                } else {
                    // raise exception and halt
                    MECH_LL.Parser.raiseExceptionAndHalt();
                }
            }
        }

        public static parseChar(): void {
            if(ParseError){
            } else {
                if (Tokens[ParseCount].value[0] === "T_Char") {
                    ParseCount++;
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
                if(Tokens[ParseCount].value[0] === "T_Space") {
                    ParseCount++;
                } else {
                    // raise exception and halt
                    MECH_LL.Parser.raiseExceptionAndHalt();
                }
            }
        }

        public static parseDigit(): void {
            if (ParseError) {
            } else {
                if (Tokens[ParseCount].value[0] === "T_Digit") {
                    ParseCount++;
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
                if (Tokens[ParseCount].value[0] === "T_Boolval") {
                    ParseCount++;
                } else {
                    // raise exception and halt
                    MECH_LL.Parser.raiseExceptionAndHalt();
                }
            }
        }

        public static raiseExceptionAndHalt(): void {
            ErrArea.value = ErrArea.value + "Unexpected token: " + Tokens[ParseCount].value[0] + "\n";
            ParseError = true;
        }
    }
}
