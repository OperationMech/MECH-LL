// code generation engine class
module MECH_LL {
    export class CodeEngine {

        public static doCodeGen(): void {
            MECH_LL.CodeEngine.formCodeSection();
            MECH_LL.CodeEngine.formStaticsAndHeap();
            MECH_LL.CodeEngine.backpatch();
        }

        public static formCodeSection():void {
            var i = 0;
            while(i < 0x10 ) {
                var j = 0;
                var localList = [];
                while (j < 0x10){
                    localList.push("00");
                    j++;
                }
                exeImage.push(localList);
                i++;
            }
            MECH_LL.CodeEngine.generateCodeFromTreeNode(ASyntaxTree.rt,SymTable.rt);

        }

        public static generateCodeFromTreeNode(ASTN:NODE, ST:NODE, depth = 0):void {
            if(CodeError){
                // exit
            } else {
                if (ASTN.value[0] === "VarDecl") {
                    if (ExecutableImageSize + 5 > ExecutableLength) {
                        ErrArea.value = ErrArea.value + "Execution Image too large.";
                        CodeError = true;
                    } else {
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
                } else if (ASTN.value[0] === "AssignStmt") {
                    if (ExecutableImageSize + 5 > ExecutableLength) {
                        ErrArea.value = ErrArea.value + "Execution Image too large.";
                        CodeError = true;
                    } else {
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
                } else if (ASTN.value[0] === "IntExpr") {
                    if (ExecutableImageSize + 1 > ExecutableLength) {
                        ErrArea.value = ErrArea.value + "Execution Image too large.";
                        CodeError = true;
                    } else {
                        if (ASTN.children.length < 2) {
                            ExecutableImageSize = ExecutableImageSize + 1;
                            var lowerBound = ExecutableImageSize % 16;
                            if (parseInt(ASTN.children[0].value[1], 16) < 16) {
                                exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = "0" + parseInt(ASTN.children[0].value[1], 16);
                            } else {
                                exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = parseInt(ASTN.children[0].value[1], 16);
                            }
                            ExecutableImageSize = ExecutableImageSize + 1;
                        }
                    }

                } else if (ASTN.value[0] === "StringExpr") {
                    if (ASTN.children.length > ExecutableLength) {
                        ErrArea.value = ErrArea.value + "Execution Image too large.";
                        CodeError = true;
                    } else {
                        HeapSize = ASTN.children.length + 1;
                        for (var i = ASTN.children.length; i > -1; i--) {
                            if (i === ASTN.children.length) {
                                exeImage[Math.floor(ExecutableLength / 16)][ExecutableLength % 16] = "00";
                            } else {
                                exeImage[Math.floor(ExecutableLength / 16)][ExecutableLength % 16] = ASTN.children[i].value[1].charCodeAt(0).toString(16);
                            }
                            ExecutableLength--;
                        }
                        ExecutableImageSize = ExecutableImageSize + 1;
                        var lowerBound = ExecutableImageSize % 16;
                        exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = (ExecutableLength+1).toString(16);
                        ExecutableImageSize = ExecutableImageSize + 1;

                    }


                } else if (ASTN.value[0] === "BooleanExpr") {
                    if (ExecutableImageSize + 1 > ExecutableLength) {
                        ErrArea.value = ErrArea.value + "Execution Image too large.";
                        CodeError = true;
                    } else {
                        if (ASTN.children.length < 2) {
                            ExecutableImageSize = ExecutableImageSize + 1;
                            var lowerBound = ExecutableImageSize % 16;
                            if (ASTN.children[0].value[1] === "true") {
                                exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = "01";
                            } else {
                                exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = "00";
                            }
                        } else {
                        }
                    }

                } else if (ASTN.value[0] === "IfStmt") {
                    MECH_LL.CodeEngine.generateCodeFromTreeNode(ASTN.children[0], ST, depth);
                    MECH_LL.CodeEngine.generateCodeFromTreeNode(ASTN.children[1], ST, depth);

                } else if (ASTN.value[0] === "WhileStmt") {
                    MECH_LL.CodeEngine.generateCodeFromTreeNode(ASTN.children[0], ST, depth);
                    MECH_LL.CodeEngine.generateCodeFromTreeNode(ASTN.children[1], ST, depth);

                } else if (ASTN.value[0] === "PrintStmt") {
                    if (ASTN.children[0].value[0] === "IntExpr") {
                        var lowerBound = ExecutableImageSize % 16;
                        exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = "A2";
                        ExecutableImageSize = ExecutableImageSize + 1;
                        lowerBound = ExecutableImageSize % 16;
                        exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = "01";
                        ExecutableImageSize = ExecutableImageSize + 1;
                        lowerBound = ExecutableImageSize % 16;
                        exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = "A0";
                        MECH_LL.CodeEngine.generateCodeFromTreeNode(ASTN.children[0], ST, depth);
                        lowerBound = ExecutableImageSize % 16;
                        exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = "FF";
                        ExecutableImageSize = ExecutableImageSize + 1;

                    } else if (ASTN.children[0].value[0] === "BoolExpr") {
                        var lowerBound = ExecutableImageSize % 16;
                        exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = "A2";
                        ExecutableImageSize = ExecutableImageSize + 1;
                        lowerBound = ExecutableImageSize % 16;
                        exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = "02";
                        ExecutableImageSize = ExecutableImageSize + 1;
                        lowerBound = ExecutableImageSize % 16;
                        exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = "AC";
                        ExecutableImageSize = ExecutableImageSize + 1;
                        lowerBound = ExecutableImageSize % 16;
                        exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = "B" + (BackpatchCount + depth).toString(16);
                        ExecutableImageSize = ExecutableImageSize + 2;

                    } else if (ASTN.children[0].value[0] === "StringExpr") {
                        var lowerBound = ExecutableImageSize % 16;
                        exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = "A2";
                        ExecutableImageSize = ExecutableImageSize + 1;
                        lowerBound = ExecutableImageSize % 16;
                        exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = "02";
                        ExecutableImageSize = ExecutableImageSize + 1;
                        lowerBound = ExecutableImageSize % 16;
                        exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = "AC";
                        ExecutableImageSize = ExecutableImageSize + 1;
                        lowerBound = ExecutableImageSize % 16;
                        exeImage[Math.floor(ExecutableImageSize / 16)][lowerBound] = "S" + (BackpatchCount + depth).toString(16);
                        ExecutableImageSize = ExecutableImageSize + 2;

                    } else {
                        if (ASTN.children[0].value[1].charCodeAt(0) - 96 > 0 &&  ASTN.children[0].value[1].charCodeAt(0) - 96 < 27) {
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
                } else if (ASTN.value[0] === "Block" && ST != SymTable.rt) {
                    ST.children[0] = ST;
                    depth = depth + 1;
                    for (var i = 0; i < ASTN.children.length; i++) {
                        MECH_LL.CodeEngine.generateCodeFromTreeNode(ASTN.children[i], ST, depth)
                    }
                } else {
                    for (var i = 0; i < ASTN.children.length; i++) {
                        MECH_LL.CodeEngine.generateCodeFromTreeNode(ASTN.children[i], ST, depth)
                    }
                }
            }
        }

        public static formStaticsAndHeap(): void {
            for(var i =0; i < 26; i++){
                if(BackpatchTable[i][0] != null) {
                    BackpatchTable[i][1] = ExecutableImageSize.toString(16);
                    ExecutableImageSize = ExecutableImageSize+1;
                }
                i++;
            }
        }

        public static backpatch(): void {
            for(var i = 0; i < 26; i++){
                var j = 0;
                while(j < 0xFF){
                    if(BackpatchTable[i][0] === exeImage[Math.floor(j/16)][j%16]){
                        if(parseInt(BackpatchTable[i][1],16) < 16){
                            exeImage[Math.floor(j/16)][j] = "0" + BackpatchTable[i][1];
                        } else {
                            exeImage[Math.floor(j/16)][j] =  BackpatchTable[i][1];
                        }
                    }
                    j++;
                }
                i++;
            }
        }
    }
}
