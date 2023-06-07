function useCurrentCameraDist(viewport) {
  if (viewport.width < 600) {
    return 5;
  } else if (viewport.width >= 600 && viewport.width < 768) {
    return 4.8;
  } else if (viewport.width >= 768 && viewport.width < 992) {
    return 3.5;
  } else if (viewport.width >= 992 && viewport.width < 1200) {
    return 3.2;
  } else {
    return 3;
  }
}

export default useCurrentCameraDist;
