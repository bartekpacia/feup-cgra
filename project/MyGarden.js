import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyFlower } from "./MyFlower.js";
import { getRandomInt } from "./common.js";

export class MyGarden extends CGFobject {
  constructor(scene, xLength, zLength, space = 7.5) {
    super(scene);
    this.initBuffers();

    this.xLenght = xLength;
    this.zLength = zLength;
    this.space = space;

    this.flowers = [];
    for (let i = 0; i < xLength; i++) {
      for (let j = 0; j < zLength; j++) {
        const petalCount = getRandomInt(3, 6);

        this.flowers.push(new MyFlower(scene, petalCount));
      }
    }
  }

  display() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];

    for (let i = 0; i < this.xLenght; i++) {
      for (let j = 0; j < this.zLength; j++) {
        this.scene.pushMatrix();
        this.scene.translate(i * this.space, 0, j * this.space);
        this.flowers[i * this.zLength + j].display();
        this.scene.popMatrix();
      }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
