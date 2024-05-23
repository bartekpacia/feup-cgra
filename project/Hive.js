import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyUnitCube } from '../tp3/MyUnitCube.js';
import { MyUnitCubeWithOpening } from './MyUnitCubeWithOpening.js';

export class Hive extends CGFobject {
	constructor(scene, position) {
		super(scene);
		this.initBuffers();

        this.position = position;
        this.bottomHeight = 1.5;
        this.lidHeight = 0.2;
        this.box = new MyUnitCubeWithOpening(scene);
        this.lid = new MyUnitCube(scene);
        this.pollens = [];
	}

    display() {
        this.scene.pushMatrix();

        this.scene.translate(...this.position);

        // Display the bottom with an opening
        this.scene.pushMatrix();
        this.scene.scale(1, this.bottomHeight, 1); // Scale the bottom box to the specified height
        this.box.display();
        this.scene.popMatrix();

        // Display the lid
        this.scene.pushMatrix();
        this.scene.translate(0, this.bottomHeight * 0.5 + this.lidHeight * 0.5, 0);  // Position the lid on top of the bottom box
        this.scene.scale(1.2, this.lidHeight, 1.2); // Scale the lid slightly larger than the bottom and to the specified height
        this.lid.display();
        this.scene.popMatrix();

        for (const pollen of this.pollens) {
            this.scene.translate(0, 0.5, 0.5);
            pollen.display();
        }

        this.scene.popMatrix();
    }
}
