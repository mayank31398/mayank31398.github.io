var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext('2d'),

    minDist = 10,
    maxDist = 30,
    initialWidth = 10,
    maxLines = 200,
    initialLines = 4,
    speed = 1,

    lines = [],
    frame = 0,
    timeSinceLast = 0,

    dirs = [
        // straight
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
        // diagonals
        [Math.cos(Math.PI / 4), Math.sin(Math.PI / 4)],
        [Math.cos(3 * Math.PI / 4), Math.sin(3 * Math.PI / 4)],
        [Math.cos(5 * Math.PI / 4), Math.sin(5 * Math.PI / 4)],
        [Math.cos(7 * Math.PI / 4), Math.sin(7 * Math.PI / 4)]
    ],
    starter = {
        // Starting
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        width: initialWidth
    };

function init() {
    lines.length = 0;

    for (var i = 0; i < initialLines; ++i)
        lines.push(new Line(starter));

    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, w, h);
}

function getColor(x, y) {
    // Make custom color function
    return 'hsl(hue, 80%, 50%)'.replace(
        'hue', (x / w + y / h) * 180 + frame
    );
}

function anim() {
    window.requestAnimationFrame(anim);

    ++frame;

    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(0,0,0,0.02)';
    ctx.fillRect(0, 0, w, h);
    ctx.shadowBlur = 0.5;

    for (var i = 0; i < lines.length; ++i)
        if (lines[i].step()) { // if true it's dead
            lines.splice(i, 1);
            --i;
        }

    // spawn new

    ++timeSinceLast

    // if (lines.length < maxLines && timeSinceLast > 10 && Math.random() < 0.5) {
    if (lines.length < maxLines) {
        timeSinceLast = 0;

        lines.push(new Line(starter));

        // // Draw circle in begining
        // ctx.fillStyle = ctx.shadowColor = getColor(starter.x);
        // ctx.beginPath();
        // ctx.arc(starter.x, starter.y, initialWidth, 0, Math.PI * 2);
        // ctx.fill();
    }
}

function Line(parent) {
    this.x = parent.x | 0;
    this.y = parent.y | 0;
    this.width = parent.width / 1.25;

    // Path on which lines move
    do {
        var dir = dirs[(Math.random() * dirs.length) | 0];
        this.vx = dir[0];
        this.vy = dir[1];
    } while ((this.vx === -parent.vx && this.vy === -parent.vy) || (this.vx === parent.vx && this.vy === parent.vy));

    this.vx *= speed;
    this.vy *= speed;

    this.dist = (Math.random() * (maxDist - minDist) + minDist);
}

Line.prototype.step = function () {
    var dead = false;

    var prevX = this.x,
        prevY = this.y;

    this.x += this.vx;
    this.y += this.vy;

    --this.dist;

    // kill if out of screen
    if (this.x < 0 || this.x > w || this.y < 0 || this.y > h)
        dead = true;

    // make children :D
    if (this.dist <= 0 && this.width > 1) {
        // keep yourself, sometimes
        this.dist = Math.random() * (maxDist - minDist) + minDist;

        // add 2 children
        if (lines.length < maxLines) lines.push(new Line(this));
        if (lines.length < maxLines) lines.push(new Line(this));
        // if (lines.length < maxLines && Math.random() < 0.5) lines.push(new Line(this));

        // kill the poor thing
        if (Math.random() < .2) dead = true;
    }

    ctx.strokeStyle = ctx.shadowColor = getColor(this.x, this.y);
    ctx.beginPath();
    ctx.lineWidth = this.width;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(prevX, prevY);
    ctx.stroke();

    return dead;
}

init();
anim();

window.addEventListener('resize', function () {
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
    starter.x = w / 2;
    starter.y = h / 2;

    init();
})