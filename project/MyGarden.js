import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyFlower } from "./MyFlower.js";
import { getRandomInt } from "./common.js";
import { Triangle } from "./primitives/Triangle.js";

export class MyGarden extends CGFobject {
  constructor(scene, xLength, zLength, space = 12 ) {
    super(scene);

    this.xLenght = xLength;
    this.zLength = zLength;
    this.space = space;

    this.flowers = [];
    for (let i = 0; i < xLength; i++) {
      for (let j = 0; j < zLength; j++) {
        const position = [i * this.space, 0, j * this.space];
        const petalCount = getRandomInt(3, 6);
        const stemPartsCount = getRandomInt(3, 6);
        this.flowers.push(new MyFlower(scene, position, petalCount, stemPartsCount));
      }
    }

    this.triangle = new Triangle(scene);

    this.initBuffers();
  }

  initBuffers() {
    super.initBuffers();

    this.vertices = [];
    this.indices = [];
    this.normals = [];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  display() {
    for (const flower of this.flowers) {
      flower.display();
    }
  }

  enableNormalViz() {
    super.enableNormalViz();
    for (let i = 0; i < this.flowers.length; i++) {
      this.flowers[i].enableNormalViz();
    }
  }

  disableNormalViz() {
    super.disableNormalViz();
    for (let i = 0; i < this.flowers.length; i++) {
      this.flowers[i].disableNormalViz();
    }
  }
}
