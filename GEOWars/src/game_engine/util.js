export const Util = {
    // Normalize the length of the vector to 1, maintaining direction.
    dir(vec) {
        const norm = Util.norm(vec);
        return Util.scale(vec, 1 / norm);
    },
    vectorCartesian(angle,scale){
        let vector = [];
        vector = [scale * Math.cos(angle), scale * Math.sin(angle)];
        return vector;
    },
    vector3Cartesian(angle,scale){ // angle is [plane, out of plane]
        return [scale * Math.cos(angle[0]) * Math.cos(angle[1]), scale * Math.sin(angle[0]) * Math.cos(angle[1]), scale * Math.sin(angle[1])];
    },
    vector3Add(vec1, vec2){
        return [vec1[0] + vec2[0], vec1[1] + vec2[1], vec1[2] + vec2[2]];
    },
    // Find distance between two points.
    dist(pos1, pos2) {
        let answer;
        if(isNaN(pos1[2])) pos1[2] = 0;
        if(isNaN(pos2[2])) pos2[2] = 0;
        if(pos1.length === 3 && pos2.length === 3) {

            answer =  Math.sqrt(
                (pos1[0] - pos2[0]) ** 2 + (pos1[1] - pos2[1]) ** 2 + (pos1[2] - pos2[2]) ** 2
            );
            if(isNaN(answer)) {
                console.log("NaN");
            }
            return answer;
        }
        answer =  Math.sqrt(
            (pos1[0] - pos2[0]) ** 2 + (pos1[1] - pos2[1]) ** 2
        );
        if(isNaN(answer)) {
            console.log("NaN");
        }
        return answer;
    },
    // Find the length of the vector.
    norm(vec) {
        return Util.dist([0, 0, 0], vec);
    },
    // Return a randomly oriented vector with the given length.
    randomVec(length) {
        const deg = 2 * Math.PI * Math.random();
        return Util.scale([Math.sin(deg), Math.cos(deg)], length);
    },
    // Scale the length of a vector by the given amount.
    scale(vec, m) {
        if(vec.length === 3) {
            return [vec[0] * m, vec[1] * m, vec[2] * m];
        }
        return [vec[0] * m, vec[1] * m];
    },

  
 
};
