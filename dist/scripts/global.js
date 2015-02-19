// Global declarations for the compiler including the symbol table and error list
var SymTable = Array();
var ErrList = Array("");
// HTML area elements
var CodeArea;
var ErrArea;
var TreeArea;
var OutputArea;
// Tree output swap var
var isCST = true;
// Token stream
var Tokens = Array();
// Syntax Trees
var CSyntaxTree;
var ASyntaxTree;
var onDocumentLoad = function () {
    MECH_LL.Control.init();
};
