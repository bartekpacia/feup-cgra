attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D heightMap;
uniform float time; 

void main() {
    vec4 vertexPos = vec4(aVertexPosition, 1.0);

    // Sample the heightmap texture to get displacement
    float displacement = texture2D(heightMap, aTextureCoord).r; // Assuming red channel is used for displacement
    
    // vary texture coordinates over time for animation
    vec2 animatedTexCoord  = aTextureCoord + vec2(cos(time) * 0.05, 0.0); 
    
    gl_Position = uPMatrix * uMVMatrix * vertexPos;
    vTextureCoord = animatedTexCoord;
}
