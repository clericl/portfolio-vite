import { Color } from "three";
import email from "../assets/contact/email.png";
import github from "../assets/contact/github.png";
import linkedin from "../assets/contact/linkedin.png";
import resume from "../assets/contact/resume.png";

export interface IconProps {
  name: string;
  image: string;
  invoke: () => void;
}

export const ICONS: IconProps[] = [
  {
    name: "email",
    image: email,
    invoke() {
      const a = document.createElement("a");
      a.setAttribute("href", "mailto:eliang58@gmail.com");
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopenner noreferrer");
      document.body.appendChild(a);
      a.click();
      if (a.parentElement) {
        a.parentElement.removeChild(a);
      }
    },
  },
  {
    name: "github",
    image: github,
    invoke() {
      const a = document.createElement("a");
      a.setAttribute("href", "https://www.github.com/clericl");
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopenner noreferrer");
      document.body.appendChild(a);
      a.click();
      if (a.parentElement) {
        a.parentElement.removeChild(a);
      }
    },
  },
  {
    name: "linkedin",
    image: linkedin,
    invoke() {
      const a = document.createElement("a");
      a.setAttribute("href", "https://www.linkedin.com/in/eliang58/");
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopenner noreferrer");
      document.body.appendChild(a);
      a.click();
      if (a.parentElement) {
        a.parentElement.removeChild(a);
      }
    },
  },
  {
    name: "resume",
    image: resume,
    invoke() {
      const a = document.createElement("a");
      a.setAttribute("href", "/EricLiangResume.pdf");
      a.setAttribute("download", "EricLiangResume.pdf");
      document.body.appendChild(a);
      a.click();
      if (a.parentElement) {
        a.parentElement.removeChild(a);
      }
    },
  },
];

export const NUMBER_OF_ROTATIONS = 2;
export const STAIRS_PER_ROTATION = 36;
export const DEGREE_IN_RADIANS = 0.0174533;
export const SPACE_BETWEEN_STAIRS = 1.5;
export const STAIR_HEIGHT = 0.1;
export const RADIAN_IN_DEGREES = 57.2958;
export const GOLDEN_RATIO = 1.61803398875;
export const PARTICLE_CLOUD_RADIUS = 32;
export const PARTICLE_CLOUD_COUNT = 100;
export const PORTAL_RADIUS = 4;
export const SUMMON_CIRCLE_RADIUS = 4;
export const ICON_CIRCLE_RADIUS = 2;
export const SUMMON_CIRCLE_SPEED_MULTIPLIER = 0.02;
export const GOLD_EMISSIVE = new Color(2.2, 1.2, 0.5);
export const GOLD_COLOR = new Color("#e3c584");
export const PLATFORM_TITLES = ["/", "/about", "/skills", "/work", "/contact"];

export enum Season {
  Spring,
  Summer,
  Autumn,
  Winter,
}

export enum FloorType {
  Primary,
  Secondary,
}
