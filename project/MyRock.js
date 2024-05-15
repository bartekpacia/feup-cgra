import { CGFobject } from "../lib/CGF.js";

export class MyRock extends CGFobject {
  constructor(scene, slices, stacks) {
    super(scene);
    this.slices = slices;
    this.stacks = stacks;
    this.position = [0, 0, 0];
    this.scale = [1, 1, 1];
    this.rotation = [0, 0, 0];
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

        // Modify the vertex coordinates to create protrusions and indentations
        const noise = Math.random() * 0.3 - 0.1; // Random noise for vertex modification
        const radius = 1 + noise; // Modify radius slightly

        const x = radius * Math.sin(stack_angle) * Math.cos(slice_angle);
        const y = radius * Math.sin(stack_angle) * Math.sin(slice_angle);
        const z = radius * Math.cos(stack_angle);

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
  setPosition(position){
    this.position = position;
  }
  setScale(scale){
    this.scale = scale;
  }
  setRotation(rotation){
    this.rotation = rotation;
  }
}
