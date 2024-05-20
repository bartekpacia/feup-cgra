import { CGFapplication } from "../lib/CGF.js";
import { MyScene } from "./MyScene.js";
import { MyInterface } from "./MyInterface.js";

function main() {
  const app = new CGFapplication(document.body);
  const myInterface = new MyInterface();
  const myScene = new MyScene(myInterface);

  app.init();

  app.setScene(myScene);
  app.setInterface(myInterface);

  myInterface.setActiveCamera(myScene.camera);

  app.run();
}

main();
