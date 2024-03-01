import { CGFobject } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";

export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();

        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
	}

    display() {
        // super.display(); - commented out to ignore the default object

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

        this.scene.pushMatrix();
        this.scene.multMatrix(translationMatrix);
        this.scene.multMatrix(scaleMatrix);
        this.scene.setDiffuse(0, 1, 0, 1);
        this.diamond.display();
        this.scene.popMatrix();

        // PINK TRIANGLE
        this.scene.pushMatrix();
        this.scene.scale(1.5, 1.5, 1);
        this.scene.translate(1, 1, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.setDiffuse(1, 192/255, 204/255, 1);
        this.triangle.display();
        this.scene.popMatrix();

        // BLUE TRIANGLE
        this.scene.pushMatrix();
        this.scene.scale(2, 2, 1);
        this.scene.translate(1, -1, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.setDiffuse(0, 0, 1, 1);
        this.triangle.display();
        this.scene.popMatrix();

        // ORANGE TRIANGLE
        this.scene.pushMatrix();
        this.scene.scale(2, 2, 1);
        this.scene.setDiffuse(1, 165 / 255, 0, 1);
        this.triangle.display();
        this.scene.popMatrix();

        // RED TRIANGLE
        this.scene.pushMatrix();
        this.scene.translate(-3, 1, 0.1);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.setDiffuse(1, 0, 0, 1);
        this.triangle.display();
        this.scene.popMatrix();

        // PURPLE TRIANGLE
        this.scene.pushMatrix();
        this.scene.translate(-0.5, -3, 0.1);
        this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.scene.setDiffuse(0.5, 0, 0.5, 1);
        this.triangle.display();
        this.scene.popMatrix();

        // YELLOW PARALLELOGRAM
        const reflectionMatrix = [
        1,  0,  0,  0,
        0, -1,  0,  0,
        0,  0,  1,  0,
        0,  0,  0,  1,
        ];

        this.scene.pushMatrix();
        this.scene.translate(4, -0.5, 0);
        this.scene.multMatrix(reflectionMatrix);
        this.scene.rotate(-Math.PI / 6, 0, 0, 1);
        this.scene.setDiffuse(1, 1, 0, 1);
        this.parallelogram.display();
        this.scene.popMatrix();
    }
}
