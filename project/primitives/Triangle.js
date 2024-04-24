import { CGFobject } from "../../lib/CGF.js";

export class Triangle extends CGFobject {
  constructor(scene, length, heightDiff) {
    super(scene);
    this.length = length;
    this.heightDiff = heightDiff;
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [
      0,
      0,
      0,
      -1,
      this.heightDiff,
      this.length,
      1,
      this.heightDiff,
      this.length,
    ];

    this.indices = [0, 1, 2, 2, 1, 0];

    // TODO(bartek): Fix normals to reflect vertices position
    this.normals = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1];

    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
  }
}
