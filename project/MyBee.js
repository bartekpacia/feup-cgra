import { CGFobject } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyCylinder } from "./MyCylinder.js";
import { splatVec3, vec3_rotateX, vec3_angle, vec3_print } from "./common.js";

export class MyBee extends CGFobject {
  constructor(scene) {
    super(scene);
    this.initBuffers();

    // Position is not to be modified directly, but by simulation.
    this._position = vec3.create();

    // Angle around the XY axis in radians. From 0 to 2π.
    this._orientation = 0;
    this._velocity = vec3.create();

    // Create three spheres for head, body, and abdomen
    this.head = new MySphere(scene, 20, 20);
    this.body = new MySphere(scene, 10, 10);
    this.abdomen = new MySphere(scene, 8, 8);

    //Create cylinders for legs
    this.bodyLegs = [];
    for (let i = 0; i < 2; i++) {
      this.bodyLegs.push(new MyCylinder(scene, 20, 1));
    }

    this.abdomenLegs = [];
    for (let i = 0; i < 4; i++) {
      this.abdomenLegs.push(new MyCylinder(scene, 20, 1));
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

  // Get the unit rotation vector. It will always be perpendicular to the XZ
  // plane.
  rotation() {
    return vec3.fromValues(
      Math.cos(this._orientation),
      0,
      -Math.sin(this._orientation),
    );
  }

  accelerate(speedDelta) {
    // console.log(`Bee.accelerate(): speedDelta: ${speedDelta}`);
    // if (this._velocity[0] == 0 && this._velocity[1] == 0 && this._velocity[2] == 0) {

    const normalizedRotation = vec3.create();
    vec3.normalize(normalizedRotation, this.rotation());
    normalizedRotation[0] = normalizedRotation[0] * speedDelta;
    normalizedRotation[1] = normalizedRotation[1] * speedDelta;
    normalizedRotation[2] = normalizedRotation[2] * speedDelta;

    this._velocity[0] = this._velocity[0] + normalizedRotation[0];
    this._velocity[1] = this._velocity[1] + normalizedRotation[1];
    this._velocity[2] = this._velocity[2] + normalizedRotation[2];

    // normalizedRotation.add(normalizedRotation, normalizedRotation, ACC);

    // vec3.set(
    //     this._velocity + ,
    //     this._velocity[0],
    //     this._velocity[1],this._velocity[2] + 0.1 * speedDelta);

    // TODO: Multiply velocity matrix. Do not modify position.

    // mat4.rotateY(

    // );
    // rotate(a,x,y,z){mat4.rotate(this.activeMatrix,this.activeMatrix,a,[x,y,z])}
  }

  turn(radians) {
    // console.log(`Bee.turn(): radians: ${radians}`);
    this._orientation += radians;

    // mat4.rotateY(this.rotation, this.rotation);

    // vec3.rotateY(
    //     this._velocity,
    //     this._velocity,
    //     this._position,
    //     this._orientation,
    // );

    // TODO: Recalculate "velocity" vector
  }

  /// Like display, but only for modifying state variables.
  update() {
    const normalizedVelocity = vec3.create();
    vec3.normalize(normalizedVelocity, this._velocity);

    const angleDiff = vec3_angle(this._velocity, this.rotation());
    console.log(`Bee.update():
    velocity: ${vec3_print(this._velocity)}
    rotation: ${vec3_print(this.rotation())}
    angleDiff: ${angleDiff.toFixed(2)}`
    );
    // vec3_rotateX(this._velocity, this._velocity, this._position, angleDiff);
    vec3.add(this._position, this._position, this._velocity);
    // console.log(`Bee.update(): pos: ${this._position}, vel: ${this._velocity}`);
  }

  /// Move the bee to the center and stop all movement.
  reset() {
    console.log(`Bee.reset()`);
    vec3.set(this._position, 0, 0, 0);
    vec3.set(this._velocity, 0, 0, 0);
    this._orientation = 0;
  }

  display() {
    this.scene.beeAppearance.apply();

    this.scene.pushMatrix();
    this.scene.translate(...splatVec3(this._position));
    this.scene.rotate(this._orientation, 0, 1, 0);

    // Set the bee in the correct orientation
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.scene.rotate(-Math.PI / 2, 0, 0, 1);
    this.scene.translate(0, 1.5, 0.5);

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
        0, 0, 0,
        this.rotation[0] * 3, this.rotation[1] * 3, this.rotation[2] * 3,
    ]

    this.indices = [0, 1];

    this.primitiveType = this.scene.gl.LINES;
	this.initGLBuffers();
  }
}
