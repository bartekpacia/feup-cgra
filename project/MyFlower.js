import { CGFobject } from "../lib/CGF.js";
import { Triangle } from "./primitives/Triangle.js";
import { MyCylinder } from "./MyCylinder.js";
import { getRandom, crossProduct } from "./common.js";
import { MyPollen } from "./MyPollen.js";

/**
 * Flower consists of stem, center (aka stamen) and petals.
 */
export class MyFlower extends CGFobject {
  constructor(scene, petalCount = 3, stemPartsCount = 10) {
    super(scene);

    this.scene = scene;
    this.petalCount = petalCount;
    this.stemPartsCount = stemPartsCount;
    this.pollenPosition = [getRandom(-0.5, 0.5), 0.5, getRandom(-0.5, 0.5)];
    this.pollen = new MyPollen(scene);

    this.stemParts = [];
    for (let i = 0; i < this.stemPartsCount; i++) {
      this.stemParts.push(new MyCylinder(scene, 20, 20));
    }

    this.receptacle = new Receptacle(scene, 16, 8);

    this.petals = [];
    this.petalYoffsets = [];
    for (let i = 0; i < this.petalCount; i++) {
      this.petals.push(new Petal(scene));
      this.petalYoffsets.push(getRandom(-0.5, 0.5));
    }

    this.initBuffers();
  }

  enableNormalViz() {
    super.enableNormalViz();

    for (let i = 0; i < this.stemParts.length; i++) {
      this.stemParts[i].enableNormalViz();
    }

    this.receptacle.enableNormalViz();

    for (let i = 0; i < this.petals.length; i++) {
      this.petals[i].enableNormalViz();
    }
  }

  disableNormalViz() {
    super.disableNormalViz();

    for (let i = 0; i < this.stemParts.length; i++) {
      this.stemParts[i].disableNormalViz();
    }

    this.receptacle.disableNormalViz();

    for (let i = 0; i < this.petals.length; i++) {
      this.petals[i].disableNormalViz();
    }
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  display() {
    // Display the pollen
    {
      this.scene.pushMatrix();
      this.scene.translate(...this.pollenPosition);
      this.pollen.display();
      this.scene.popMatrix();
    }

    // Display stem parts
    for (let i = 0; i < this.stemParts.length; i++) {
      const y = 0 - i * 1.1;

      // Green color
      this.scene.setAmbient(0, 0.25, 0, 1);
      this.scene.setDiffuse(0, 0.25, 0, 1);
      this.scene.setSpecular(0, 0, 0, 1);

      this.scene.pushMatrix();
      this.scene.translate(0, y, 0);
      this.scene.scale(0.3, 1, 0.3);
      this.scene.rotate(Math.PI / 2, 1, 0, 0);
      this.stemParts[i].display();
      this.scene.popMatrix();
    }

    // Display receptacle
    {
      // Yellow color
      this.scene.setAmbient(1, 1, 0, 1);
      this.scene.setDiffuse(1, 1, 0, 1);
      this.scene.setSpecular(0, 0, 0, 1);

      this.scene.pushMatrix();
      this.scene.translate(0, 0, 0);
      this.receptacle.display();
      this.scene.popMatrix();
    }

    // Display petals
    for (let i = 0; i < this.petals.length; i++) {
      const increment = (Math.PI * 2) / this.petalCount;
      const rotation = increment * i;

      this.scene.pushMatrix();
      this.scene.rotate(rotation, 0, 1, 0);

      // Randomize the point where petal connects to the receptacle
      this.scene.translate(0, 0, this.petalYoffsets[i]);

      this.petals[i].display();
      this.scene.popMatrix();
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}

class Receptacle extends CGFobject {
  constructor(scene, sideCount = 4) {
    super(scene);

    this.scene = scene;
    this.sideCount = sideCount;
    this.executed = false;

    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];

    const centerPoint = [0, 0.5, 0];

    const delta = (Math.PI * 2) / this.sideCount;
    for (let i = 0; i < this.sideCount; i++) {
      const angle = delta * i;

      const point1 = [Math.cos(angle + delta), 0, Math.sin(angle + delta)];
      const point2 = [Math.cos(angle), 0, Math.sin(angle)];
      const normal = crossProduct(centerPoint, point1, point2);

      this.vertices.push(...centerPoint, ...point1, ...point2);
      this.indices.push(i * 3, i * 3 + 1, i * 3 + 2);
      this.normals.push(...normal, ...normal, ...normal);
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}

/**
 * Represents a petal. It's composed of two triangles joined together.
 */
class Petal extends CGFobject {
  constructor(
    scene,
    length = 2,
    peakHeight = 1,
    color = [1, 192/255, 204/255],
  ) {
    super(scene);

    this.scene = scene;
    this.length = length;
    this.peakHeight = peakHeight;
    this.color = color;

    this.firstTriangle = new Triangle(scene, this.length, this.peakHeight);
    this.secondTriangle = new Triangle(scene, this.length, this.peakHeight);

    this.initBuffers();
  }

  enableNormalViz() {
    super.enableNormalViz();
    this.firstTriangle.enableNormalViz();
    this.secondTriangle.enableNormalViz();
  }

  disableNormalViz() {
    super.disableNormalViz();
    this.firstTriangle.disableNormalViz();
    this.secondTriangle.disableNormalViz();
  }

  display() {
    this.scene.setAmbient(0, 0, 0, 0);
    this.scene.setDiffuse(0, 0, 0, 0);
    this.scene.setSpecular(1, 1, 1, 1);
    this.scene.setShininess(10);
    this.scene.setAmbient(this.color[0], this.color[1], this.color[2], 1.0);
    this.scene.setDiffuse(this.color[0], this.color[1], this.color[2], 1.0);
    this.scene.setSpecular(0.1, 0.1, 0.1, 1.0);

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
