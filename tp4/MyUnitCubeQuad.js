import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

export class MyUnitCubeQuad extends CGFobject {
    constructor(scene, textures) {
        super(scene);
        this.textures = textures;
        this.initBuffers();

        this.quad = new MyQuad(this.scene);

        this.bottomMaterial = new CGFappearance(this.scene);
        this.bottomMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.bottomMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.bottomMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.bottomMaterial.setShininess(10.0);
        this.bottomMaterial.loadTexture(textures.bottom);
        this.bottomMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.topMaterial = new CGFappearance(this.scene);
        this.topMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.topMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.topMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.topMaterial.setShininess(10.0);
        this.topMaterial.loadTexture(textures.top);
        this.topMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.sideMaterial = new CGFappearance(this.scene);
        this.sideMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.sideMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.sideMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.sideMaterial.setShininess(10.0);
        this.sideMaterial.loadTexture(textures.side);
        this.sideMaterial.setTextureWrap('REPEAT', 'REPEAT');
	}

    display() {
        // super.display(); // commented out to ignore the default object

        // TOP
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.topMaterial.apply();
        this.quad.display();
        this.scene.popMatrix();

        // BOTTOM
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0)
        this.bottomMaterial.apply();
        this.quad.display();
        this.scene.popMatrix();

        // FRONT
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.sideMaterial.apply();
        this.quad.display();
        this.scene.popMatrix();

        // RIGHT
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.sideMaterial.apply();
        this.quad.display();
        this.scene.popMatrix();

        // BACK
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.sideMaterial.apply();
        this.quad.display();
        this.scene.popMatrix();

        // LEFT
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.sideMaterial.apply();
        this.quad.display();
        this.scene.popMatrix();
    }
}
