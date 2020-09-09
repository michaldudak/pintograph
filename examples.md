#Examples
## Rounded triangle
    var driveA = new Pintograph.DoubleCircularDrive({
        position: {x: 300, y: 800},
        radius: 100,
        currentAngle: 90,
        rpm: 8,
        innerDrive: new Pintograph.CircularDrive({
            position: {x: 500, y: 800},
            radius: 25,
            currentAngle: 90,
            rpm: -16
        })
    });

    var driveB = new Pintograph.DoubleCircularDrive({
        position: {x: 700, y: 800},
        radius: 100,
        currentAngle: 90,
        rpm: 8,
        innerDrive: new Pintograph.CircularDrive({
            position: {x: 500, y: 800},
            radius: 25,
            currentAngle: 90,
            rpm: -16
        })
    });

## Nice curves
    var driveA = new Pintograph.DoubleCircularDrive({
        position: {x: 300, y: 800},
        radius: 100,
        currentAngle: 0,
        rpm: -8,
        innerDrive: new Pintograph.CircularDrive({
            position: {x: 500, y: 800},
            radius: 100,
            currentAngle: 180,
            rpm: -4
        })
    });

    var driveB = new Pintograph.DoubleCircularDrive({
        position: {x: 700, y: 800},
        radius: 100,
        currentAngle: 0,
        rpm: 8,
        innerDrive: new Pintograph.CircularDrive({
            position: {x: 500, y: 800},
            radius: 100,
            currentAngle: 180,
            rpm: 16.02
        })
    });

## Star
    var driveA = new Pintograph.DoubleCircularDrive({
        position: {x: 300, y: 800},
        radius: 100,
        currentAngle: -90,
        rpm: 8,
        innerDrive: new Pintograph.CircularDrive({
            position: {x: 500, y: 800},
            radius: 66,
            currentAngle: -90,
            rpm: -12
        })
    });

    var driveB = new Pintograph.DoubleCircularDrive({
        position: {x: 700, y: 800},
        radius: 100,
        currentAngle: -90,
        rpm: 8,
        innerDrive: new Pintograph.CircularDrive({
            position: {x: 500, y: 800},
            radius: 66,
            currentAngle: -90,
            rpm: -12
        })
    });

## Acrobat logo
    var driveA = new Pintograph.DoubleCircularDrive({
        position: {x: 300, y: 800},
        radius: 100,
        currentAngle: -90,
        rpm: 8,
        innerDrive: new Pintograph.CircularDrive({
            position: {x: 500, y: 800},
            radius: 75,
            currentAngle: 90,
            rpm: -16
        })
    });

    var driveB = new Pintograph.DoubleCircularDrive({
        position: {x: 700, y: 800},
        radius: 100,
        currentAngle: -90,
        rpm: 8,
        innerDrive: new Pintograph.CircularDrive({
            position: {x: 500, y: 800},
            radius: 75,
            currentAngle: 90,
            rpm: -16
        })
    });

## Cycloid
    var driveA = new Pintograph.DoubleCircularDrive({
        position: {x: 500, y: 500},
        radius: 400,
        currentAngle: 0,
        rpm: .1,
        innerDrive: new Pintograph.CircularDrive({
            position: {x: 0, y: 0},
            radius: 80,
            currentAngle: 180,
            rpm: 50.1
        })
    });

    var driveB = new Pintograph.DoubleCircularDrive({
        position: {x: 500, y: 500},
        radius: 400,
        currentAngle: 90,
        rpm: .1,
        innerDrive: new Pintograph.CircularDrive({
            position: {x: 0, y: 0},
            radius: 70,
            currentAngle: 180,
            rpm: 100.4
        })
    });
