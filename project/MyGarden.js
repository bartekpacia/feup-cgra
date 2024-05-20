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
        const petalCount = getRandomInt(3, 6);
        const stemPartsCount = getRandomInt(3, 6);
        this.flowers.push(new MyFlower(scene, petalCount, stemPartsCount));
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
    this.triangle.display();

    for (let i = 0; i < this.xLenght; i++) {
      for (let j = 0; j < this.zLength; j++) {
        this.scene.pushMatrix();
        this.scene.translate(i * this.space, 0, j * this.space);
        this.flowers[i * this.zLength + j].display();
        this.scene.popMatrix();
      }
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
