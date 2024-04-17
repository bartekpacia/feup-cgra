import { CGFobject } from "../lib/CGF.js";

export class MySphere extends CGFobject {
  constructor(scene, slices, stacks) {
    super(scene);
    this.slices = slices;
    this.stacks = stacks;
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];

    const verticalAngle = (Math.PI / 2) / this.stacks; // ɑ, the degrees increment (90° / stacks)
    const horizontalAngle = (Math.PI * 2) / this.slices; // 360° / slices

    // Generate lines of latitude ("parallels") in the northern hemisphere
    for (let i = 0; i < this.stacks; i++) {
      const y = Math.sin(i * verticalAngle);

      for (let j = 0; j < this.slices; j++) {
        const x = Math.cos(j * horizontalAngle) * Math.cos(verticalAngle);
        const z = Math.sin(j * horizontalAngle) * Math.cos(verticalAngle);
        const vertex = [x, y, z];
        this.vertices.push(...vertex);
      }
    }

    // Generate lines of latitude ("parallels") in the southern hemisphere
    // for (let i = 0; i < this.stacks; i++) {
    // }

    // const stackHeightDelta = 1 / this.stacks;
    // for (let i = 0; i < this.stacks + 1; i++) {
    //   for (let j = 0; j < this.slices; j++) {
    //     const vertex = [
    //       Math.cos(j * verticalAngle), // x
    //       Math.sin(j * verticalAngle), // y
    //       stackHeightDelta * i, // z
    //     ];
    //     this.vertices.push(...vertex);

    //     const normal = [Math.cos(j * verticalAngle), Math.sin(j * verticalAngle), 0];
    //     this.normals.push(...normal);
    //   }
    // }

    // for (let i = 0; i < this.stacks; i++) {
    //   // Offset from indices of vertices in the first stack
    //   const offset = this.slices * i;
    //   for (let j = 0; j < this.slices; j++) {
    //     const triangle0 = [
    //       offset + j,
    //       offset + j + 1,
    //       offset + j + this.slices,
    //     ];
    //     this.indices.push(...triangle0);
    //     let triangle1 = [
    //       offset + j + 1,
    //       offset + j + this.slices + 1,
    //       offset + j + this.slices,
    //     ];
    //     console.log(`face ${i * offset + j}: ${triangle0} and ${triangle1}`);

    //     // Prevent off-by-one error
    //     if ((j + 1) % this.slices == 0) {
    //       triangle1[0] -= this.slices;
    //       triangle1[1] -= this.slices;
    //       triangle1[2] -= this.slices;
    //     }
    //     this.indices.push(...triangle1);
    //   }
    // }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
