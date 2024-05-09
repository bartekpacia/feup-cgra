import { CGFinterface, dat } from "../lib/CGF.js";
import { MyScene } from "./MyScene.js";

export class MyInterface extends CGFinterface {
  constructor() {
    super();
  }

  init(application) {
    super.init(application);

    this.gui = new dat.GUI();

    this.gui.add(this.scene, "displayAxis").name("Display Axis");
    this.gui.add(this.scene, "displayNormals").name("Display normals");
    this.gui.add(this.scene, "scaleFactor", 0.1, 5).name("Scale Factor");
    this.gui.add(this.scene.bee, "orientation", 0, 2 * Math.PI).name("Bee orientation");
    // this.gui.add(this.scene.bee, "position", 0, 2 * Math.PI).name("Bee position");

    this.initKeys();

    return true;
  }

  initKeys() {
    // create reference from the scene to the GUI
    this.scene.gui = this;

    // disable the processKeyboard function
    this.processKeyboard = function () {};

    // create a named array to store which keys are being pressed
    this.activeKeys = {};
  }

  processKeyDown(event) {
    // called when a key is pressed down

    // mark it as active in the array
    this.activeKeys[event.code] = true;
  }

  processKeyUp(event) {
    // called when a key is released, mark it as inactive in the array
    this.activeKeys[event.code] = false;
  }

  isKeyPressed(keyCode) {
    // returns true if a key is marked as pressed, false otherwise
    return this.activeKeys[keyCode] || false;
  }
}
