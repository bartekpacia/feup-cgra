import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { Triangle } from "./primitives/Triangle.js";
import { MyCylinder } from "./MyCylinder.js";
import { getRandom } from "./common.js";

/**
 * Flower consists of stem, center (aka stamen) and petals.
 */
export class MyFlower extends CGFobject {
  constructor(scene, petalCount = 3) {
    super(scene);
    this.initBuffers();

    this.scene = scene;
    this.petalCount = petalCount;

    this.sphere = new MySphere(scene, 16, 8);
    const stemPartsCount = 5;
    this.stemParts = [];
    for (let i = 0; i < stemPartsCount; i++) {
      this.stemParts.push(new MyCylinder(scene, 20, 20));
    }

    this.petals = [];
    this.petalYoffsets = [];
    for (let i = 0; i < this.petalCount; i++) {
      this.petals.push(new Petal(scene));
      this.petalYoffsets.push(getRandom(-0.5, 0.5));
    }
  }

  display() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0);
    this.sphere.display();
    this.scene.popMatrix();

    // Display petals
    for (let i = 0; i < this.petals.length; i++) {
      const triangle = this.petals[i];
      const increment = (Math.PI * 2) / this.petalCount;
      const rotation = increment * i;
      this.scene.pushMatrix();
      this.scene.setAmbient(1, 192 / 255, 204 / 255, 1);
      this.scene.setDiffuse(1, 192 / 255, 204 / 255, 1);
      this.scene.rotate(rotation, 0, 1, 0);

      // Randomize the point where petal connects to the receptacle
      const y = Math.random() * 0.5 - 0.25;
      this.scene.translate(0, 0, this.petalYoffsets[i]);

      triangle.display();
      this.scene.popMatrix();
    }

    // Display step parts
    for (let i = 0; i < this.stemParts.length; i++) {
      const y = 0 - i * 1.1;
      const halePart = this.stemParts[i];
      this.scene.pushMatrix();
      this.scene.translate(0, y, 0);
      this.scene.scale(0.3, 1, 0.3);
      this.scene.rotate(Math.PI / 2, 1, 0, 0);
      halePart.display();
      this.scene.popMatrix();
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}

/**
 * Represents a petal. It's composed of two triangles joined together.
 */
class Petal extends CGFobject {
  constructor(scene, length = 2, peakHeight = 1) {
    super(scene);
    this.initBuffers();

    this.scene = scene;
    this.length = length;
    this.peakHeight = peakHeight;

    this.angle = Math.PI / 2 / 10; // 9°

    this.firstTriangle = new Triangle(scene, this.length, this.peakHeight);
    this.secondTriangle = new Triangle(scene, this.length, this.peakHeight);
  }

  display() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];

    // The triangle closer to center

    this.scene.pushMatrix();
    this.firstTriangle.display();
    this.scene.popMatrix();

    // The triangle farther from center

    this.scene.pushMatrix();
    this.scene.translate(0, 0, this.length * 2);
    this.scene.scale(1, 1, -1);
    this.secondTriangle.display();
    this.scene.popMatrix();

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
