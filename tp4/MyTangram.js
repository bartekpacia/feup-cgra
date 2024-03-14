import { CGFappearance, CGFobject } from '../lib/CGF.js';
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
        this.initMaterials();
	}

    initMaterials() {
        this.greenDiamondMaterial = new CGFappearance(this.scene);
        this.greenDiamondMaterial.setAmbient(0, 0.25, 0, 1);
        this.greenDiamondMaterial.setDiffuse(0, 0.25, 0, 1);
        this.greenDiamondMaterial.setSpecular(1, 1, 1, 1);

        this.pinkTriangleMaterial = new CGFappearance(this.scene);
        this.pinkTriangleMaterial.setAmbient(1, 192/255, 204/255, 1);
        this.pinkTriangleMaterial.setDiffuse(1, 192/255, 204/255, 1);
        this.pinkTriangleMaterial.setSpecular(1, 1, 1, 1);

        this.blueTriangleMaterial = new CGFappearance(this.scene);
        this.blueTriangleMaterial.setAmbient(0, 0, 1, 1);
        this.blueTriangleMaterial.setDiffuse(0, 0, 1, 1);
        this.blueTriangleMaterial.setSpecular(1, 1, 1, 1);

        this.orangeTriangleMaterial = new CGFappearance(this.scene);
        this.orangeTriangleMaterial.setAmbient(1, 165 / 255, 0, 1);
        this.orangeTriangleMaterial.setDiffuse(1, 165 / 255, 0, 1);
        this.orangeTriangleMaterial.setSpecular(1, 1, 1, 1);

        this.redTriangleMaterial = new CGFappearance(this.scene);
        this.redTriangleMaterial.setAmbient(1, 0, 0, 1);
        this.redTriangleMaterial.setDiffuse(1, 0, 0, 1);
        this.redTriangleMaterial.setSpecular(1, 1, 1, 1);

        this.purpleTriangleMaterial = new CGFappearance(this.scene);
        this.purpleTriangleMaterial.setAmbient(0.5, 0, 0.5, 1);
        this.purpleTriangleMaterial.setDiffuse(0.5, 0, 0.5, 1);
        this.purpleTriangleMaterial.setSpecular(1, 1, 1, 1);

        this.yellowParallelogramMaterial = new CGFappearance(this.scene);
        this.yellowParallelogramMaterial.setAmbient(1, 1, 0, 1);
        this.yellowParallelogramMaterial.setDiffuse(1, 1, 0, 1);
        this.yellowParallelogramMaterial.setSpecular(1, 1, 1, 1);
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
        this.greenDiamondMaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();

        // PINK TRIANGLE
        this.scene.pushMatrix();
        this.scene.scale(1.5, 1.5, 1);
        this.scene.translate(1, 1, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.pinkTriangleMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();

        // BLUE TRIANGLE
        this.scene.pushMatrix();
        this.scene.scale(2, 2, 1);
        this.scene.translate(1, -1, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.blueTriangleMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();

        // ORANGE TRIANGLE
        this.scene.pushMatrix();
        this.scene.scale(2, 2, 1);
        this.orangeTriangleMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();

        // RED TRIANGLE
        this.scene.pushMatrix();
        this.scene.translate(-3, 1, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.redTriangleMaterial.apply();
        this.triangle.display();
        this.scene.popMatrix();

        // PURPLE TRIANGLE
        this.scene.pushMatrix();
        this.scene.translate(-0.5, -3, 0);
        this.scene.rotate(-Math.PI / 2, 0, 0, 1);
        this.purpleTriangleMaterial.apply();
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
        this.yellowParallelogramMaterial.apply();
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
