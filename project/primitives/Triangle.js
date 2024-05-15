import { CGFobject } from "../../lib/CGF.js";
import { crossProduct } from "../common.js";

export class Triangle extends CGFobject {
  constructor(scene, length = 3, heightDiff = 0) {
    super(scene);
    this.length = length;
    this.heightDiff = heightDiff;
    this.initBuffers();
  }

  initBuffers() {
    const vertex0 = [0, 0, 0];
    const vertex1 = [-1, this.heightDiff, this.length];
    const vertex2 = [1, this.heightDiff, this.length];

    const normal = crossProduct(vertex0, vertex1, vertex2);

    this.vertices = [...vertex0, ...vertex1, ...vertex2];
    this.indices = [0, 1, 2, 2, 1, 0];
    this.normals = [...normal, ...normal, ...normal];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
