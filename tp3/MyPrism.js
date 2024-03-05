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
        const alphaIncrement = 2 * Math.PI / this.slices;
        for (let i = 0; alpha < 2 * Math.PI; i+=3) {
            const vertex = [Math.cos(alpha), Math.sin(alpha)];
            this.vertices.push(...[vertex]);
            this.indices.push(i);
            alpha += alphaIncrement;
        }

        console.log(`indices: ${this.indices}`)

        // WHY NO WORK

        // draw prism top

		// this.vertices = [
		// 	-0.5, -0.5, 0,
		// 	 0.5, -0.5, 0,
		// 	 0.5,  0.5, 0,
		// 	-0.5,  0.5, 0,
		// ];

		// this.indices = [
		// 	0, 1, 2,
		// 	2, 3, 0,
		// ];

		this.primitiveType = this.scene.gl.LINE_LOOP;

		this.initGLBuffers();
	}
}

