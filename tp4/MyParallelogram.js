import { CGFobject } from '../lib/CGF.js';

export class MyParallelogram extends CGFobject {
	constructor(scene, texCoords) {
		super(scene);
		this.texCoords = texCoords;
		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [
			 0,  0,  0,	//0
			 2,  0,  0,	//1
			 3,  1,  0,	//2
			 1,  1,  0,	//3
		];

		// Counter-clockwise reference of vertices
		this.indices = [
			// frontview (CCW winding order)
			// 3, 0, 1,
			// 2, 3, 1,
			// backview (CW winding order) - we don't want it in TP4
			1, 0, 3,
			1, 3, 2,
		];

		this.normals = [
			// frontview
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			// backview - we don't want it in TP4
			// 0, 0, -1,
			// 0, 0, -1,
			// 0, 0, -1,
			// 0, 0, -1,
		];

		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

