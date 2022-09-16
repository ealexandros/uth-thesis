import { isBrowser } from "./window";

export const getTailwindMd = () => {
  // tailwind md value has width of 768px
  if (isBrowser()) {
    return window.innerWidth < 768;
  }
};
