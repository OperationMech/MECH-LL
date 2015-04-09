// Tree class and node class
// Declares the tree definition and simple node

module MECH_LL {
    export class Tree {
        constructor (public root:NODE){}

        public static addNode(nodeIn:NODE): void {
            if(root!= null){
                root.children[head.children.length] = nodeIn;
            } else {
                root = nodeIn;
            }
        }

    }

    export class NODE {
        constructor (
            public parent:NODE = null,
            public children:NODE[] = null,
            public isLeaf:bool = false,
            public value:any = []
            ) {}
    }
}
