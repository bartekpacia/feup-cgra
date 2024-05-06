import { CGFobject } from "../lib/CGF.js";

export class MySphere extends CGFobject {
  constructor(scene, slices = 30, stacks = 30) {
    super(scene);
    this.slices = slices;
    this.stacks = stacks;
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    // Calculate the vertical angle increment
    const delta_alpha = Math.PI / this.stacks;

    // Generate vertices and normals
    for (let i = 0; i <= this.stacks; i++) {
      const stack_angle = i * delta_alpha;
      const v = 1 - i / this.stacks;

      for (let j = 0; j <= this.slices; j++) {
        const slice_angle = (j * 2 * Math.PI) / this.slices;
        const u = 1 - j / this.slices;

        const x = Math.sin(stack_angle) * Math.cos(slice_angle);
        const y = Math.sin(stack_angle) * Math.sin(slice_angle);
        const z = Math.cos(stack_angle);

        this.vertices.push(x, y, z);
        this.normals.push(x, y, z);
        this.texCoords.push(u, v);
      }
    }

    // Generate indices to form triangles
    for (let i = 0; i < this.stacks; i++) {
      for (let j = 0; j < this.slices; j++) {
        const vertex1 = i * (this.slices + 1) + j;
        const vertex2 = vertex1 + this.slices + 1;

        // Form triangles for the current and next stack
        this.indices.push(vertex1, vertex2, vertex1 + 1);
        this.indices.push(vertex2, vertex2 + 1, vertex1 + 1);
      }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
