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

    this.abdomenLegs = [];
    for (let i = 0; i < 4; i++) {
      this.abdomenLegs.push(new MyCylinder(scene, 20, 1));
    }

