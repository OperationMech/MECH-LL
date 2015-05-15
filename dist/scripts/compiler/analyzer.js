// semantic analyzer class
var MECH_LL;
(function (MECH_LL) {
    var Analyzer = (function () {
        function Analyzer() {
        }
        Analyzer.analyze = function (ASTN, depth, type, typeOut) {
            if (depth === void 0) { depth = 0; }
            if (type === void 0) { type = ""; }
            if (typeOut === void 0) { typeOut = null; }
            if (ContentError) {
            }
            else {
                var depthstr = "" + depth.toString(16);
                if (depth < 16) {
                    depthstr = "0" + depth.toString(16);
                }
                if (ASTN.value[0] === "VarDecl") {
                    SymTable.cur.value[ASTN.children[1].value[1].charCodeAt(0) - 96] = ASTN.children[0].value[1];
                }
                if (ASTN.value[0] === "IntExpr") {
                    if (ASTN.children[2] != null && ASTN.children.length > 1) {
                        MECH_LL.Analyzer.analyze(ASTN.children[1], depth);
                        if (ASTN.children[0].value[0] === "T_Digit") {
                            typeOut = "int";
                        }
                        else {
                            if (SymTable.cur.value[ASTN.children[2].value[1].charCodeAt(0) - 96] === "int") {
                                typeOut = "int";
                            }
                            var temp = SymTable.cur;
                            while (SymTable.cur.value[ASTN.children[2].value[1].charCodeAt(0) - 96] === undefined && SymTable.cur != SymTable.rt) {
                                temp = SymTable.cur;
                                if (SymTable.cur == SymTable.rt) {
                                    SymTable.cur = temp;
                                    MECH_LL.Analyzer.error(true, depth);
                                }
                                else if (SymTable.cur.value[ASTN.children[2].value[1].charCodeAt(0) - 96] === "int") {
                                    SymTable.cur = temp;
                                    typeOut = "int";
                                }
                            }
                        }
                    }
                    else {
                        if (ASTN.children[0].value[0] === "T_Digit") {
                            typeOut = "int";
                        }
                        else {
                            if (SymTable.cur.value[ASTN.children[2].value[1].charCodeAt(0) - 96] === "int") {
                                typeOut = "int";
                            }
                            var temp = SymTable.cur;
                            while (SymTable.cur.value[ASTN.children[2].value[1].charCodeAt(0) - 96] === undefined && SymTable.cur != SymTable.rt) {
                                temp = SymTable.cur;
                                if (SymTable.cur == SymTable.rt) {
                                    SymTable.cur = temp;
                                    MECH_LL.Analyzer.error(true, depth);
                                }
                                else if (SymTable.cur.value[ASTN.children[2].value[1].charCodeAt(0) - 96] === "int") {
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
                        }
                        else {
                            MECH_LL.Analyzer.error(true, depth);
                        }
                    }
                    else {
                        if (ASTN.children[0].value[0] === 'T_Boolval') {
                            typeOut = "boolean";
                        }
                        else {
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
                    if (ASTN.children[0].value[0] === "BooleanExpr" || ASTN.children[0].value[0] === "IntExpr") {
                        MECH_LL.Analyzer.analyze(ASTN.children[0], depth, temp3);
                    }
                    else {
                        if (SymTable.cur.value[ASTN.children[2].value[1].charCodeAt(0) - 96] != undefined) {
                            typeOut = "int";
                        }
                        else {
                            var temp = SymTable.cur;
                            var found = false;
                            while (!found || SymTable.cur.parent != null) {
                                SymTable.returnCurrentPtrToParent();
                                temp2 = SymTable.cur.value[ASTN.children[0].value[1].charCodeAt(0) - 96];
                                if (temp2 != undefined) {
                                    found = true;
                                }
                            }
                            if (found) {
                                typeOut = SymTable.cur.value[ASTN.children[0].value[1].charCodeAt(0) - 96];
                                SymTable.cur = temp;
                            }
                            else {
                                SymTable.cur = temp;
                                MECH_LL.Analyzer.error(true, depth);
                            }
                        }
                    }
                }
                if (ASTN.value[0] === "AssignStmt") {
                    var temp2 = SymTable.cur.value[ASTN.children[0].value[1].charCodeAt(0) - 96];
                    if (temp2 === undefined && SymTable.cur === SymTable.rt) {
                        MECH_LL.Analyzer.error(false, depth);
                        MECH_LL.Analyzer.analyze(ASTN.children[1], depth, temp2);
                    }
                    else {
                        var temp = SymTable.cur;
                        var found = false;
                        while (!found || SymTable.cur.parent != null) {
                            SymTable.returnCurrentPtrToParent();
                            temp2 = SymTable.cur.value[ASTN.children[0].value[1].charCodeAt(0) - 96];
                            if (temp2 != undefined) {
                                found = true;
                            }
                        }
                        if (found) {
                            typeOut = SymTable.cur.value[ASTN.children[0].value[1].charCodeAt(0) - 96];
                            SymTable.cur = temp;
                        }
                        else {
                            SymTable.cur = temp;
                            MECH_LL.Analyzer.error(true, depth);
                        }
                    }
                }
                if (ASTN.value[0] === "Block") {
                    SymTable.addNode(new MECH_LL.NODE(null, null, false, ["Scope" + depthstr]));
                    for (var i = 0; i < ASTN.children.length; i++) {
                        var typeD;
                        MECH_LL.Analyzer.analyze(ASTN.children[i], depth + 1, typeD);
                        typeOut = typeD;
                    }
                }
                else {
                    if (ASTN.children != null) {
                        for (var i = 0; i < ASTN.children.length; i++) {
                            MECH_LL.Analyzer.analyze(ASTN.children[i], depth);
                        }
                    }
                }
            }
        };
        Analyzer.error = function (isTypeError, depth) {
            ContentError = true;
            if (isTypeError) {
                ErrArea.value = ErrArea.value + "Type mismatch detected in Type Checking.";
            }
            else {
                var depthstr = "" + depth.toString(16);
                if (depth < 16) {
                    depthstr = "0" + depth.toString(16);
                }
                ErrArea.value = ErrArea.value + "Undeclared Identifier in Scope" + depthstr + ".";
            }
        };
        return Analyzer;
    })();
    MECH_LL.Analyzer = Analyzer;
})(MECH_LL || (MECH_LL = {}));
