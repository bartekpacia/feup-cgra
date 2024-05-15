import { CGFobject } from "../lib/CGF.js";

export class MyPanorama extends CGFobject {
  constructor(scene, radius) {
    super(scene);
    this.radius = radius;
    this.slices = 20;
    this.stacks = 20;
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    // Calculate the vertical angle increment
    const deltaAngle = Math.PI / this.stacks;

    // Generate vertices and normals
    for (let i = 0; i <= this.stacks; i++) {
      const stackAngle = i * deltaAngle;
      const v = 1 - (i / this.stacks);

      for (let j = 0; j <= this.slices; j++) {
        const sliceAngle = (j * Math.PI * 2) / this.slices;
        const u = 1 - (j / this.slices);

        const x = Math.sin(stackAngle) * Math.cos(sliceAngle);
        const y = Math.sin(stackAngle) * Math.sin(sliceAngle);
        const z = Math.cos(stackAngle);

        if (i == 0 && j == 0) {
          //this.vertices.push(0, 0, 250);
          this.vertices.push(x * this.radius, y * this.radius, z * this.radius);
        } else {
          this.vertices.push(x * this.radius, y * this.radius, z * this.radius);
        }
        this.normals.push(x, y, z);
        this.texCoords.push(u, v);
      }
    }

    // Generate additional inverted normals
    const invertedNormals = [];
    for (let i = 0; i < this.normals.length; i++) {
      invertedNormals.push(-this.normals[i]);
    }
    this.normals = this.normals.concat(invertedNormals);

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

    // Generate inverted indices to form triangle faces facing inward
    for (let i = 0; i < this.stacks; i++) {
      for (let j = 0; j < this.slices; j++) {
        const vertex1 = i * (this.slices + 1) + j;
        const vertex2 = vertex1 + this.slices + 1;

        // Form triangles for the current and next stack
        this.indices.push(vertex1 + 1, vertex2, vertex1);
        this.indices.push(vertex1 + 1, vertex2 + 1, vertex2);
      }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
