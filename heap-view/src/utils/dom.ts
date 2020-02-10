import { snakeToCamel } from "utils/string";

export const getWidth = (el: any): number => {
  let width = 0;

  if (el) {
    width += el.offsetWidth;
    width += Number(getStyle(el, "margin-left").replace(/px/i, "")) || 0;
    width += Number(getStyle(el, "margin-right").replace(/px/i, "")) || 0;
  }

  return width;
};

export const getHeight = (el: any): number => {
  let height = 0;

  if (el) {
    height += el.offsetHeight;
    height += Number(getStyle(el, "margin-top").replace(/px/i, "")) || 0;
    height += Number(getStyle(el, "margin-bottom").replace(/px/i, "")) || 0;
  }

  return height;
};

export const getPosition = (el: any): { top: number; left: number } => {
  let x = 0;
  let y = 0;

  if (el && el.getBoundingClientRect) {
    let rect = el.getBoundingClientRect();

    x = rect.left;
    y = rect.top;
  } else {
    while (el) {
      if (String(el.tagName).match(/body/i)) {
        x +=
          el.offsetLeft -
          (el.scrollLeft ||
            document.documentElement.scrollLeft ||
            document.body.scrollLeft) +
          el.clientLeft;
        y +=
          el.offsetTop -
          (el.scrollTop ||
            document.documentElement.scrollTop ||
            document.body.scrollTop) +
          el.clientTop;
      } else {
        x += el.offsetLeft - el.scrollLeft + el.clientLeft;
        y += el.offsetTop - el.scrollTop + el.clientTop;
      }

      el = el.offsetParent;
    }
  }

  return { top: y, left: x };
};

export const getDatasetByName = (el: any, name: string): any => {
  return el.dataset
    ? el.dataset[snakeToCamel(name)]
    : el.getAttribute(`data-${name}`);
};

export const getStyle = (el: any, cssRule: any) => {
  let value = "";

  if (el) {
    if (document.defaultView && document.defaultView.getComputedStyle) {
      value = document.defaultView
        .getComputedStyle(el, "")
        .getPropertyValue(cssRule);
    } else if (el.currentStyle) {
      cssRule = cssRule.replace(/-(\w)/g, function(strMatch: any, p1: any) {
        return p1.toUpperCase();
      });

      value = el.currentStyle[cssRule];
    }
  }

  return value;
};

export const clearStyle = (el: any) => {
  el && el.setAttribute("style", "");
};

export const isCollisionByPoint = (el: any, x: number, y: number): boolean => {
  if (el) {
    let { top, left } = getPosition(el);
    let width = getWidth(el);
    let height = getHeight(el);

    return x >= left && x <= left + width && y >= top && y <= top + height;
  } else {
    return false;
  }
};
