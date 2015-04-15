// MECH-LL Compiler Parse

module MECH_LL {
    export class Parser {

        public static count = 0;
        public static doParseCode(): void {
            MECH_LL.Parser.parseProgram();
        }

        public static parseProgram(): void{
            MECH_LL.Parser.parseBlock();
            if(Tokens[MECH_LL.Parser.count].value[0] === "$") {
                // code closed
            } else {
                // raise exception halt compilation
            }

        }

        public static parseBlock(): void {
            if(Tokens[MECH_LL.Parser.count].value[0] === "T_LCBrace"){
                MECH_LL.Parser.count++;
                MECH_LL.Parser.parseStatementList();
                if(Tokens[MECH_LL.Parser.count].value[0] === "T_RCBrace"){
                    // code good
                    MECH_LL.Parser.count++;
                } else {
                    // raise exception halt compilation
                }
            } else {
                // raise exception halt compilation
            }

        }

        public static parseStatementList(): void {
            if(Tokens[MECH_LL.Parser.count].value[0] === "T_RCBrace") {
                // epsilon transition
            } else {
                MECH_LL.Parser.parseStatement();
                MECH_LL.Parser.parseStatementList();
            }
        }

        public static parseStatement(): void {
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
            } else {
                MECH_LL.Parser.parseBlock();
            }
        }

        public static parsePrintStatement(): void {
            MECH_LL.Parser.count++;
            if(Tokens[MECH_LL.Parser.count].value[0] === "T_LParen"){
                MECH_LL.Parser.count++;
                MECH_LL.Parser.parseExpr();
                if(Tokens[MECH_LL.Parser.count].value[0] === "T_RParen"){
                    MECH_LL.Parser.count++;
                } else {
                    // raise exception and halt
                }
            } else {
                // raise exception and halt
            }
        }

        public static parseAssignmentStatement(): void {
            MECH_LL.Parser.parseId();
            if(Tokens[MECH_LL.Parser.count].value[0] === "T_AssignOP") {
                MECH_LL.Parser.count++;
                MECH_LL.Parser.parseExpr();
            } else {
                // raise exception and halt
            }
        }

        public static parseVarDecl(): void {
            MECH_LL.Parser.parseType();
            MECH_LL.Parser.parseId();
        }

        public static parseWhileStatement(): void {
            if(Tokens[MECH_LL.Parser.count].value[0] === "T_Kwdwhile") {
                MECH_LL.Parser.count++;
                MECH_LL.Parser.parseBooleanExpr();
                MECH_LL.Parser.parseBlock();
            } else {
                // raise exception and halt
            }
        }

        public static parseIfStatement(): void {
            if(Tokens[MECH_LL.Parser.count].value[0] === "T_Kwdif"){
                MECH_LL.Parser.count++;
                MECH_LL.Parser.parseBooleanExpr();
                MECH_LL.Parser.parseBlock();
            }
        }

        public static parseExpr(): void {
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

        public static parseIntExpr(): void {
            MECH_LL.Parser.parseDigit();
            if(Tokens[MECH_LL.Parser.count].value[0] === "T_IntOP") {
                MECH_LL.Parser.count++;
                MECH_LL.Parser.parseExpr();
            } else {
                // only is a digit
            }
        }

        public static parseStringExpr(): void {
            if(Tokens[MECH_LL.Parser.count].value[0] === "T_Quote"){
                MECH_LL.Parser.count++;
                MECH_LL.Parser.parseCharList();
                if(Tokens[MECH_LL.Parser.count].value[0] === "T_Quote"){
                    // fine
                    MECH_LL.Parser.count++;
                } else {
                    // raise exception and halt
                }
            } else {
                // raise exception and halt
            }
        }

        public static parseBooleanExpr(): void {
            if(Tokens[MECH_LL.Parser.count].value[0] === "T_LParen") {
                MECH_LL.Parser.count++;
                MECH_LL.Parser.parseExpr();
                if(Tokens[MECH_LL.Parser.count].value[0] === "T_BoolOP") {
                    MECH_LL.Parser.count++;
                    MECH_LL.Parser.parseExpr();
                } else {
                    // raise exception and halt
                }
            } else {
                MECH_LL.Parser.parseBoolval();
            }
        }

        public static parseId(): void {
            MECH_LL.Parser.parseChar();
        }

        public static parseCharList(): void {
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

        public static parseType(): void {
            if(Tokens[MECH_LL.Parser.count].value[0] === "T_Type") {
                MECH_LL.Parser.count++;
            } else {
                // raise exception and halt
            }
        }

        public static parseChar(): void {
            if(Tokens[MECH_LL.Parser.count].value[0] === "T_Char") {
                MECH_LL.Parser.count++;
            } else {
                // raise exception and halt
            }
        }

        public static parseSpace(): void {
            if(Tokens[MECH_LL.Parser.count].value[0] === "T_Space") {
                MECH_LL.Parser.count++;
            } else {
                // raise exception and halt
            }
        }

        public static parseDigit(): void {
            if(Tokens[MECH_LL.Parser.count].value[0] === "T_Digit") {
                MECH_LL.Parser.count++;
            } else {
                // raise exception and halt
            }
        }

        public static parseBoolval(): void {
            if(Tokens[MECH_LL.Parser.count].value[0] === "T_Boolval") {
                MECH_LL.Parser.count++;
            } else {
                // raise exception and halt
            }
        }
    }
}
