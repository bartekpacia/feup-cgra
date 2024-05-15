import { CGFobject } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";

export class MyBee extends CGFobject {
    constructor(scene) {
        super(scene);

        // Create spheres for head, body, and abdomen
        this.head = new MySphere(scene, 20, 20);
        this.body = new MySphere(scene, 10, 10);
        this.abdomen = new MySphere(scene, 8, 8);
    }

    display() {
        // Draw the head
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0); // Adjust position as needed
       this.scene.scale(0.7,0.7,0.7);
        this.head.display();
        this.scene.popMatrix();

        // Draw the body
        this.scene.pushMatrix();
        this.scene.translate(0, -1, 0); // Adjust position as needed
        //this.scene.scale(1,1,1);
        this.body.display();
        this.scene.popMatrix();

        // Draw the abdomen
        this.scene.pushMatrix();
        this.scene.translate(0, -3, 0); // Adjust position as needed
        this.scene.scale(1.5,1.5,1.5);
        this.abdomen.display();
        this.scene.popMatrix();
    }
}
