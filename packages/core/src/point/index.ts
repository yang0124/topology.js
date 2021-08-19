import { Direction } from '../data';

export interface Point {
  x: number;
  y: number;
  radius?: number;
  color?: string;
  background?: string;
  id?: string;
  penId?: string;
  anchorId?: string;
  custom?: boolean;
  prev?: Point;
  next?: Point;
}

export function rotatePoint(pt: Point, angle: number, center: Point) {
  if (!angle || angle % 360 === 0) {
    return;
  }

  angle *= Math.PI / 180;
  const x = (pt.x - center.x) * Math.cos(angle) - (pt.y - center.y) * Math.sin(angle) + center.x;
  const y = (pt.x - center.x) * Math.sin(angle) + (pt.y - center.y) * Math.cos(angle) + center.y;
  pt.x = x;
  pt.y = y;
}

export function hitPoint(pt: Point, target: Point, radius = 5) {
  return pt.x > target.x - radius && pt.x < target.x + radius && pt.y > target.y - radius && pt.y < target.y + radius;
}

export function scalePoint(pt: Point, scale: number, center: Point) {
  pt.x = center.x - (center.x - pt.x) * scale;
  pt.y = center.y - (center.y - pt.y) * scale;
}

export function calcRotate(pt: Point, center: Point) {
  if (pt.x === center.x) {
    return pt.y <= center.y ? 0 : 180;
  }

  if (pt.y === center.y) {
    return pt.x < center.x ? 270 : 90;
  }

  const x = pt.x - center.x;
  const y = pt.y - center.y;
  let angle = (Math.atan(Math.abs(x / y)) / (2 * Math.PI)) * 360;
  if (x > 0 && y > 0) {
    angle = 180 - angle;
  } else if (x < 0 && y > 0) {
    angle += 180;
  } else if (x < 0 && y < 0) {
    angle = 360 - angle;
  }

  return angle;
}

export function distance(pt1: Point, pt2: Point): number {
  const x = pt1.x - pt2.x;
  const y = pt1.y - pt2.y;
  return Math.sqrt(x * x + y * y);
}

export function facePoint(pt: Point, targetPt?: Point) {
  let d = Direction.None;
  if (!targetPt) {
    return d;
  }

  const disX = pt.x - targetPt.x;
  const disY = pt.y - targetPt.y;

  if (Math.abs(disX) > Math.abs(disY)) {
    if (disX > 0) {
      d = Direction.Right;
    } else {
      d = Direction.Left;
    }
  } else {
    if (disY > 0) {
      d = Direction.Bottom;
    } else {
      d = Direction.Up;
    }
  }

  return d;
}
