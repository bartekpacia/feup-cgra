import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";

export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();

        this.diamond = new MyDiamond(this.scene);
        this.pinkTriangle = new MyTriangle(this.scene, [0, 0.5,
                                                        0,  1,
                                                        0.5, 1]);

        this.blueTriangle = new MyTriangle(this.scene, [0,   0,
                                                        0.5, 0.5,
                                                        1,   0]);

        this.orangeTriangle = new MyTriangle(this.scene, [1,   0,
                                                          0.5, 0.5,
                                                          1,   1,]);

        this.redTriangle = new MyTriangle(this.scene, [0.5,  0.5,
                                                       0.25, 0.75,
                                                       0.75, 0.75]);

        this.purpleTriangle = new MyTriangle(this.scene, [0,    0,
                                                          0,    0.5,
                                                          0.25, 0.25]);

        this.parallelogram = new MyParallelogram(this.scene, [0.25, 0.75,
                                                              0.5,  1,
                                                              1,    1,
                                                              0.75, 0.75,]);
        this.initMaterials();
	}

    initMaterials() {
        this.cutoutTangramMaterial = new CGFappearance(this.scene);
        this.cutoutTangramMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.cutoutTangramMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.cutoutTangramMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.cutoutTangramMaterial.setShininess(10.0);
        this.cutoutTangramMaterial.loadTexture('images/tangram.png');
        this.cutoutTangramMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
        // GREEN DIAMOND
        const translationMatrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            2.5, 4, 0, 1,
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
        this.cutoutTangramMaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();

        // PINK TRIANGLE
        this.scene.pushMatrix();
        this.scene.scale(1.5, 1.5, 1);
        this.scene.translate(1, 1, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.cutoutTangramMaterial.apply();
        this.pinkTriangle.display();
        this.scene.popMatrix();

        // BLUE TRIANGLE
        this.scene.pushMatrix();
        this.scene.scale(2, 2, 1);
        this.scene.translate(1, -1, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.cutoutTangramMaterial.apply();
        this.blueTriangle.display();
        this.scene.popMatrix();

        // ORANGE TRIANGLE
        this.scene.pushMatrix();
        this.scene.scale(2, 2, 1);
        this.cutoutTangramMaterial.apply();
        this.orangeTriangle.display();
        this.scene.popMatrix();

        // RED TRIANGLE
        this.scene.pushMatrix();
        this.scene.translate(-3, 1, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.cutoutTangramMaterial.apply();
        this.redTriangle.display();
        this.scene.popMatrix();

        // PURPLE TRIANGLE
        this.scene.pushMatrix();
        this.scene.translate(-0.5, -3, 0);
        this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.cutoutTangramMaterial.apply();
        this.purpleTriangle.display();
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
        this.cutoutTangramMaterial.apply();
        this.parallelogram.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.triangle.enableNormalViz();
    }

    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.triangle.disableNormalViz();
    }
}
