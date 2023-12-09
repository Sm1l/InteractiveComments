import amyrobson from "../images/avatars/image-amyrobson.webp";
import juliusomo from "../images/avatars/image-juliusomo.webp";
import maxblagun from "../images/avatars/image-maxblagun.webp";
import ramsesmiron from "../images/avatars/image-ramsesmiron.webp";

export type TNames = "amyrobson" | "juliusomo" | "maxblagun" | "ramsesmiron";

export const avatarsArray: string[] = [amyrobson, juliusomo, maxblagun, ramsesmiron];

export const getAvatar = (name: TNames) => {
  return avatarsArray.filter((n) => n.includes(name))[0];
};
