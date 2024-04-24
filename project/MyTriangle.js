import { CGFobject } from '../lib/CGF.js';

export class MyTriangle extends CGFobject {
	constructor(scene, height, texCoords) {
		super(scene);
		this.height = height;
		this.texCoords = texCoords;
		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [
			 0,  0, 0,
			-1,  0, this.height,
			 1,  0, this.height,
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
