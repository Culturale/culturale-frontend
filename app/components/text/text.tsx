import type * as React from 'react';
import { Text as ReactNativeText } from 'react-native';

import { translate } from '~/i18n';

import type { TextProps as Props } from './text.props';

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 *
 * @param text Optional text to display if not using `tx` or nested components.
 * @param tx Optional text which is looked up via i18n.
 * @param txOptions Optional options to pass to i18n.
 * @param style An optional style override useful for padding & margin.
 */
export const Text: React.FC<Props> = (props) => {
  const { text, tx, txOptions, style, ...rest } = props;
  // figure out which content to use
  const i18nText = (tx && translate(tx, txOptions)) || text;

  return (
    <ReactNativeText {...rest} style={style}>
      {i18nText}
    </ReactNativeText>
  );
};
