// Global declarations for the compiler including the symbol table and error list

var SymTable = Array();

var ErrList: String[] = Array("");

// HTML area elements
var CodeArea: HTMLTextAreaElement;
var ErrArea: HTMLTextAreaElement;
var TreeArea: HTMLTextAreaElement;
var OutputArea: HTMLTextAreaElement;

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