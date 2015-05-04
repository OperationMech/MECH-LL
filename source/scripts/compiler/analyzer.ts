// semantic analyzer class
module MECH_LL {
    export class Analyzer {
        public static analyze(ASTN:NODE, depth:number = 0):void {
            var depthstr = "" + depth.toString(16);
            if(depth < 16) {
                depthstr = "0"+depth.toString(16);
            }
            if(ASTN.value[0] === "Block") {
                SymTable.addNode(new NODE(null, null, false, ["Scope" + depthstr]));
            }
            if(ASTN.children != null) {
                for (var i = 0; i < ASTN.children.length; i++) {
                    MECH_LL.Analyzer.analyze(ASTN.children[i], depth - 1 + i);
                }
                SymTable.returnCurrentPtrToParent();
            }
        }
    }
}
