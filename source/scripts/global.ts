// Global declarations for the compiler including the symbol table and error list

var ErrList: String[] = Array("");

// HTML area elements
var CodeArea: HTMLTextAreaElement;
var ErrArea: HTMLTextAreaElement;
var TreeArea: HTMLTextAreaElement;
var OutputArea: HTMLTextAreaElement;

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


var onDocumentLoad = function () {
    MECH_LL.Control.init();
};