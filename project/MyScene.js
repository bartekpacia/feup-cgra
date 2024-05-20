import {
  CGFscene,
  CGFcamera,
  CGFaxis,
  CGFappearance,
  CGFtexture,
} from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MyRock } from "./MyRock.js";
import { MyRockSet } from "./MyRockSet.js";
import { MySphere } from "./MySphere.js";
import { MyGarden } from "./MyGarden.js";
import { MyPanorama } from "./MyPanorama.js";
import { splatVec3 } from "./common.js";
import { MyBee } from "./MyBee.js";

const CAM_TRANSLATION_VEC = vec3.fromValues(5, 5, 5);
const SPEED_DELTA = 0.01;
const ROTATION_DELTA = (2 * Math.PI) / 360;

export class MyScene extends CGFscene {
  constructor(myInterface) {
    super();
    this.myInterface = myInterface;
  }

  init(application) {
    super.init(application);

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
    this.beeTexture = new CGFtexture(this, "images/BeeTexture.jpeg");

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
    this.beeAppearance.setTextureWrap("REPEAT", "REPEAT");

    // Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    this.myPanorama = new MyPanorama(this, 200, 4, 4);
    this.mySphere = new MySphere(this, 20, 30);
    this.myRock = new MyRock(this, 20, 20);
    this.myGarden = new MyGarden(this, 3, 2);
    this.myRockSet = new MyRockSet(this, 13);
    this.bee = new MyBee(this);
    this.cameraFocusBee = false;

    // State variables
    this.staticCameraPosition = vec3.fromValues(6, 6, 5); // Position of camera when in not-follow (static) mode
    this.staticCameraTarget = vec3.create(); // Target of camera when in not-follow (static) mode
    this.didUpdateCameraState = true;
    this.cameraSwitchReady = true;
    this.beePositionResetReady = true;
    this.newCameraPosition = vec3.create();

    // Objects connected to MyInterface
    this.displayAxis = true;
    this.displayNormals = false;
    this.scaleFactor = 1;

    this.initCameras();
    this.initLights();
    this.enableTextures(true);
    this.setUpdatePeriod(1000 / 60); // 60 FPS, 16.67ms
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
      this.staticCameraPosition, /* position */
      vec3.fromValues(0, 0, 0), /* target */
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
    // Check for key codes e.g. in https://keycode.info
    if (this.gui.isKeyPressed("KeyW")) text += "W";
    if (this.gui.isKeyPressed("KeyA")) text += "A";
    if (this.gui.isKeyPressed("KeyS")) text += "S";
    if (this.gui.isKeyPressed("KeyD")) text += "D";
    if (this.gui.isKeyPressed("ArrowUp")) text += "^";
    if (this.gui.isKeyPressed("ArrowDown")) text += "v";
    if (this.gui.isKeyPressed("Space")) text += " ";
    if (this.gui.isKeyPressed("KeyR")) text += "R";

    let move = 0;
    let y = 0;
    let rotate = 0;
    // if (keysPressed) console.log(`GUI text: "${text}"`);
    if (text.includes("W")) this.bee.accelerate(+SPEED_DELTA);
    if (text.includes("S")) this.bee.accelerate(-SPEED_DELTA);
    if (text.includes("^")) {} // this.bee.accelerate(0, +SPEED_DELTA);
    if (text.includes("v")) {} // this.bee.accelerate(0, -SPEED_DELTA);
    
    if (text.includes("A")) this.bee.turn(+ROTATION_DELTA);
    if (text.includes("D")) this.bee.turn(-ROTATION_DELTA);

    // Enforce a small second cooldown for some actions
    if (text.includes(" ")) {
      if (this.cameraSwitchReady) {
        this.didUpdateCameraState = false;
        this.cameraFocusBee = !this.cameraFocusBee;
        this.cameraSwitchReady = false;
        setTimeout(() => (this.cameraSwitchReady = true), 100);
      }
    }

    if (text.includes("R")) {
      if (this.beePositionResetReady) {
        this.beePositionResetReady = false;
        this.bee.reset();
        setTimeout(() => (this.beePositionResetReady = true), 100);
      }
    }
  }

  update(dt) {
    this.checkKeys();
    this.bee.update(dt);
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

    // this.bee.update();
    
    if (this.displayAxis) this.axis.display();

    this.bee.display();

    if (this.cameraFocusBee) {
      if (!this.didUpdateCameraState) {
        // Save previous camera position so we have something to return to
        vec3.copy(this.staticCameraPosition, this.camera.position);
        this.didUpdateCameraState = true;
      }

      // TODO:
      // We need to merge 2 camera positions:
      //  1. Position that follows the bee
      //  2. Position reflecting the user's rotation around the moving bee

      vec3.add(this.newCameraPosition, this.bee._position, CAM_TRANSLATION_VEC);
      this.camera.setPosition(this.newCameraPosition);
      this.camera.setTarget(this.bee._position);
    } else {
      // Camera is not following the bee.
      if (!this.didUpdateCameraState) {
        this.camera.setPosition(this.staticCameraPosition);
        this.camera.setTarget(vec3.create());
        this.didUpdateCameraState = true;
      }
    }

    this.pushMatrix();
    this.panoramaAppearance.apply();
    this.translate(
      this.camera.position[0],
      this.camera.position[1],
      this.camera.position[2],
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
    this.translate(0, 0, 9);
    this.rotate(Math.PI / 2.0, 1, 0, 0);
    this.mySphere.display();
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

    //display rock boudlers
    this.pushMatrix();
    this.translate(5, 0, 5);
    this.myRockSet.display();
    this.popMatrix();

    // ---- END Primitive drawing section
  }
}
