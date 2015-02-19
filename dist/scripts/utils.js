// Utility function handlers for tree structure output and such
var MECH_LL;
(function (MECH_LL) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.printTree = function () {
            if (isCST) {
                return MECH_LL.Utils.printCST();
            }
            else {
                return MECH_LL.Utils.printAST();
            }
        };
        Utils.printCST = function () {
            var outStr = "";
            return outStr;
        };
        Utils.printAST = function () {
            var outStr = "";
            return outStr;
        };
        return Utils;
    })();
    MECH_LL.Utils = Utils;
})(MECH_LL || (MECH_LL = {}));
