// Token class
// Declares the token class and adds internal structure.
var MECH_LL;
(function (MECH_LL) {
    var Token = (function () {
        function Token(value, lineNum, colNum) {
            if (value === void 0) { value = Array(); }
            if (lineNum === void 0) { lineNum = 0; }
            if (colNum === void 0) { colNum = 0; }
            this.value = value;
            this.lineNum = lineNum;
            this.colNum = colNum;
        }
        return Token;
    })();
    MECH_LL.Token = Token;
})(MECH_LL || (MECH_LL = {}));
