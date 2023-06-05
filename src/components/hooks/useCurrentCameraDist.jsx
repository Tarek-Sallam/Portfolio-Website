function useCurrentCameraDist(viewport) {
  if (viewport.width < 688) {
    return 5;
  } else if (viewport.width >= 688 && viewport.width < 992) {
    return 4.2;
  } else if (viewport.width >= 992 && viewport.width < 1312) {
    return 3.5;
  } else {
    return 3;
  }
}

export default useCurrentCameraDist;
