// Global declarations for the compiler including the symbol table and error list
var ErrList = Array("");
// HTML area elements
var CodeArea;
var ErrArea;
var TreeArea;
var OutputArea;
// Visualization swap vars
var isCST = true;
var isSymbTbl = false;
// Token stream
var Tokens = Array();
// Syntax Trees
var CSyntaxTree;
var ASyntaxTree;
// Symbol table tree
var SymTable;
var ParseError = false;
var onDocumentLoad = function () {
    MECH_LL.Control.init();
};
