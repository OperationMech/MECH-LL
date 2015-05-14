// code generation engine class
var MECH_LL;
(function (MECH_LL) {
    var CodeEngine = (function () {
        function CodeEngine() {
        }
        CodeEngine.doCodeGen = function () {
            MECH_LL.CodeEngine.formCodeSection();
            MECH_LL.CodeEngine.formStaticsAndHeap();
            MECH_LL.CodeEngine.backpatch();
        };
        CodeEngine.formCodeSection = function () {
            var i = 0;
            while (i < 0x10) {
                var j = 0;
                var localList = [];
                while (j < 0x10) {
                    localList.push("00");
                    j++;
                }
                exeImage.push(localList);
                i++;
            }
            MECH_LL.CodeEngine.generateCodeFromTreeNode(ASyntaxTree.rt, SymTable.rt);
        };
        CodeEngine.generateCodeFromTreeNode = function (ASTN, ST, depth) {
            if (depth === void 0) { depth = 0; }
            if (ASTN.value[0] === "VarDecl") {
                if (ExecutableImageSize + 5 > 0xFF) {
                    ErrArea.value = ErrArea.value + "Execution Image too large.";
                }
                else {
                    var lowerBound = ExecutableImageSize % 16;
                    exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = "A9";
                    ExecutableImageSize = ExecutableImageSize + 2;
                    lowerBound = ExecutableImageSize % 16;
                    exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = "8D";
                    ExecutableImageSize = ExecutableImageSize + 1;
                    lowerBound = ExecutableImageSize % 16;
                    exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = "T" + (++BackpatchCount + depth).toString(16);
                    BackpatchTable[ASTN.children[1].value[1].charCodeAt(0) - 97][0] = "T" + (BackpatchCount + depth).toString(16);
                    ExecutableImageSize = ExecutableImageSize + 2;
                }
            }
            else if (ASTN.value[0] === "AssignStmt") {
                if (ExecutableImageSize + 5 > 0xFF) {
                    ErrArea.value = ErrArea.value + "Execution Image too large.";
                }
                else {
                    var lowerBound = ExecutableImageSize % 16;
                    exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = "A9";
                    MECH_LL.CodeEngine.generateCodeFromTreeNode(ASTN.children[1], ST);
                    lowerBound = ExecutableImageSize % 16;
                    exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = "8D";
                    ExecutableImageSize = ExecutableImageSize + 1;
                    lowerBound = ExecutableImageSize % 16;
                    exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = "T" + (BackpatchCount + depth).toString(16);
                    BackpatchTable[ASTN.children[0].value[1].charCodeAt(0) - 97][0] = "T" + (BackpatchCount + depth).toString(16);
                    ExecutableImageSize = ExecutableImageSize + 2;
                }
            }
            else if (ASTN.value[0] === "IntExpr") {
                if (ExecutableImageSize + 1 > 0xFF) {
                    ErrArea.value = ErrArea.value + "Execution Image too large.";
                }
                else {
                    if (ASTN.children.length < 2) {
                        ExecutableImageSize = ExecutableImageSize + 1;
                        var lowerBound = ExecutableImageSize % 16;
                        if (parseInt(ASTN.children[0].value[1], 16) < 16) {
                            exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = "0" + parseInt(ASTN.children[0].value[1]);
                        }
                        else {
                            exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = parseInt(ASTN.children[0].value[1]);
                        }
                        ExecutableImageSize = ExecutableImageSize + 1;
                    }
                }
            }
            else if (ASTN.value[0] === "StringExpr") {
            }
            else if (ASTN.value[0] === "BooleanExpr") {
                if (ExecutableImageSize + 1 > 0xFF) {
                    ErrArea.value = ErrArea.value + "Execution Image too large.";
                }
                else {
                    if (ASTN.children.length < 2) {
                        ExecutableImageSize = ExecutableImageSize + 1;
                        var lowerBound = ExecutableImageSize % 16;
                        if (ASTN.children[0].value[1] === "true") {
                            exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = "01";
                        }
                        else {
                            exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = "00";
                        }
                    }
                    else {
                    }
                }
            }
            else if (ASTN.value[0] === "IfStmt") {
            }
            else if (ASTN.value[0] === "WhileStmt") {
            }
            else if (ASTN.value[0] === "PrintStmt") {
                if (ASTN.children[0].value[0] === "IntExpr") {
                }
                else if (ASTN.children[0].value[0] === "BoolExpr") {
                }
                else if (ASTN.children[0].value[0] === "StringExpr") {
                }
                else {
                    if (ST.value[ASTN.children[0].value[1].charCodeAt(0) - 96] === "int") {
                        var lowerBound = ExecutableImageSize % 16;
                        exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = "A2";
                        ExecutableImageSize = ExecutableImageSize + 1;
                        lowerBound = ExecutableImageSize % 16;
                        exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = "01";
                        ExecutableImageSize = ExecutableImageSize + 1;
                        lowerBound = ExecutableImageSize % 16;
                        exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = "AC";
                        ExecutableImageSize = ExecutableImageSize + 1;
                        lowerBound = ExecutableImageSize % 16;
                        exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = "T" + (BackpatchCount + depth).toString(16);
                        ExecutableImageSize = ExecutableImageSize + 2;
                    }
                }
            }
            else if (ASTN.value[0] === "Block" && ST != SymTable.rt) {
                ST.children[0] = ST;
                depth = depth + 1;
            }
            else {
                for (var i = 0; i < ASTN.children.length; i++) {
                    MECH_LL.CodeEngine.generateCodeFromTreeNode(ASTN.children[i], ST, depth);
                }
            }
        };
        CodeEngine.formStaticsAndHeap = function () {
            for (var i = 0; i < 26; i++) {
                if (BackpatchTable[i][0] != null) {
                    BackpatchTable[i][1] = ExecutableImageSize.toString(16);
                    ExecutableImageSize = ExecutableImageSize + 1;
                }
                i++;
            }
        };
        CodeEngine.backpatch = function () {
            for (var i = 0; i < 26; i++) {
                var j = 0;
                while (j < 0xFF) {
                    if (BackpatchTable[i][0] === exeImage[Math.floor(j / 16)][j % 16]) {
                        if (parseInt(BackpatchTable[i][1], 16) < 16) {
                            exeImage[Math.floor(j / 16)][j] = "0" + BackpatchTable[i][1];
                        }
                        else {
                            exeImage[Math.floor(j / 16)][j] = BackpatchTable[i][1];
                        }
                    }
                    j++;
                }
                i++;
            }
        };
        return CodeEngine;
    })();
    MECH_LL.CodeEngine = CodeEngine;
})(MECH_LL || (MECH_LL = {}));
