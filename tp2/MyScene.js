import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";

import { Square } from "./Square.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);

    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.diamond = new MyDiamond(this);
    this.triangle = new MyTriangle(this);
    this.parallelogram = new MyParallelogram(this);

    this.square = new Square(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(0, 0, 30),
      vec3.fromValues(0, 0, 0),
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    // SQUARE FOR TESTING
    this.pushMatrix();
    this.translate(0, 0, 0);
    // this.square.display();
    this.popMatrix();

    // GREEN DIAMOND
    const translationMatrix = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      2.5, 4, 0.1, 1,
    ];

    const s = 1.5;
    const scaleMatrix = [
      s, 0, 0, 0,
      0, s, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];

    this.pushMatrix();
    this.multMatrix(translationMatrix);
    this.multMatrix(scaleMatrix);
    this.setDiffuse(0, 1, 0, 1);
    this.diamond.display();
    this.popMatrix();

    // PINK TRIANGLE
    this.pushMatrix();
    this.scale(1.5, 1.5, 1);
    this.translate(1, 1, 0);
    this.rotate(Math.PI / 2, 0, 0, 1);
    this.setDiffuse(1, 192/255, 204/255, 1);
    this.triangle.display();
    this.popMatrix();
    
    // BLUE TRIANGLE
    this.pushMatrix();
    this.scale(2, 2, 1);
    this.translate(1, -1, 0);
    this.rotate(Math.PI, 0, 0, 1);
    this.setDiffuse(0, 0, 1, 1);
    this.triangle.display();
    this.popMatrix();

    // ORANGE TRIANGLE
    this.pushMatrix();
    this.scale(2, 2, 1);
    this.setDiffuse(1, 165 / 255, 0, 1);
    this.triangle.display();
    this.popMatrix();

    // RED TRIANGLE
    this.pushMatrix();
    this.translate(-3, 1, 0.1);
    this.rotate(Math.PI / 2, 0, 0, 1);
    this.setDiffuse(1, 0, 0, 1);
    this.triangle.display();
    this.popMatrix();

    // PURPLE TRIANGLE
    this.pushMatrix();
    this.translate(-0.5, -3, 0.1);
    this.rotate(-Math.PI / 2, 0, 0, 1);
    this.setDiffuse(0.5, 0, 0.5, 1);
    this.triangle.display();
    this.popMatrix();

    // YELLOW PARALLELOGRAM
    const reflectionMatrix = [
       1,  0,  0,  0,
       0, -1,  0,  0,
       0,  0,  1,  0,
       0,  0,  0,  1,
    ];

    this.pushMatrix();
    this.translate(4, -0.5, 0);
    this.multMatrix(reflectionMatrix);
    this.rotate(-Math.PI / 6, 0, 0, 1);
    this.setDiffuse(1, 1, 0, 1);
    this.parallelogram.display();
    this.popMatrix();
  }
}
