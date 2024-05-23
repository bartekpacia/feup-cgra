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
  vec3.subtract(vector1, vec3.fromValues(...vertex1), vec3.fromValues(...vertex0));
  let vector2 = vec3.create();
  vec3.subtract(vector2, vec3.fromValues(...vertex2), vec3.fromValues(...vertex1));
  let normalVector = vec3.create();
  vec3.cross(normalVector, vector1, vector2);

  // Normalize normal
  let realNormalVector = vec3.create();
  vec3.normalize(realNormalVector, normalVector);

  return [realNormalVector[0], realNormalVector[1], realNormalVector[2]];
}

