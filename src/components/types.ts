export type TConverter = {
  hex: string,
  rgbText: string,
  color: string,
  rgbBackground: string,
}

export type Action =
  | { type: 'SET_HEX', payload: string }
  | { type: 'SET_RGB_TEXT', payload: string }
  | { type: 'SET_COLOR', payload: string }
  | { type: 'SET_RGB_BACKGROUND', payload: string };
