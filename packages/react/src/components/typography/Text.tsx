import { Text as ChakraText } from '@chakra-ui/react';
import {
  type PropsWithoutRef,
  type ForwardRefExoticComponent,
  forwardRef,
  type RefAttributes,
} from 'react';

// hooks
import { useDefaultTextColor } from '@/hooks';

// types
import type { TTextProps } from '@/types';

const Text: ForwardRefExoticComponent<
  PropsWithoutRef<TTextProps> & RefAttributes<HTMLParagraphElement>
> = forwardRef<HTMLParagraphElement, TTextProps>(
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
