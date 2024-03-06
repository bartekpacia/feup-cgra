import { CGFobject } from '../lib/CGF.js';

export class MyPrism extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
        this.slices = slices;
        this.stacks = stacks;
		this.initBuffers();
	}

	initBuffers() {
        this.vertices = [];
        this.indices = [];

        // draw prism bottom
        let alpha = 0;
        const step = 2 * Math.PI / this.slices;
		let currentStackHeight = 0;

		const stackHeightDelta = 1 / this.stacks;
		while (currentStackHeight < 1) {
			for (let i = 0; i < this.slices; i++) {
				const vertex0 = [Math.cos(i * step), Math.sin(i * step), currentStackHeight];
				const vertex1 = [Math.cos((i * step) + 1), Math.sin((i * step) + 1), currentStackHeight];
				const vertex2 = [Math.cos((i * step) + 1), Math.sin((i * step) + 1), currentStackHeight + stackHeightDelta];
				const vertex3 = [Math.cos(i * step), Math.sin(i * step), currentStackHeight + stackHeightDelta];

				this.vertices.push(...vertex0, ...vertex1, ...vertex2, ...vertex3);

				//console.log(`vertex ${i}: ${vertex}`)
				//this.vertices.push(...vertex);
				alpha += step;
			}
			currentStackHeight += stackHeightDelta;
		}

		let index = 0;
        for (let i = 0; i < this.stacks; i++ ){
            for (let j = 0; j < this.slices; j++){
                this.indices.push(index,j+2,j+3);
                this.indices.push(index,j+3,j+1);
                index += 4; 
            }
        }

		// this.normals = [
		// 	0, 0, 1,
		// 	0, 0, 1,
		// 	0, 0, 1,
		// 	0, 0, 1,
		// 	0, 0, 1,
		// ];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

