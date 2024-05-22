import { CGFobject } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyCylinder } from "./MyCylinder.js";
import {
  splatVec3,
  vec3_rotateX,
  vec3_angle,
  vec3_print,
  areCloseEnough,
} from "./common.js";

const COLLECTION_RADIUS = 3;
const DEFAULT_FLY_HEIGHT = 5;

export class MyBee extends CGFobject {
  constructor(scene) {
    super(scene);
    this.initBuffers();

    this.pollen = null;

    // Angle around the XY axis in radians. From 0 to 2π.
    this._speed = 0;
    this._orientation = 0;

    // Velocity is determined by orientation and speed.
    this._rotation = vec3.create();
    this._velocity = vec3.create();
    
    // Position is not to be modified directly, but by simulation of velocity
    // during time.
    this._position = vec3.fromValues(0, 5, 0);

    this._speedState = "ACCELERATING"; // OR "DECELERATING"

    this._debugDisplayCollectionSphere = false;
    this._debugCollectionSphere = new MySphere(scene);

    // Create three spheres for head, body, and abdomen
    this.head = new MySphere(scene, 20, 20);
    this.body = new MySphere(scene, 10, 10);
    this.abdomen = new MySphere(scene, 8, 8);

    //Create cylinders for legs
    this.bodyLegs = [];
    for (let i = 0; i < 2; i++) {
      this.bodyLegs.push(new MyCylinder(scene, 20, 1));
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
            this.scene.setAmbient(0, 0, 0, 1);
            this.scene.setDiffuse(0, 0, 0, 1); 
            this.scene.setSpecular(0, 0, 0, 1); 

            this.scene.pushMatrix();
            this.scene.translate(-0.25 + i*0.8, -0.5, -2); 
            this.scene.scale(0.1,0.1,1.5);

            this.bodyLegs[i].display();
            this.scene.popMatrix();
        }

         //Draw the legs attached to the abdomen
         for (let i = 0; i < 2; i++) { // Adjusted to loop only twice for the pairs of abdomen legs
            for (let j = 0; j < 2; j++) { // Loop to create legs in each pair
                this.scene.setAmbient(0, 0, 0, 1); 
                this.scene.setDiffuse(0, 0, 0, 1); 
                this.scene.setSpecular(0, 0, 0, 1);

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

  ascend(speedDelta) {
    this._position[1] += speedDelta * 10;
  }

  // Get the unit rotation vector. It will always be perpendicular to the XZ
  // plane.
  rotation() {
    return vec3.fromValues(
      Math.cos(this._orientation),
      0,
      -Math.sin(this._orientation)
    );
  }

  accelerate(speedDelta) {
    this._speed += speedDelta;
    if (speedDelta > 0) {
      this._speedState = "ACCELERATING";
    } else {
      this._speedState = "DECELERATING";
    }
  }

  turn(radians) {
    if (this._speedState == "ACCELERATING") {
      this._orientation += radians;
    } else if (this._speedState == "DECELERATING") {
      this._orientation -= radians;
    } else {
      console.error("Invalid speed state: " + this._speedState);
    }
  }

  update(dt) {
    // Perform movement by physics simulation
    {
      vec3.normalize(this._velocity, this._velocity);
      // Normalize orientation
      this._orientation = this._orientation % (Math.PI * 2);
      // First, compute the new rotation vector.
      vec3.normalize(this._rotation, this.rotation());

      // Then, compute the new velocity vector.
      vec3.dot(this._velocity, this._velocity, this._rotation);
      this._velocity[0] = this._rotation[0] * this._speed;
      this._velocity[1] = this._rotation[1] * this._speed;
      this._velocity[2] = this._rotation[2] * this._speed;

      //     console.log(`Bee.update():
      // orientation: ${(this._orientation * (180 / Math.PI)).toFixed(2)}°
      // speed: ${this._speed.toFixed(2)}
      // velocity: ${vec3_print(this._velocity)}`);
      vec3.add(this._position, this._position, this._velocity);
    }

    // Detect collisions
    {
      for (const flower of this.scene.myGarden.flowers) {
        const insideX = areCloseEnough(flower.position[0], this._position[0], COLLECTION_RADIUS);
        const insideY = areCloseEnough(flower.position[1], this._position[1], COLLECTION_RADIUS);
        const insideZ = areCloseEnough(flower.position[2], this._position[2], COLLECTION_RADIUS);
        if (insideX && insideY && insideZ) {
          if (flower.pollen != null) {
            this.pollen = flower.pollen;
            flower.pollen = null;
          }
        }
      }

      for (const hive of this.scene.hives) {
        const insideX = areCloseEnough(hive.position[0], this._position[0], COLLECTION_RADIUS);
        const insideY = areCloseEnough(hive.position[1], this._position[1], COLLECTION_RADIUS);
        const insideZ = areCloseEnough(hive.position[2], this._position[2], COLLECTION_RADIUS);
        if (insideX && insideY && insideZ) {
          if (this.pollen != null) {
            hive.pollens.push(this.pollen);
            this.pollen = null;
          }
        }
      }
    }
  }

  /// Move the bee to the center and stop all movement.
  reset() {
    vec3.set(this._position, 0, 0, 0);
    vec3.set(this._velocity, 0, 0, 0);
    this._orientation = 0;
    this._speed = 0;
  }

  display() {
    this.scene.pushMatrix();
    this.scene.translate(...splatVec3(this._position));
    this.scene.rotate(this._orientation, 0, 1, 0);

    if (this._debugDisplayCollectionSphere) {
      this.scene.pushMatrix();
      this.scene.scale(COLLECTION_RADIUS, COLLECTION_RADIUS, COLLECTION_RADIUS);
      this._debugCollectionSphere.display();
      this.scene.popMatrix();
    }

    // Set the bee in the correct orientation
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.rotate(-Math.PI / 2, 0, 0, 1);
    this.scene.translate(0, 1.5, 0.5);

    this.scene.beeAppearance.apply();

    // Draw the head
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0); // Adjust position as needed
    this.scene.scale(0.7, 0.7, 0.7);
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
    this.scene.scale(1.0, 1.0, 2.0);
    this.abdomen.display();
    this.scene.popMatrix();

    //Draw the legs attached to the body
    for (let i = 0; i < 2; i++) {
      this.scene.setAmbient(0, 0, 0, 1); // Black ambient color
      this.scene.setDiffuse(0, 0, 0, 1); // Black diffuse color
      this.scene.setSpecular(0, 0, 0, 1); // Black specular color

      this.scene.pushMatrix();
      this.scene.translate(-0.25 + i * 0.8, -0.5, -2);
      this.scene.scale(0.1, 0.1, 1.5);

      this.bodyLegs[i].display();
      this.scene.popMatrix();
    }

    //Draw the legs attached to the abdomen
    for (let i = 0; i < 2; i++) {
      // Adjusted to loop only twice for the pairs of abdomen legs
      for (let j = 0; j < 2; j++) {
        // Loop to create legs in each pair
        this.scene.setAmbient(0, 0, 0, 1); // Black ambient color
        this.scene.setDiffuse(0, 0, 0, 1); // Black diffuse color
        this.scene.setSpecular(0, 0, 0, 1); // Black specular color

        this.scene.pushMatrix();
        // Position the legs at the abdomen on both sides of the bee
        this.scene.translate(-0.5 + i * 0.8, -3 - j, -2); // Adjusted translation for positioning legs on both sides of the abdomen
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

    // Draw the pollen (if any)
    if (this.pollen != null) {
      this.scene.pushMatrix();
      this.scene.translate(0, -0.5, -2);
      this.pollen.display();
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

    super.display();

    this.scene.popMatrix();
  }

  initBuffers() {
    this.vertices = [
      0,
      0,
      0,
      this.rotation[0] * 3,
      this.rotation[1] * 3,
      this.rotation[2] * 3,
    ];

    this.indices = [0, 1];

    this.primitiveType = this.scene.gl.LINES;
    this.initGLBuffers();
  }
}
