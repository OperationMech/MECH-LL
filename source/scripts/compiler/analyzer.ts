// semantic analyzer class
module MECH_LL {
    export class Analyzer {
        public static analyze(ASTN:NODE, depth:number = 0, type:string = "", typeOut?):void {
            if (ContentError) {
            } else {
                var depthstr = "" + depth.toString(16);
                if (depth < 16) {
                    depthstr = "0" + depth.toString(16);
                }
                if (ASTN.value[0] === "Block") {
                    SymTable.addNode(new NODE(null, null, false, ["Scope" + depthstr]));
                }
                if (ASTN.value[0] === "VarDecl") {
                    SymTable.cur.value[ASTN.children[1].value[1].charCodeAt(0) - 96] = ASTN.children[0].value[1];
                }
                if (ASTN.value[0] === "IntExpr") {
                    if (ASTN.children[2] != null && ASTN.children.length > 1) {
                        MECH_LL.Analyzer.analyze(ASTN.children[1], depth);
                        if (ASTN.children[0].value[0] === "T_Digit") {
                            typeOut = "int";
                        } else {
                            if (SymTable.cur.value[ASTN.children[2].value[1].charCodeAt(0) - 96] === "int") {
                                typeOut = "int";
                            }
                            var temp:NODE = SymTable.cur;
                            while (SymTable.cur.value[ASTN.children[2].value[1].charCodeAt(0) - 96] === null && SymTable.cur != SymTable.rt) {
                                temp = SymTable.cur;
                                if (SymTable.cur == SymTable.rt) {
                                    SymTable.cur = temp;
                                    MECH_LL.Analyzer.error(true, depth);
                                } else if (SymTable.cur.value[ASTN.children[2].value[1].charCodeAt(0) - 96] === "int") {
                                    SymTable.cur = temp;
                                    typeOut = "int";
                                }
                            }
                        }
                    } else {
                        if (ASTN.children[0].value[0] === "T_Digit") {
                            typeOut = "int";
                        } else {
                            if (SymTable.cur.value[ASTN.children[2].value[1].charCodeAt(0) - 96] === "int") {
                                typeOut = "int";
                            }
                            var temp:NODE = SymTable.cur;
                            while (SymTable.cur.value[ASTN.children[2].value[1].charCodeAt(0) - 96] === null && SymTable.cur != SymTable.rt) {
                                temp = SymTable.cur;
                                if (SymTable.cur == SymTable.rt) {
                                    SymTable.cur = temp;
                                    MECH_LL.Analyzer.error(true, depth);
                                } else if (SymTable.cur.value[ASTN.children[2].value[1].charCodeAt(0) - 96] === "int") {
                                    SymTable.cur = temp;
                                    typeOut = "int";
                                }
                            }
                        }
                    }

                }
                if (ASTN.value[0] === "BooleanExpr") {
                    if (ASTN.children.length > 1) {
                        var type1;
                        var type2;
                        MECH_LL.Analyzer.analyze(ASTN.children[0], depth, "", type1);
                        MECH_LL.Analyzer.analyze(ASTN.children[2], depth, "", type2);
                        if (type1 === type && type2 === type) {
                            typeOut = 'boolean';
                        } else {
                            MECH_LL.Analyzer.error(true, depth);
                        }
                    } else {
                        if (ASTN.children[0].value[0] === 'T_Boolval') {
                            typeOut = "boolean"
                        } else {
                            MECH_LL.Analyzer.error(true, depth);
                        }
                    }
                }
                if (ASTN.value[0] === "IfStmt") {
                    var temp3 = "";
                    MECH_LL.Analyzer.analyze(ASTN.children[0], depth, temp3);
                }
                if (ASTN.value[0] === "While") {
                    var temp3 = "";
                    MECH_LL.Analyzer.analyze(ASTN.children[0], depth, temp3);
                }
                if (ASTN.value[0] === "PrintStmt") {
                    var temp3 = "";
                    if(ASTN.children[0].value[0] === "BooleanExpr" || ASTN.children[0].value[0] === "IntExpr"){
                        MECH_LL.Analyzer.analyze(ASTN.children[0], depth, temp3);
                    } else {
                        if (SymTable.cur.value[ASTN.children[2].value[1].charCodeAt(0) - 96] != null) {
                            typeOut = "int";
                        } else {
                            var temp:NODE = SymTable.cur;
                            while (SymTable.cur.value[ASTN.children[2].value[1].charCodeAt(0) - 96] === null && SymTable.cur != SymTable.rt) {
                                temp = SymTable.cur;
                                if (SymTable.cur == SymTable.rt) {
                                    SymTable.cur = temp;
                                    MECH_LL.Analyzer.error(true, depth);
                                } else if (SymTable.cur.value[ASTN.children[2].value[1].charCodeAt(0) - 96] != null) {
                                    SymTable.cur = temp;
                                }
                            }
                        }
                    }
                }
                if (ASTN.value[0] === "AssignStmt") {
                    var temp2 = SymTable.cur.value[ASTN.children[0].value[1].charCodeAt(0) - 96];
                    if (temp2 != null) {
                        MECH_LL.Analyzer.analyze(ASTN.children[1], depth, temp2);
                    } else {
                        MECH_LL.Analyzer.error(false, depth);
                    }
                }
                if (ASTN.children != null) {
                    for (var i = 0; i < ASTN.children.length; i++) {
                        MECH_LL.Analyzer.analyze(ASTN.children[i], depth + 1);
                    }
                }
            }
         }

        public static error(isTypeError:boolean, depth:number): void {
            ContentError = true;
            if(isTypeError){
                ErrArea.value = ErrArea.value + "Type mismatch detected in Type Checking."
            } else {
                var depthstr = "" + depth.toString(16);
                if(depth < 16) {
                    depthstr = "0" + depth.toString(16);
                }
                ErrArea.value = ErrArea.value + "Undeclared Identifier in Scope" + depthstr + ".";
            }
        }
    }
}
