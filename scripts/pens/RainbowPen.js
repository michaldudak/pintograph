function RainbowPen(arms, opacity, hueChangePerSegment) {
    this.arms = arms;
    this.opacity = opacity;
    
    this.previousMountPoint = null;
    this.mountPoint = null;
    this.hue = 120;
    this.hueChangePerSegment = hueChangePerSegment;
}

RainbowPen.prototype.step = function(t) {
    this.previousMountPoint = this.mountPoint;
    this.mountPoint = this.arms.mountPoint;
};

RainbowPen.prototype.draw = function(context) {
    if (this.previousMountPoint === null || this.mountPoint === null) {
        return;
    }
    
    this.hue = (this.hue + this.hueChangePerSegment) % 360;
    context.strokeStyle = "hsla(" + this.hue + ", 50%, 50%, " + this.opacity + ")";
    context.beginPath();
    context.moveTo(this.previousMountPoint.x, this.previousMountPoint.y);
    context.lineTo(this.mountPoint.x, this.mountPoint.y);
    context.stroke();
};

RainbowPen.prototype.render = function(context) {
};