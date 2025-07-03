import { Heading as ChakraHeading, HeadingProps } from '@chakra-ui/react';
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

const Heading: ForwardRefExoticComponent<
  PropsWithoutRef<IBaseComponentProps & HeadingProps> & RefAttributes<HTMLHeadingElement>
> = forwardRef<HTMLHeadingElement, IBaseComponentProps & HeadingProps>(
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
