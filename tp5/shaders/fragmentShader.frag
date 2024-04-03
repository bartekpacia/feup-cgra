precision mediump float;

varying float yPos; // Receive the y-coordinate from the vertex shader

void main() {
    // Check if y-coordinate is greater than 0.5 to determine color
    if (yPos > 0.5) {
        // Upper half, color yellow
        gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0); // Yellow
    } else {
        // Lower half, color blue
        gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); // Blue
    }
}
