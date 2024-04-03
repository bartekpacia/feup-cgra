precision mediump float;

attribute vec3 aVertexPosition;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
varying float yPos; // Varying variable to pass y-coordinate to the fragment shader

void main() {
    // Transform the vertex position
    vec4 vertexPosition = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

    // Pass the y-coordinate of the transformed vertex position to the fragment shader
    yPos = vertexPosition.y;

    // Set the output position
    gl_Position = vertexPosition;
}
