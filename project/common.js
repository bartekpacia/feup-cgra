// Borrowed from https://stackoverflow.com/a/1527820/7009800
export function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

// Borrowed from https://stackoverflow.com/a/1527820/7009800
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function splatVec3(vec) {
  return [vec[0], vec[1], vec[2]];
}

// Returns cross product between points vertex0, vertex1, and vertex2
export function crossProduct(vertex0, vertex1, vertex2) {
  // Compute not-normalized normal
  let vector1 = vec3.create();
  vec3.subtract(
    vector1,
    vec3.fromValues(...vertex1),
    vec3.fromValues(...vertex0)
  );
  let vector2 = vec3.create();
  vec3.subtract(
    vector2,
    vec3.fromValues(...vertex2),
    vec3.fromValues(...vertex1)
  );
  let normalVector = vec3.create();
  vec3.cross(normalVector, vector1, vector2);

  // Normalize normal
  let realNormalVector = vec3.create();
  vec3.normalize(realNormalVector, normalVector);

  return [realNormalVector[0], realNormalVector[1], realNormalVector[2]];
}

// Taken from:
// https://glmatrix.net/docs/vec3.js.html#line564
export function vec3_rotateX(out, a, b, rad) {
  let p = [],
    r = [];
  //Translate point to the origin
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];
  //perform rotation
  r[0] = p[0];
  r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
  r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad);
  //translate to correct position
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}

export function vec3_angle(a, b) {
  let ax = a[0],
    ay = a[1],
    az = a[2],
    bx = b[0],
    by = b[1],
    bz = b[2],
    mag1 = Math.sqrt(ax * ax + ay * ay + az * az),
    mag2 = Math.sqrt(bx * bx + by * by + bz * bz),
    mag = mag1 * mag2,
    cosine = mag && vec3.dot(a, b) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}

export function vec3_print(v) {
  return `(${v[0].toFixed(2)}, ${v[1].toFixed(2)}, ${v[2].toFixed(2)})`;
}

export function areCloseEnough(actual, expected, tolerance) {
  if (actual - tolerance > expected) {
    return false;
  }

  if (actual + tolerance < expected) {
    return false;
  }

  return true;
}
