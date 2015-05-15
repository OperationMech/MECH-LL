// Global declarations for the compiler including the symbol table and error list

var ErrList: String[] = Array();

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
var CSyntaxTree:MECH_LL.Tree;
var ASyntaxTree:MECH_LL.Tree;

// Symbol table tree
var SymTable:MECH_LL.Tree;

// Error has been caught
var ParseError = false;
var ContentError = false;
var CodeError = false;

var ParseCount = 0;
var ParseCountCST = 0;

var ExecutableImageSize=0;
var ExecutableLength = 0xFF;
var HeapSize = 0;

var BackpatchTable = [[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,]];
var BackpatchCount = 0;
var jumpTable;

var exeImage = [];

var onDocumentLoad = function () {
    MECH_LL.Control.init();
};