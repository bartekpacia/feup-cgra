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

    return true;
  }
}
