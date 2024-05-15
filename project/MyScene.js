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
import { MyFlower } from "./MyFlower.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyUnitCube } from "./MyUnitCube.js";
import { splatVec3 } from "./common.js";

const CAM_TRANSLATION_VEC = vec3.fromValues(5, 5, 5);
import { MyBee } from "./MyBee.js";

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
    this.panoramaTexture = new CGFtexture(this, "images/panorama4.jpg");
    this.pollenTexture = new CGFtexture(this, "images/pollen.jpg");
    this.beeTexture = new CGFtexture(this, "images/BeeTexture.jpeg" );

    this.planeAppearance = new CGFappearance(this);
    this.planeAppearance.setTexture(this.planeTexture);
    this.planeAppearance.setTextureWrap("REPEAT", "REPEAT");

    this.sphereAppearance = new CGFappearance(this);
    this.sphereAppearance.setTexture(this.sphereTexture);
    this.sphereAppearance.setTextureWrap("REPEAT", "REPEAT");

    this.panoramaAppearance = new CGFappearance(this);
    this.panoramaAppearance.setTexture(this.panoramaTexture);
    this.panoramaAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");
    this.panoramaAppearance.setEmission(1, 1, 1, 1);

    this.beeAppearance = new CGFappearance(this);
    this.beeAppearance.setTexture(this.beeTexture);
    this.beeAppearance.setTextureWrap("REPEAT", );

    // Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    this.myPanorama = new MyPanorama(this, 200, 4, 4);
    this.mySphere = new MySphere(this, 20, 30);
    this.myRock = new MyRock(this, 20, 20);
    this.myGarden = new MyGarden(this, 3, 2);
    this.myFlower = new MyFlower(this, 5, 5);
    this.bee = new MyUnitCube(this);
    this.cameraFocusBee = false;
    this.myBee = new MyBee(this);

    // State variables
    this.beePosition = vec3.create();
    this.previousCameraPosition = vec3.create();
    this.previousCameraTarget = vec3.create();
    this.didUpdateCamera = true;
    this.cameraToggleReady = true;
    this.newCameraPosition = vec3.create();
   

    // Objects connected to MyInterface
    this.displayAxis = true;
    this.displayNormals = false;
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
    this.lights[1].setLinearAttenuation(0.0);
    this.lights[1].setConstantAttenuation(0.0);
    this.lights[1].enable();
    this.lights[1].update();

    this.lights[2].setPosition(0, 0, 0);
    this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
    this.lights[2].enable();
    this.lights[2].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      //vec3.fromValues(200, 200, 200),
      vec3.fromValues(6, 6, 5) /* position */,
      vec3.fromValues(0, 0, 0) /* target */
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  checkKeys() {
    let text = "";
    let keysPressed = false;

    // Check for key codes e.g. in https://keycode.info
    if (this.gui.isKeyPressed("KeyW")) {
      text += "W";
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyA")) {
      text += "A";
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyS")) {
      text += "S";
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyD")) {
      text += "D";
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("ArrowUp")) {
      text += "^";
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("ArrowDown")) {
      text += "v";
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("Space")) {
      text += " ";
      keysPressed = true;
    }

    let x = 0;
    let y = 0;
    let z = 0;
    // if (keysPressed) console.log(`GUI text: "${text}"`);
    if (text.includes("W")) z -= 1;
    if (text.includes("A")) x -= 1;
    if (text.includes("S")) z += 1;
    if (text.includes("D")) x += 1;
    if (text.includes("^")) y += 1;
    if (text.includes("v")) y -= 1;

    const translationVec = vec3.fromValues(x, y, z);
    vec3.add(this.beePosition, this.beePosition, translationVec);

    if (text.includes(" ")) {
      // Enforce 0.5 second cooldown
      if (this.cameraToggleReady) {
        this.didUpdateCamera = false;
        this.cameraFocusBee = !this.cameraFocusBee;
        this.cameraToggleReady = false;
        setTimeout(() => (this.cameraToggleReady = true), 500);
      }
    }
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

    this.checkKeys();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.translate(...splatVec3(this.beePosition));
    this.bee.display();
    this.popMatrix();

    if (this.cameraFocusBee) {
      if (!this.didUpdateCamera) {
        // Save previous camera position so we have something to return to
        vec3.copy(this.previousCameraPosition, this.camera.position);
        this.didUpdateCamera = true;
      }

      vec3.add(this.newCameraPosition, this.beePosition, CAM_TRANSLATION_VEC);
      this.camera.setPosition(this.newCameraPosition);
      this.camera.setTarget(this.beePosition);
    } else {
      if (!this.didUpdateCamera) {
        this.camera.setPosition(this.previousCameraPosition);
        this.camera.setTarget(vec3.create());
        this.didUpdateCamera = true;
      }
    }

    this.pushMatrix();
    this.panoramaAppearance.apply();
    this.translate(
      this.camera.position[0],
      this.camera.position[1],
      this.camera.position[2]
    );
    this.rotate(Math.PI / 2, 1, 0, 0);
    if (this.displayNormals) {
      this.myPanorama.enableNormalViz();
    } else {
      this.myPanorama.disableNormalViz();
    }
    this.myPanorama.display();
    this.popMatrix();

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
    this.rotate(Math.PI / 2.0, 1, 0, 0);
    this.mySphere.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(10, 0, 10);
    this.myFlower.display();
    this.popMatrix();

    // Display garden
    this.pushMatrix();
    this.translate(-13, 0, -10);
    this.myGarden.display();
    if (this.displayNormals) {
      this.myGarden.enableNormalViz();
    } else {
      this.myGarden.disableNormalViz();
    }
    this.popMatrix();

   //displaying the rock 
    this.pushMatrix();
    this.translate(3, 0, 3);
    this.myRock.display();
    this.popMatrix();

    //diplaying the bee
    this.pushMatrix();
    this.beeAppearance.apply();
    this.translate(0, 5, 0);
    this.rotate(-Math.PI/2.0,1,0, 0);
    this.myBee.display();
    this.popMatrix();

    // ---- END Primitive drawing section
  }
}
