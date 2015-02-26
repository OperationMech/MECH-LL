// MECH-LL Compiler

module MECH_LL {
    export class Compiler{
        public static doLex(): void{
            var localCode = CodeArea.value;
            var curLine = 0;
            var curCol = 0;
            var locToken: Token;
            var i = 0;
            while(i < localCode.length) {

                if(localCode.match("{")) {
                    locToken = new Token(["T_LCBrace", "{"], curLine, localCode.match("{").index);
                    Tokens.push(locToken);
                }
                if(localCode.match("print|while|if")) {
                    locToken = new Token(["T_KeyWrd", localCode.match("print|while|if")], curLine,
                        localCode.match("print|while|if").index);
                    Tokens.push(locToken);
                }
                if(localCode.match("int|string|boolean")) {
                    locToken = new Token(["T_TypeDef", localCode.match("int|string|boolean")], curLine, curCol);
                    Tokens.push(locToken);
                }
                if(localCode.match("[0-9]")) {
                    locToken = new Token(["T_Digit", localCode.match("[0-9]")], curLine, curCol);
                    Tokens.push(locToken);
                }
                if(localCode.match("[a-z]")) {
                    locToken = new Token(["T_ID", localCode.match("[a-z]")], curLine, curCol);
                    Tokens.push(locToken);
                }
                if(localCode.match("\n")) {
                    curLine++;
                }
                i++;
                curCol++;
            }
            i = 0;
            var strTokens = "";
            while(i < Tokens.length) {
                strTokens += "[" + Tokens[i].value[0] +
                            "," + Tokens[i].value[1] +
                            "] ";
                i++;
            }
            OutputArea.value = "Lex found the following tokens: " + strTokens + "\n";



        }
    }
}