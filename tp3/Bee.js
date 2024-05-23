import { CGFobject } from '../lib/CGF.js';

// This is MyUnitCube .
export class Bee extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}

	initBuffers() {
	    this.vertices = [
            // BOTTOM (0-3)
            -0.5, -0.5,  0.5,
             0.5, -0.5,  0.5,
             0.5, -0.5, -0.5,
            -0.5, -0.5, -0.5,
            // FRONT (4-7)
            -0.5, -0.5, 0.5,
             0.5, -0.5, 0.5,
             0.5,  0.5, 0.5,
            -0.5,  0.5, 0.5,
            // RIGHT (8-11)
             0.5, -0.5,  0.5,
             0.5, -0.5, -0.5,
             0.5,  0.5, -0.5,
             0.5,  0.5,  0.5,
            // BACK (12-15)
             0.5, -0.5, -0.5,
            -0.5, -0.5, -0.5,
            -0.5,  0.5, -0.5,
             0.5,  0.5, -0.5,
            // LEFT (16-19)
            -0.5, -0.5, -0.5,
            -0.5, -0.5,  0.5,
            -0.5,  0.5,  0.5,
            -0.5,  0.5, -0.5,
            // TOP (20-23)
            -0.5,  0.5,  0.5,
             0.5,  0.5,  0.5,
             0.5,  0.5, -0.5,
            -0.5,  0.5, -0.5,
        ];

	    this.indices = [
            // BOTTOM
            2, 1, 0,
            0, 3, 2,

            // FRONT SIDE
            4, 5, 6,
            6, 7, 4,

            // RIGHT SIDE
            8, 9, 10,
            10, 11, 8,

            // BACK
            12, 13, 14,
            14, 15, 12,

            // LEFT SIDE
            16, 17, 18,
            18, 19, 16,

            // TOP
            20, 21, 22,
            22, 23, 20,
	    ];


        this.normals = [
            // BOTTOM
             0, -1,  0,
             0, -1,  0,
             0, -1,  0,
             0, -1,  0,
            // FRONT
             0,  0,  1,
             0,  0,  1,
             0,  0,  1,
             0,  0,  1,
            // RIGHT
             1,  0,  0,
             1,  0,  0,
             1,  0,  0,
             1,  0,  0,
            // BACK
             0,  0,  -1,
             0,  0,  -1,
             0,  0,  -1,
             0,  0,  -1,
            // LEFT
            -1,  0,  0,
            -1,  0,  0,
            -1,  0,  0,
            -1,  0,  0,
            // TOP
             0,  1,  0,
             0,  1,  0,
             0,  1,  0,
             0,  1,  0,
        ];


	    this.primitiveType = this.scene.gl.TRIANGLES;
	    this.initGLBuffers();
	}
}
