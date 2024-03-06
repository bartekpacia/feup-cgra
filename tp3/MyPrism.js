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
        for (let i = 0; i < this.slices; i++) {
            const vertex = [Math.cos(alpha), Math.sin(alpha), 0];
			console.log(`vertex ${i}: ${vertex}`)
            this.vertices.push(...vertex);
            alpha += step;
        }

		this.indices = [
			0, 1, 2,
			0, 2, 3,
			0, 3, 4,
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

