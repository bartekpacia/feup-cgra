import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

export class Hive extends CGFobject {
	constructor(scene, position) {
		super(scene);
		this.initBuffers();

        this.position = position;
        this.pollens = [];

        this.mat = new CGFappearance(this.scene);
        this.mat.setAmbient(0.1, 0.1, 0.1, 1);
        this.mat.setDiffuse(0.9, 0.9, 0.9, 1);
        this.mat.setSpecular(0.1, 0.1, 0.1, 1);
        this.mat.setShininess(5);

        this.bottom = new MyQuad(this.scene);
        this.top = new MyQuad(this.scene);
        this.front = new MyQuad(this.scene)
        this.right = new MyQuad(this.scene)
        this.back = new MyQuad(this.scene)
        this.left = new MyQuad(this.scene)
	}

    display() {
        this.mat.apply();

        this.scene.pushMatrix();

        // this.scene.scale(3, 3, 3);
        this.scene.translate(...this.position);

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

        for (const pollen of this.pollens) {
            this.scene.translate(0, 0.5, 0.5);
            pollen.display();
        }

        this.scene.popMatrix();
    }
}
