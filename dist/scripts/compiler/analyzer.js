// semantic analyzer class
var MECH_LL;
(function (MECH_LL) {
    var Analyzer = (function () {
        function Analyzer() {
        }
        Analyzer.analyze = function (ASTN, depth) {
            if (depth === void 0) { depth = 0; }
            var depthstr = "" + depth.toString(16);
            if (depth < 16) {
                depthstr = "0" + depth.toString(16);
            }
            if (ASTN.value[0] === "Block") {
                SymTable.addNode(new MECH_LL.NODE(null, null, false, ["Scope" + depthstr]));
            }
            if (ASTN.children != null) {
                for (var i = 0; i < ASTN.children.length; i++) {
                    MECH_LL.Analyzer.analyze(ASTN.children[i], depth + 1);
                }
            }
        };
        return Analyzer;
    })();
    MECH_LL.Analyzer = Analyzer;
})(MECH_LL || (MECH_LL = {}));
