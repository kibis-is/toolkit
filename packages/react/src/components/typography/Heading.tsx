import { Heading as ChakraHeading } from '@chakra-ui/react';
import {
  type PropsWithoutRef,
  type ForwardRefExoticComponent,
  forwardRef,
  type RefAttributes,
} from 'react';

// hooks
import { useDefaultTextColor } from '@/hooks';

// types
import type { THeadingProps } from '@/types';

const Heading: ForwardRefExoticComponent<
  PropsWithoutRef<THeadingProps> & RefAttributes<HTMLHeadingElement>
> = forwardRef<HTMLHeadingElement, THeadingProps>(
  ({ colorMode, ...otherProps }, ref) => {
    // hooks
    const defaultTextColor = useDefaultTextColor(colorMode);

    return (
      <ChakraHeading
        color={defaultTextColor}
        {...otherProps}
        ref={ref}
      />
    );
  }
);

Heading.displayName = 'Heading';

export default Heading;
