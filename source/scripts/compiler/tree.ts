// Tree class and node class
// Declares the tree definition and simple node

module MECH_LL {

    export class NODE {
        constructor (
            public parent:NODE = null,
            public children:NODE[] = null,
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
            } else {
                nodeIn.parent = this.cur;
                this.cur.children.push(nodeIn);
                this.cur = nodeIn;
                if(nodeIn.isLeaf) {
                    this.cur = nodeIn.parent; // Reset parent if leaf node
                }

            }
        }
    }


}
