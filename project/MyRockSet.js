import { CGFobject } from "../lib/CGF.js";
import { MyRock } from "./MyRock.js";

export class MyRockSet extends CGFobject {
  constructor(scene, numRocks) {
    super(scene);
    this.scene = scene;
    this.numRocks = numRocks;
    this.numRows = 10; // Number of rows in the pyramid
    this.rocks = [];
    this.initRocks();
  }

  initRocks() {
    for (let i = 0; i < this.numRocks; i++) {
      const rock = new MyRock(this.scene, 20, 10);
      this.rocks.push(rock);
    }
  }

  display() {
    let totalRocksDisplayed = 0;
    const baseRadius = 5; // Base radius for the lowest row
    const radiusDecrement = 1; // Decrease in radius for each higher row

    for (let row = 0; row < this.numRows; row++) {
      const currentRadius = baseRadius - row * radiusDecrement;
      const rocksInRow = Math.max(1, this.numRocksInRow(row));
      const angleIncrement = (2 * Math.PI) / rocksInRow;

      for (let i = 0; i < rocksInRow; i++) {
        if (totalRocksDisplayed >= this.rocks.length) return;

        const rock = this.rocks[totalRocksDisplayed];
        const angle = i * angleIncrement;
        const x = currentRadius * Math.cos(angle);
        const z = currentRadius * Math.sin(angle);
        const y = row * 2; // Adjust the height as needed

        this.scene.pushMatrix();
        this.scene.translate(x, y, z);
        this.scene.scale(...rock.scale);
        this.scene.rotate(rock.rotation[0], 1, 0, 0);
        this.scene.rotate(rock.rotation[1], 0, 1, 0);
        this.scene.rotate(rock.rotation[2], 0, 0, 1);
        rock.display();
        this.scene.popMatrix();

        totalRocksDisplayed++;
      }
    }
  }

  numRocksInRow(row) {
    // Calculate the number of rocks in a row
    return this.numRows - row;
  }
}
