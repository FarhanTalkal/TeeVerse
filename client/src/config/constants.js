import { swatch, fileIcon, ai, logoShirt, stylishShirt } from "../assets";

export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch,
  },
  {
    name: "filepicker",
    icon: fileIcon,
  },
  {
    name: "aipicker",
    icon: ai,
  },
];

export const FilterTabs = [
  {
    name: "logoShirt",
    icon: logoShirt,
    stateProperty: "isLogoTexture",
  },
  {
    name: "stylishShirt",
    icon: stylishShirt,
    stateProperty: "isFullTexture",
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterProperty: "isLogoTexture",
  },
  full: {
    stateProperty: "fullDecal",
    filterProperty: "isFullTexture",
  },
};
