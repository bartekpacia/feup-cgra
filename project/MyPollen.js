import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MySphere } from "./MySphere.js";

export class MyPollen extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();

        this.sphere = new MySphere(this.scene);
        this.pollenAppearance = new CGFappearance(this.scene);
        this.pollenAppearance.setTexture(this.scene.pollenTexture);
        this.pollenAppearance.setTextureWrap("REPEAT", "REPEAT");
	}

    display() {
        this.pollenAppearance.apply();
        this.scene.pushMatrix();
        this.scene.scale(1, 1, 1.3);
        this.scene.scale(0.3, 0.3, 0.3);
        this.sphere.display();
        this.scene.popMatrix();
    }
}
