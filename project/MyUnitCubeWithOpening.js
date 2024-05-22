import { CGFobject, CGFappearance } from '../lib/CGF.js';

export class MyUnitCubeWithOpening extends CGFobject {
  constructor(scene, openingWidth = 0.8, openingHeight = 0.2) {
    super(scene);
    this.openingWidth = openingWidth;
    this.openingHeight = openingHeight;
    this.initBuffers();
    this.initTextures();
  }

  initBuffers() {
    const w = this.openingWidth / 2;
    const h = this.openingHeight;

    this.vertices = [
      // Bottom face
      -0.5, -0.5,  0.5,   // 0
       0.5, -0.5,  0.5,   // 1
       0.5, -0.5, -0.5,   // 2
      -0.5, -0.5, -0.5,   // 3

      // Top face
      -0.5,  0.5,  0.5,   // 4
       0.5,  0.5,  0.5,   // 5
       0.5,  0.5, -0.5,   // 6
      -0.5,  0.5, -0.5,   // 7

      // Front face (with opening)
      -0.5, -0.5,  0.5,       // 8
      -w,   -0.5,  0.5,       // 9
      -w,   -0.5 + h,  0.5,   // 10
       w,   -0.5 + h,  0.5,   // 11
       w,   -0.5,  0.5,       // 12
       0.5, -0.5,  0.5,       // 13
       0.5,  0.5,  0.5,       // 14
      -0.5,  0.5,  0.5,       // 15

      // Left face
      -0.5, -0.5, -0.5,   // 16
      -0.5, -0.5,  0.5,   // 17
      -0.5,  0.5,  0.5,   // 18
      -0.5,  0.5, -0.5,   // 19

      // Right face
       0.5, -0.5,  0.5,   // 20
       0.5, -0.5, -0.5,   // 21
       0.5,  0.5, -0.5,   // 22
       0.5,  0.5,  0.5,   // 23

      // Back face
      -0.5, -0.5, -0.5,   // 24
       0.5, -0.5, -0.5,   // 25
       0.5,  0.5, -0.5,   // 26
      -0.5,  0.5, -0.5,   // 27
    ];

    this.indices = [
      // Bottom face
      0, 1, 2,
      2, 3, 0,

      // Top face
      4, 5, 6,
      6, 7, 4,

      // Front face (with opening)
      8, 9, 10,
      10, 15, 8,
      10, 11, 14,
      14, 15, 10,
      11, 12, 13,
      13, 14, 11,

      // Left face
      16, 17, 18,
      18, 19, 16,

      // Right face
      20, 21, 22,
      22, 23, 20,

      // Back face
      24, 25, 26,
      26, 27, 24,
    ];

    this.normals = [
      // Bottom face
       0, -1,  0,
       0, -1,  0,
       0, -1,  0,
       0, -1,  0,

      // Top face
       0,  1,  0,
       0,  1,  0,
       0,  1,  0,
       0,  1,  0,

      // Front face (with opening)
       0,  0,  1,
       0,  0,  1,
       0,  0,  1,
       0,  0,  1,
       0,  0,  1,
       0,  0,  1,
       0,  0,  1,
       0,  0,  1,

      // Left face
      -1,  0,  0,
      -1,  0,  0,
      -1,  0,  0,
      -1,  0,  0,

      // Right face
       1,  0,  0,
       1,  0,  0,
       1,  0,  0,
       1,  0,  0,

      // Back face
       0,  0, -1,
       0,  0, -1,
       0,  0, -1,
       0,  0, -1,
    ];

    this.texCoords = [
      // Bottom face
      0, 0,
      1, 0,
      1, 1,
      0, 1,

      // Top face
      0, 0,
      1, 0,
      1, 1,
      0, 1,

      // Front face (with opening)
      0, 0,
      0.5 - w, 0,
      0.5 - w, h,
      0.5 + w, h,
      0.5 + w, 0,
      1, 0,
      1, 1,
      0, 1,

      // Left face
      0, 0,
      1, 0,
      1, 1,
      0, 1,

      // Right face
      0, 0,
      1, 0,
      1, 1,
      0, 1,

      // Back face
      0, 0,
      1, 0,
      1, 1,
      0, 1,
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }


  initTextures() {
    this.texture = new CGFappearance(this.scene);
    this.texture.loadTexture('images/woodtexture2.jpg'); 
  }

  display() {
    this.texture.apply();
    super.display();
  }

}
