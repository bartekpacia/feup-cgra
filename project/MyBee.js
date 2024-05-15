import { CGFobject } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyCylinder } from "./MyCylinder.js"


export class MyBee extends CGFobject {
    constructor(scene) {
        super(scene);

        // Create three spheres for head, body, and abdomen
        this.head = new MySphere(scene, 20, 20);
        this.body = new MySphere(scene, 10, 10);
        this.abdomen = new MySphere(scene, 8, 8);

        //Create cylinders for legs
        this.bodyLegs = [];
        for (let i = 0; i < 2; i++){
            this.bodyLegs.push(new MyCylinder(scene, 20,1))
        }

        this.abdomenLegs = [];
        for(let i = 0; i < 4; i++){
            this.abdomenLegs.push(new MyCylinder(scene, 20,1));
        }

       //Create cylinders for antennae
        this.antennae = [];
        for (let i = 0; i < 2; i++) {
            this.antennae.push(new MyCylinder(scene, 20, 1)); // Adjust parameters as needed
        }

       //Create spheres for eyes
        this.eyes = [];
        for (let i = 0; i < 2; i++) {
            this.eyes.push(new MySphere(scene, 20, 20)); // Adjust parameters as needed
        }

        //Create the wings using petals from MyFlower
        // this.wings = [];
        // for(let i = 0; i < 2; i++){
        //     this.wings.push(new Petal(scene, 3, 0,[1,1,1]));
        // }

    }

    display() {
        // Draw the head
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0); // Adjust position as needed
       this.scene.scale(0.7,0.7,0.7);
        this.scene.rotate(Math.PI / 2.0, 1, 0, 0);
        this.head.display();
        this.scene.popMatrix();

        // Draw the body
        this.scene.pushMatrix();
        this.scene.translate(0, -1, 0); // Adjust position as needed
        this.scene.rotate(Math.PI / 2.0, 1, 0, 0);
        this.body.display();
        this.scene.popMatrix();

        // Draw the abdomen
        this.scene.pushMatrix();
        this.scene.translate(0, -3.5, 0); // Adjust position as needed
        this.scene.rotate(Math.PI / 2.0, 1, 0, 0);
        this.scene.scale(1.0,1.0,2.0);
        this.abdomen.display();
        this.scene.popMatrix();

        //Draw the legs attached to the body
        for(let i = 0; i < 2; i++){
            this.scene.setAmbient(0, 0, 0, 1); // Black ambient color
            this.scene.setDiffuse(0, 0, 0, 1); // Black diffuse color
            this.scene.setSpecular(0, 0, 0, 1); // Black specular color

            this.scene.pushMatrix();
            this.scene.translate(-0.25 + i*0.8, -0.5, -2); 
            this.scene.scale(0.1,0.1,1.5);

            this.bodyLegs[i].display();
            this.scene.popMatrix();
        }

         //Draw the legs attached to the abdomen
         for (let i = 0; i < 2; i++) { // Adjusted to loop only twice for the pairs of abdomen legs
            for (let j = 0; j < 2; j++) { // Loop to create legs in each pair
                this.scene.setAmbient(0, 0, 0, 1); // Black ambient color
                this.scene.setDiffuse(0, 0, 0, 1); // Black diffuse color
                this.scene.setSpecular(0, 0, 0, 1); // Black specular color

                this.scene.pushMatrix();
                // Position the legs at the abdomen on both sides of the bee
                this.scene.translate(-0.5 + i * 0.8, -3-j, -2); // Adjusted translation for positioning legs on both sides of the abdomen
                this.scene.scale(0.1, 0.1, 2); // Taper the legs if needed
                this.abdomenLegs[i * 2 + j].display(); // Adjusted index to access abdomenLegs array correctly
                this.scene.popMatrix();
            }
        }

        //Draw the antennae attached to the head
        for (let i = 0; i < 2; i++) {

            this.scene.setAmbient(0, 0, 0, 1); 
            this.scene.setDiffuse(0, 0, 0, 1); 
            this.scene.setSpecular(0, 0, 0, 1); 

            this.scene.pushMatrix();
            this.scene.translate(-0.5 + i * 0.8, 0, 0);
            this.scene.scale(0.05, 0.05, 1.5);
            this.antennae[i].display();
            this.scene.popMatrix();
        }

        //Draw the eyes attached to the head
        for (let i = 0; i < 2; i++) {

            this.scene.setAmbient(0.0, 0, 0, 1); // Brownish color
            this.scene.setDiffuse(0, 0, 0, 1); // Brownish color
            this.scene.setSpecular(0, 0, 0, 1); // Brownish color
            this.scene.setShininess(100); // Adjust shininess as needed for a very shiny appearance
            
            this.scene.pushMatrix();
            this.scene.translate(-0.5 + i * 1, 0.3, 0);
            this.scene.scale(0.25, 0.25, 0.25);
            this.eyes[i].display();
            this.scene.popMatrix();
        }
        
        //Draw the bee's wings
            // for (let i = 0; i < this.wings.length; i++) {
            // const increment = (Math.PI*2)/this.wings.length;
            // const rotation = increment * i;

            // this.scene.pushMatrix();
            // this.scene.rotate(rotation, 0, 1, 0);

            // this.scene.translate(0,0,0.5); 
            // ///this.scene.scale(0.1,0.1,1.5);
            // this.wings[i].display();
            // this.scene.popMatrix();

            }
       
    }

