// Tree class and node class
// Declares the tree definition and simple node

module MECH_LL {

    export class NODE {
        constructor (
            public parent:NODE = null,
            public children:NODE[] = [],
            public isLeaf:boolean = false,
            public value:any = []
            ) {}
    }

    export class Tree {

        public rt:NODE;
        public cur:NODE;
        constructor () {
            this.rt = null;
            this.cur = null;
        }

        public addNode(nodeIn:NODE): void {
            if(this.rt == null) {
                this.rt = this.cur = nodeIn;
            } else if(this.cur.children == null) {
                nodeIn.parent = this.cur;
                this.cur.children = [nodeIn];
                this.cur = nodeIn;
                if(nodeIn.isLeaf) {
                    this.cur = nodeIn.parent; // Reset parent if leaf node
                }

            } else {
                nodeIn.parent = this.cur;
                this.cur.children.push(nodeIn);
                this.cur = nodeIn;
                if(nodeIn.isLeaf) {
                    this.cur = nodeIn.parent; // Reset parent if leaf node
                }
            }
        }

        public returnCurrentPtrToParent(): void {
            if(this.cur.parent == null ){
                // fall off tree prevention
                this.cur = this.rt;
            } else {
                this.cur = this.cur.parent;
            }
        }

        public printTreeNode(nodeIn:NODE, depth:number = 0): string {
            var recurse: string = "";
            for(var i = 0; i < depth; i++) {
                recurse = recurse + " ";
            }
            if(nodeIn != null){
                recurse = recurse + nodeIn.value[0] + "\n";
                if(nodeIn.isLeaf === true){
                } else if(nodeIn.children === null) {
                    for(var i = 0; i < depth+1; i++) {
                        recurse = recurse + " ";
                    }
                    recurse = recurse + "epsilon" + "\n";
                } else {
                    for(var j = 0; j < nodeIn.children.length; j++){
                        recurse = recurse + this.printTreeNode(nodeIn.children[j], depth+1);
                    }
                }
            } else {
            }
            return recurse;
        }
    }
}
