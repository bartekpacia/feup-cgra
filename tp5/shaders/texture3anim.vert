attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor; // Uniform for time factor
uniform float scaleFactor; // Uniform for scaleFactor

varying vec2 vTextureCoord;

void main() {
    // Calculate offset based on sine wave function
    float xOffset = sin(timeFactor) * scaleFactor; // Assuming scaleFactor is a uniform

    // Apply offset to vertex position
    vec4 offsetPosition = vec4(aVertexPosition.x + xOffset, aVertexPosition.y, aVertexPosition.z, 1.0);

    // Transform vertex position
    gl_Position = uPMatrix * uMVMatrix * offsetPosition;

    // Pass texture coordinates to fragment shader
    vTextureCoord = aTextureCoord;
}
