import {CGFobject} from '../lib/CGF.js';


export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [
            // Bottom
			-0.5, -0.5, 0.5,
             0.5, -0.5, 0.5,
             0.5, -0.5, -0.5,
            -0.5, -0.5, -0.5,
             // Top
            -0.5, 0.5, 0.5,
             0.5, 0.5, 0.5,
             0.5, 0.5, -0.5,
            -0.5, 0.5, -0.5,
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            // BOTTOM
            2, 1, 0,
            0, 3, 2,

            // FRONT SIDE
            0, 1, 5,
            5, 4, 0,

            // RIGHT SIDE
            1, 2, 6,
            6, 5, 1,

            // BACK SIDE
            2, 3, 7,
            7, 6, 2,

            // LEFT SIDE
            7, 3, 0,
            0, 4, 7,

            // TOP
            4, 5, 6,
            6, 7, 4,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
