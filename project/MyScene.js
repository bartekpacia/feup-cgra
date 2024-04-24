import {
  CGFscene,
  CGFcamera,
  CGFaxis,
  CGFappearance,
  CGFtexture,
} from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MyRock } from "./MyRock.js";
import { MySphere } from "./MySphere.js";
import { MyGarden } from "./MyGarden.js";

export class MyScene extends CGFscene {
  constructor() {
    super();
  }

  init(application) {
    super.init(application);

    this.initCameras();
    this.initLights();

    // Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    // Initializing the appearances
    this.planeTexture = new CGFtexture(this, "images/grass_texture.jpg");
    this.sphereTexture = new CGFtexture(this, "images/earth.jpg");

    this.planeAppearance = new CGFappearance(this);
    this.planeAppearance.setTexture(this.planeTexture);
    this.planeAppearance.setTextureWrap("REPEAT", "REPEAT");

    this.sphereAppearance = new CGFappearance(this);
    this.sphereAppearance.setTexture(this.sphereTexture);
    this.sphereAppearance.setTextureWrap("REPEAT", "REPEAT");

    // Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    this.mySphere = new MySphere(this, 20, 30);
    this.myRock = new MyRock(this, 20, 20);
    this.myGarden = new MyGarden(this, 3, 2);

    // Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;

    this.enableTextures(true);
  }

  initLights() {
    this.lights[0].setPosition(5, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();

    this.lights[1].setPosition(-2, -2, 4);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].enable();
    this.lights[1].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(6, 6, 5),
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

    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.planeAppearance.apply();
    this.translate(0, -100, 0);
    this.scale(400, 400, 400);
    this.rotate(-Math.PI / 2.0, 1, 0, 0);
    this.plane.display();
    this.popMatrix();

    this.pushMatrix();
    this.sphereAppearance.apply();
    this.translate(0, 0, 5);
    this.mySphere.display();
    this.popMatrix();

    // Display garden
    {
      this.pushMatrix();
      this.translate(-13, 0, -10);
      this.myGarden.display();
      this.popMatrix();
    }

    this.pushMatrix();
    //this.appearance.apply();
    this.translate(3, 0, 3);
    this.myRock.display();
    this.popMatrix();

    // ---- END Primitive drawing section
  }
}
