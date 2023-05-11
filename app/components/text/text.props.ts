import type { TextStyle, TextProps as TextProperties } from 'react-native';

export interface TextProps extends Omit<TextProperties, 'style'> {
  text?: string;
  tx?: string;
  txOptions?: object;
  style?: TextStyle;
}
