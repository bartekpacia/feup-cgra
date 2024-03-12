import { CGFobject, CGFcamera } from '../lib/CGF.js';

export class MyCylinder extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
        this.slices = slices;
        this.stacks = stacks;
		this.initBuffers();
	}

	initBuffers() {
        this.vertices = [];
        this.indices = [];
		// this.normals = [];

        const step = 2 * Math.PI / this.slices; // ɑ, the degrees increment
		let currentStackHeight = 0;
		const stackHeightDelta = 1 / this.stacks;
		for (let i = 0; i < this.stacks + 1; i++) {
			for (let j = 0; j < this.slices; j++) {
				const vertex = [Math.cos(j * step), Math.sin(j * step), stackHeightDelta * i];
				this.vertices.push(...vertex);
			}

			currentStackHeight += stackHeightDelta;
		}

		for (let i = 0; i < this.stacks; i++) {
            // Offset from indices of vertices in the first stack
			const offset = this.slices * i;
			for (let j = 0; j < this.slices; j++) {
                const triangle0 = [offset + j,     offset + j+1, offset + j + this.slices];
				this.indices.push(...triangle0);
                
                const triangle1 = [offset + j + 1, offset + j + this.slices + 1, offset + j + this.slices];
                console.log(`face ${i * offset + j}: ${triangle0} and ${triangle1}`);
                if (i == this.stacks - 1 && j == this.slices - 1) {
                    continue
                }
				this.indices.push(...triangle1);
			}
		}

        // this.indices.push(1, 7, 6);
        // this.indices.push(2, 8, 7);
        // this.indices.push(8, 13, 12);

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

