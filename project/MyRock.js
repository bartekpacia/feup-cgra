import { CGFobject } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";

export class MyRock extends CGFobject {
    constructor(scene) {
        super(scene);

        // Create a new instance of MySphere with desired slices and stacks
        this.sphere = new MySphere(scene, 30, 20);

        for (let i = 0; i < this.sphere.vertices.length; i += 3) {
            
            // Perturb vertices along normals with random displacement
            this.sphere.vertices[i] += (Math.random() - 0.5) * 0.5; 
            this.sphere.vertices[i + 1] += (Math.random() - 0.5) * 0.5; 
            this.sphere.vertices[i + 2] += (Math.random() - 0.5) * 0.5; 
        }

        // Initialize any necessary variables here
    }

    display() {
        // Draw the sphere representing the rock
        this.sphere.display();
    }
}
