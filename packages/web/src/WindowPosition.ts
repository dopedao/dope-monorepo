import { makeVar } from '@apollo/client';

class WindowPosition {
  position?: any;
  constructor() {
    this.position = undefined;
  }

  updatePosition(transformStyle: string) {
    // pull the current DesktopWindow location from the CSS style on the DOM object
    const transformArr = transformStyle.match(/translate\((-?\d+(?:\.\d*)?)px, (-?\d+(?:\.\d*)?)px\)/);
    if (transformArr && transformArr.length === 3) {
      this.position = {
        x: parseFloat(transformArr[1]),
        y: parseFloat(transformArr[2]),
      };
    }
  }
}

export default WindowPosition;
export const WindowPositionReactive = makeVar(new WindowPosition());
