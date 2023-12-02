import { Color } from 'three'

export const NUMBER_OF_ROTATIONS = 2
export const STAIRS_PER_ROTATION = 36
export const DEGREE_IN_RADIANS = 0.0174533
export const SPACE_BETWEEN_STAIRS = 1.5
export const STAIR_HEIGHT = 0.1
export const RADIAN_IN_DEGREES = 57.2958
export const GOLDEN_RATIO = 1.61803398875
export const PARTICLE_CLOUD_RADIUS = 33
export const PARTICLE_CLOUD_COUNT = 35
export const PORTAL_RADIUS = 4
export const SUMMON_CIRCLE_RADIUS = 4
export const ICON_CIRCLE_RADIUS = 2
export const SUMMON_CIRCLE_SPEED_MULTIPLIER = 0.02
export const GOLD_EMISSIVE = new Color(2.2, 1.2, 0.5)
export const GOLD_COLOR = new Color('#e3c584')

export enum Season {
  Spring,
  Summer,
  Autumn,
  Winter,
}

export enum FloorType {
  Primary,
  Secondary
}
