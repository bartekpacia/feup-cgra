import { CGFobject } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyQuad } from './MyQuad.js';

export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();

        this.bottom = new MyQuad(this.scene);
        this.top = new MyQuad(this.scene);
        this.front = new MyQuad(this.scene)
        this.right = new MyQuad(this.scene)
        this.back = new MyQuad(this.scene)
        this.left = new MyQuad(this.scene)
	}

    display() {
        // super.display(); // commented out to ignore the default object

        // BOTTOM
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0)
        this.bottom.display();
        this.scene.popMatrix();

        // TOP
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.top.display();
        this.scene.popMatrix();

        // FRONT
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.top.display();
        this.scene.popMatrix();

        // RIGHT
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.top.display();
        this.scene.popMatrix();

        // BACK
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.top.display();
        this.scene.popMatrix();

        // LEFT
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.top.display();
        this.scene.popMatrix();
    }
}
