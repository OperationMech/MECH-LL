// Token class
// Declares the token class and adds internal structure.

module MECH_LL {
    export class Token {
        constructor (public value = Array(),
                     public lineNum = 0,
                     public colNum = 0
        ) {}
    }
}
