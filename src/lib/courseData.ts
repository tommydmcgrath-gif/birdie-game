export interface HoleData {
  number: number;
  yards: number;
  par: number;
  stroke_index: number;
}

export const COURSE_DATA: HoleData[] = [
  { number: 1, yards: 516, par: 5, stroke_index: 9 },
  { number: 2, yards: 400, par: 4, stroke_index: 7 },
  { number: 3, yards: 343, par: 4, stroke_index: 11 },
  { number: 4, yards: 130, par: 3, stroke_index: 17 },
  { number: 5, yards: 345, par: 4, stroke_index: 5 },
  { number: 6, yards: 419, par: 4, stroke_index: 1 },
  { number: 7, yards: 304, par: 4, stroke_index: 13 },
  { number: 8, yards: 514, par: 5, stroke_index: 3 },
  { number: 9, yards: 185, par: 3, stroke_index: 15 },
  { number: 10, yards: 500, par: 5, stroke_index: 6 },
  { number: 11, yards: 170, par: 3, stroke_index: 18 },
  { number: 12, yards: 412, par: 4, stroke_index: 8 },
  { number: 13, yards: 428, par: 4, stroke_index: 2 },
  { number: 14, yards: 164, par: 3, stroke_index: 16 },
  { number: 15, yards: 412, par: 4, stroke_index: 4 },
  { number: 16, yards: 384, par: 4, stroke_index: 12 },
  { number: 17, yards: 170, par: 3, stroke_index: 14 },
  { number: 18, yards: 380, par: 4, stroke_index: 10 },
];

export const TOTAL_HOLES = 18;
export const COURSE_NAME = "Country Club of Fairfield";
export const COURSE_PAR = COURSE_DATA.reduce((sum, h) => sum + h.par, 0);
export const COURSE_YARDS = COURSE_DATA.reduce((sum, h) => sum + h.yards, 0);
