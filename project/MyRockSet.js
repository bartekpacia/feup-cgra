import { CGFobject } from "../lib/CGF.js";
import { MyRock } from "./MyRock.js";

export class MyRockSet extends CGFobject {
  constructor(scene, numRocks) {
    super(scene);
    this.numRocks = numRocks;
    this.numRows = 4;
    this.totalRocks = 13;
    this.currentRow = 0;
    this.rocks = [];
    this.initRocks();
  }

  initRocks() {
    for (let i = 0; i < this.numRocks; i++) {
      const rock = new MyRock(this.scene, 20, 10); 
      rock.setPosition(this.getRandomPosition());
      rock.setScale(this.getRandomScale());
      rock.setRotation(this.getRandomRotation());
      this.rocks.push(rock);
    }
  }

  getRandomPosition() {
    const x = Math.random() * 10 - 5; 
    const y = Math.random() * 5;
    const z = Math.random() * 10 - 5; 
    return [x, y, z];
  }

  getRandomScale() {
    const scaleX = Math.random() * 2 + 1;
    const scaleY = Math.random() * 2 + 1; 
    const scaleZ = Math.random() * 2 + 1; 
    return [scaleX, scaleY, scaleZ];
  }

  getRandomRotation() {
    const angleX = Math.random() * Math.PI * 2; 
    const angleY = Math.random() * Math.PI * 2; 
    const angleZ = Math.random() * Math.PI * 2; 
    return [angleX, angleY, angleZ];
  }

  display() {
    let totalRocksDisplayed = 0;
    let rowZ = 0;
    for (let row = this.numRows; row > 0; row--) {
      const offsetX = (row - 1) * -0.5;
      const offsetY = (this.numRows - row) * 2;
      for (let i = 0; i < row; i++) {
        if (totalRocksDisplayed >= this.rocks.length) return;
  
        const rock = this.rocks[totalRocksDisplayed];
        this.scene.pushMatrix();
        this.scene.translate(i + offsetX, offsetY, rowZ);
        rock.display();
        this.scene.popMatrix();
  
        totalRocksDisplayed++;
      }
      rowZ++;
    }
  }
  
  
}
