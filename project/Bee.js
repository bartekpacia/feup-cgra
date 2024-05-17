import { CGFobject } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { splatVec3 } from "./common.js";

// This is MyUnitCube .
export class Bee extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();

        // Position is not to be modified directly, but by simulation.
        this._position = vec3.create();

        // Angle around the XY axis in radians. From 0 to 2π.
        this._orientation = 0;
        this._velocity = vec3.create();
        this.rotation = mat4.create(); mat4.identity(this.rotation);

        // the two spheres imitate the eyes of the bee
        this.leftEye = new MySphere(this.scene);
        this.rightEye = new MySphere(this.scene);
	}
    
    accelerate(speedDelta) {
        console.log(`Bee.accelerate(): speedDelta: ${speedDelta}`);
        vec3.set(this._velocity, this._velocity[0], this._velocity[1], this._velocity[2] + 0.1 * speedDelta);

        // TODO: Multiply velocity matrix. Do not modify position.

        

        // mat4.rotateY(

        // );
        // rotate(a,x,y,z){mat4.rotate(this.activeMatrix,this.activeMatrix,a,[x,y,z])}
    }

    turn(radians) {
        console.log(`Bee.turn(): radians: ${radians}`);
        this._orientation += radians;

        mat4.rotateY(this.rotation, this.rotation);

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
        vec3.add(this._position, this._position, this._velocity);
        console.log(`Bee.update(): pos: ${this._position}, vel: ${this._velocity}`);
    }

    /// Move the bee to the center and stop all movement.
    reset() {
        console.log(`Bee.reset()`);
        vec3.set(this._position, 0, 0, 0);
        vec3.set(this._velocity, 0, 0, 0);
        this._orientation = 0;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(...splatVec3(this._position));
        this.scene.rotate(this._orientation, 0, 1, 0);
        
        this.scene.pushMatrix();
        this.scene.translate(-0.3, 0.6, -0.5);
        this.scene.scale(0.1, 0.1, 0.1);
        this.leftEye.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0.3, 0.6, -0.5);
        this.scene.scale(0.1, 0.1, 0.1);
        this.rightEye.display();
        this.scene.popMatrix();

        super.display();

        this.scene.popMatrix();
    }

	initBuffers() {
	    this.vertices = [
            // BOTTOM (0-3)
            -0.5, -0.5,  0.5,
             0.5, -0.5,  0.5,
             0.5, -0.5, -0.5,
            -0.5, -0.5, -0.5,
            // FRONT (4-7)
            -0.5, -0.5, 0.5,
             0.5, -0.5, 0.5,
             0.5,  0.5, 0.5,
            -0.5,  0.5, 0.5,
            // RIGHT (8-11)
             0.5, -0.5,  0.5,
             0.5, -0.5, -0.5,
             0.5,  0.5, -0.5,
             0.5,  0.5,  0.5,
            // BACK (12-15)
             0.5, -0.5, -0.5,
            -0.5, -0.5, -0.5,
            -0.5,  0.5, -0.5,
             0.5,  0.5, -0.5,
            // LEFT (16-19)
            -0.5, -0.5, -0.5,
            -0.5, -0.5,  0.5,
            -0.5,  0.5,  0.5,
            -0.5,  0.5, -0.5,
            // TOP (20-23)
            -0.5,  0.5,  0.5,
             0.5,  0.5,  0.5,
             0.5,  0.5, -0.5,
            -0.5,  0.5, -0.5,
        ];

	    this.indices = [
            // BOTTOM
            2, 1, 0,
            0, 3, 2,

            // FRONT SIDE
            4, 5, 6,
            6, 7, 4,

            // RIGHT SIDE
            8, 9, 10,
            10, 11, 8,

            // BACK
            12, 13, 14,
            14, 15, 12,

            // LEFT SIDE
            16, 17, 18,
            18, 19, 16,

            // TOP
            20, 21, 22,
            22, 23, 20,
	    ];


        this.normals = [
            // BOTTOM
             0, -1,  0,
             0, -1,  0,
             0, -1,  0,
             0, -1,  0,
            // FRONT
             0,  0,  1,
             0,  0,  1,
             0,  0,  1,
             0,  0,  1,
            // RIGHT
             1,  0,  0,
             1,  0,  0,
             1,  0,  0,
             1,  0,  0,
            // BACK
             0,  0,  -1,
             0,  0,  -1,
             0,  0,  -1,
             0,  0,  -1,
            // LEFT
            -1,  0,  0,
            -1,  0,  0,
            -1,  0,  0,
            -1,  0,  0,
            // TOP
             0,  1,  0,
             0,  1,  0,
             0,  1,  0,
             0,  1,  0,
        ];


	    this.primitiveType = this.scene.gl.TRIANGLES;
	    this.initGLBuffers();
	}
}
