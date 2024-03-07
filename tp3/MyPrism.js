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

        const step = 2 * Math.PI / this.slices;
		let currentStackHeight = 0;

		const stackHeightDelta = 1 / this.stacks;
		while (currentStackHeight < 1) {
			for (let i = 0; i < this.slices; i++) {
				const vertex0 = [Math.cos(i * step), Math.sin(i * step), currentStackHeight];
				const vertex2 = [Math.cos((i + 1) * step), Math.sin((i + 1) * step), currentStackHeight + stackHeightDelta];
				const vertex1 = [Math.cos((i + 1) * step), Math.sin((i + 1) * step), currentStackHeight];
				const vertex3 = [Math.cos(i * step), Math.sin(i * step), currentStackHeight + stackHeightDelta];

				this.vertices.push(...vertex0, ...vertex1, ...vertex2, ...vertex3);
			}
			currentStackHeight += stackHeightDelta;
		}
		
		for (let i = 0; i < this.stacks; i++) {
			const offset = this.slices * 4 * i;
			for (let j = 0; j < this.slices * 4; j+=4) {
				this.indices.push(offset + j,   offset + j+1, offset + j+2);
				this.indices.push(offset + j+2, offset + j+3, offset + j);
			}
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

