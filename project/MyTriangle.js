import { CGFobject } from '../lib/CGF.js';

export class MyTriangle extends CGFobject {
	constructor(scene, texCoords) {
		super(scene);
		this.texCoords = texCoords;
		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [
			 0,  0, 0,	//0
			-1,  0, 3,	//1
			 1,  0, 3,	//2
		];

		this.indices = [
			0, 1, 2,
			2, 1, 0,
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
		];

		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
