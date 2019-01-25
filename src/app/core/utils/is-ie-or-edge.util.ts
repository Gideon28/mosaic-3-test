export function isIEorEdge() {
  const userAgent = navigator.userAgent;

  return /(Trident\/)|(MSIE)|(Edge\/)/g.test(userAgent);
}
