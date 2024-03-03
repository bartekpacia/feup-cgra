import { CGFobject } from '../lib/CGF.js';

export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}

    // /// Returns 4 vertices starting at start along plane
    // makeSide(start, size, plane) {
    //     side = [start];

    //     for (let i = 0; i < 3; i++) {
    //         newVertex = [
    //             start[]
    //         ];

    //         side.push(...newVertex);
    //     }

    //     return side;
    // }

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
            // RIGHT (7-11)
             0.5, -0.5,  0.5,
             0.5, -0.5, -0.5,
             0.5,  0.5, -0.5,
             0.5,  0.5,  0.5,
            // TOP (12-15)
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

            // // RIGHT SIDE
            // 1, 2, 6,
            // 6, 5, 1,

            // // BACK SIDE
            // 2, 3, 7,
            // 7, 6, 2,

            // // LEFT SIDE
            // 7, 3, 0,
            // 0, 4, 7,

            // // TOP
            // 4, 5, 6,
            // 6, 7, 4,
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
        ];

	    this.primitiveType = this.scene.gl.TRIANGLES;

	    this.initGLBuffers();
	}
}
