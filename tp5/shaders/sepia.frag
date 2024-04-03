#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main() {

	vec4 color = texture2D(uSampler, vTextureCoord);

	// Convert color to grayscale
	vec4 colorGray = vec4(vec3(dot(color.rgb, vec3(0.299, 0.587, 0.114))), color.a);

	gl_FragColor = colorGray;
}