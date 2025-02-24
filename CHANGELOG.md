# Changelog

## 0.4.0

- Removed the need to register every object within the Scene. Only Pens need to be registered now (using `Scene.registerPen`).

## 0.3.1

- Released the package as unbundled ESM only.

## ~~0.3.0~~

Invalid release.

## 0.2.0

Massive overhaul of the whole library:

- Renamed contraptions:
  - CircularDrive, DoubleCircularDrive -> Wheel
  - SimplePen, RainbowPen -> Pen
  - SimpleArms -> VArm
  - CrossArms -> XArm
- Added new contraption: Oscillator
- Replaced Simulation object with Scene
- Removed the demo editor (a full-fledged editor is in the making)
- Introduced the concept of mount points, so contraptions can be mounted on top of each other without limits (other than processing power and available memory, of course)

This is still a work in progress and many APIs can and will change in the upcoming releases as the editor takes shape.

A better documentation will be prepared when the library is in more or less stable state.

## 0.1.3

- Fixed problems when importing the library as ES modules.

## 0.1.2

- Added readme, license and changelog to package contents.

## 0.1.1

Initial published version.
