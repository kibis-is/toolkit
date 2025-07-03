import { Text as ChakraText, TextProps } from '@chakra-ui/react';
import {
  type PropsWithoutRef,
  type ForwardRefExoticComponent,
  forwardRef,
  type RefAttributes,
} from 'react';

// hooks
import { useDefaultTextColor } from '@/hooks';

// types
import type { IBaseComponentProps } from '@/types';

const Text: ForwardRefExoticComponent<
  PropsWithoutRef<IBaseComponentProps & TextProps> & RefAttributes<HTMLParagraphElement>
> = forwardRef<HTMLParagraphElement, IBaseComponentProps & TextProps>(
  ({ colorMode, ...otherProps }, ref) => {
    // hooks
    const defaultTextColor = useDefaultTextColor(colorMode);

    return (
      <ChakraText
        color={defaultTextColor}
        {...otherProps}
        ref={ref}
      />
    );
  }
);

Text.displayName = 'Text';

export default Text;
