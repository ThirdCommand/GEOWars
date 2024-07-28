
// Normalize the length of the vector to 1, maintaining direction.
function dir(vec: [number, number]): [number, number] {
    if(vec[0] === 0 && vec[1] === 0) return [0, 0];
    const normalized = norm(vec);
    return scale(vec, 1 / normalized);
}

function dir3(vec: [number, number, number]): [number, number, number] {
    if(vec[0] === 0 && vec[1] === 0 && vec[2] === 0) return [0,0,0];
    const normalized = norm(vec);
    return scale(vec, 1/normalized);
}

function vectorCartesian(angle: number, scale: number): [number, number]{
    let vector: [number, number] = [0,0];
    vector = [scale * Math.cos(angle), scale * Math.sin(angle)];
    return vector;
}
function vector3Cartesian(
    angle: [number, number], // angle is [plane, out of plane]
    scale: number
): [number, number, number]{ 
    return [
        scale * Math.cos(angle[0]) * Math.cos(angle[1]), 
        scale * Math.sin(angle[0]) * Math.cos(angle[1]), 
        scale * Math.sin(angle[1])
    ];
}

function vector3Add(
    vec1: [number, number, number], 
    vec2: [number, number, number]
): [number,number,number]{
    return [vec1[0] + vec2[0], vec1[1] + vec2[1], vec1[2] + vec2[2]];
}

// Find distance between two points.
function dist(
    pos1: [number, number, number?],
    pos2: [number, number, number?]
): number {
    return Math.sqrt(
        (pos1[0] - pos2[0]) ** 2 + (pos1[1] - pos2[1]) ** 2 + (pos1[2] || 0 - pos2[2] || 0) ** 2
    );
}

// Find the length of the vector.
function norm(vec: [number, number, number?] | [number, number]): number {
    return dist([0, 0, 0], [vec[0], vec[1], vec[2] || 0]);
}

// Return a randomly oriented vector with the given length.
function randomVec(length: number): [number, number] {
    const deg = 2 * Math.PI * Math.random();
    return scale([Math.sin(deg), Math.cos(deg)], length);
}

// Scale the length of a vector by the given amount.
function scale(vec: [number, number, number], m: number): [number,number,number]
function scale(vec: [number, number], m: number): [number,number]
function scale(vec: [number, number] | [number, number, number], m: number): [number, number] | [number, number, number] {
    if(vec.length === 3) {
        return [vec[0] * m, vec[1] * m, vec[2] * m];
    }
    return [vec[0] * m, vec[1] * m];
}

export const VectorMath = {
    dir,
    dir3,
    vectorCartesian,
    vector3Cartesian,
    vector3Add,
    dist,
    norm,
    randomVec,
    scale,

};
