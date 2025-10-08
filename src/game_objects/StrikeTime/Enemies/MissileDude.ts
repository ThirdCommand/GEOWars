


const drawMissileDude = (ctx: CanvasRenderingContext2D) => {
     const s = 1;
    // Piece 1: 
    ctx.beginPath();
    ctx.arc(0 * s, 15 * s, -57 * s, 0,2*Math.PI);
    ctx.stroke();

    // Piece 2: 
    ctx.moveTo(0 * s, 12 * s);
    ctx.beginPath();
    ctx.lineTo(0 * s, -3 * s);
    ctx.lineTo(-6 * s, -12 * s);
    ctx.stroke();

    // Piece 4: 
    ctx.moveTo(0 * s, -3 * s);
    ctx.beginPath();
    ctx.lineTo(6 * s, -12 * s);
    ctx.stroke();

    // Piece 6: 
    ctx.moveTo(0 * s, 10 * s);
    ctx.beginPath();
    ctx.lineTo(2 * s, 11 * s);
    ctx.lineTo(9 * s, 12 * s);
    ctx.lineTo(11 * s, 3 * s);
    ctx.lineTo(2 * s, 0 * s);
    ctx.lineTo(2 * s, 11 * s);
    ctx.stroke();

    // Piece 7: 
    ctx.moveTo(2 * s, 0 * s);
    ctx.beginPath();
    ctx.lineTo(0 * s, 0 * s);
    ctx.stroke();

    // Piece 9: 
    ctx.moveTo(4 * s, 9 * s);
    ctx.beginPath();
    ctx.lineTo(8 * s, 10 * s);
    ctx.lineTo(9 * s, 4 * s);
    ctx.lineTo(4 * s, 2 * s);
    ctx.lineTo(4 * s, 9 * s);
    ctx.stroke();
}

const drawFighter = (ctx: CanvasRenderingContext2D) => {
    //  Piece 1: 
    const s = 1;
    ctx.moveTo(0 * s, 36 * s);
    ctx.beginPath();
    ctx.lineTo(9 * s, 18 * s);
    ctx.lineTo(9 * s, 6 * s);
    ctx.lineTo(42 * s, -12 * s);
    ctx.lineTo(9 * s, -12 * s);
    ctx.lineTo(9 * s, -27 * s);
    ctx.lineTo(-9 * s, -27 * s);
    ctx.lineTo(-9 * s, -12 * s);
    ctx.lineTo(-42 * s, -12 * s);
    ctx.lineTo(-9 * s, 6 * s);
    ctx.lineTo(-9 * s, 18 * s);
    ctx.lineTo(0 * s, 36 * s);
    ctx.stroke();

    // Piece 2: 
    ctx.beginPath();
    ctx.moveTo(-4 * s, 18 * s);
    ctx.bezierCurveTo(
        -1 * s, 25 * s,
        1 * s, 25 * s,
        4 * s, 18 * s
    );
    ctx.bezierCurveTo(
        4 * s, 2 * s,
        -4 * s, 2 * s,
        -4 * s, 18 * s
    );
    ctx.stroke();

    // Piece 3: 
    ctx.beginPath();
    ctx.moveTo(9 * s, -27 * s);
    ctx.bezierCurveTo(
        7 * s, -31 * s,
        2 * s, -31 * s,
        0 * s, -27 * s
    );
    ctx.lineTo(-9 * s, -27 * s);
    ctx.lineTo(0 * s, -27 * s);
    ctx.stroke();

    // Piece 4: 
    ctx.beginPath();
    ctx.moveTo(0 * s, -27 * s);
    ctx.bezierCurveTo(
        -3 * s, -31 * s,
        -6 * s, -31 * s,
        -9 * s, -27 * s
    );
    ctx.stroke();
}