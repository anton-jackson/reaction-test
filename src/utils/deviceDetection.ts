export const isMobileDevice = (): boolean => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  
  // Regular expression to match mobile devices
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
  
  // Check if the device has touch capability and matches mobile user agent
  return ('ontouchstart' in window) && mobileRegex.test(userAgent.toLowerCase());
}; 