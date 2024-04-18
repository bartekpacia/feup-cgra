import { CGFobject } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyCylinder } from "./MyCylinder.js";

export class MyFlower extends CGFobject {

    constructor(scene, petalCount) {
        super(scene);
        this.initBuffers();

        this.scene = scene;
        this.petalCount = petalCount;

        this.sphere = new MySphere(scene, 16, 8);
        const halePartsCount = 5;
        this.haleParts = [];
        for (let i = 0; i < halePartsCount; i++) {
            this.haleParts.push(new MyCylinder(scene, 20, 20));
        }

        this.triangles = [];
        for (let i = 0; i < this.petalCount; i++) {
            this.triangles.push(new MyTriangle(scene))
        }
    }

    display() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        this.scene.pushMatrix();
        // this.scene.sphereAppearance.apply();
        this.scene.translate(0, 0, 0);
        this.sphere.display();
        this.scene.popMatrix();

        for (let i = 0; i < this.triangles.length; i++) {
            const triangle = this.triangles[i];
            const increment = (Math.PI * 2) / this.petalCount;
            const rotation = increment * i;
            this.scene.pushMatrix();
            //this.scene.translate(1 + 0.5, 0, 1 + 0.5);
            this.scene.rotate(rotation, 0, 1, 0);
            triangle.display();
            this.scene.popMatrix();
        }

        for (let i = 0; i < this.haleParts.length; i++) {
            const y = 0 - (i * 1.1);
            const halePart = this.haleParts[i];
            this.scene.pushMatrix();
            this.scene.translate(0, y, 0);
            this.scene.scale(0.3, 1, 0.3);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            halePart.display();
            this.scene.popMatrix();
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

}

class Petal extends CGFobject {
    constructor(scene, petalCount) {
        super(scene);
        this.initBuffers();

        this.scene = scene;

        this.firstTriangle = new MyTriangle(scene);
        this.second = new MyTriangle(scene);
    }

    display() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        this.scene.pushMatrix();
        // this.scene.sphereAppearance.apply();
        this.scene.translate(0, 0, 0);
        this.sphere.display();
        this.scene.popMatrix();

        for (let i = 0; i < this.triangles.length; i++) {
            const triangle = this.triangles[i];
            const increment = (Math.PI * 2) / this.petalCount;
            const rotation = increment * i;
            this.scene.pushMatrix();
            //this.scene.translate(1 + 0.5, 0, 1 + 0.5);
            this.scene.rotate(rotation, 0, 1, 0);
            triangle.display();
            this.scene.popMatrix();
        }

        for (let i = 0; i < this.haleParts.length; i++) {
            const y = 0 - (i * 1.1);
            const halePart = this.haleParts[i];
            this.scene.pushMatrix();
            this.scene.translate(0, y, 0);
            this.scene.scale(0.3, 1, 0.3);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            halePart.display();
            this.scene.popMatrix();
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
