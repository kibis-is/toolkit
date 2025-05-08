import React, {
  type PropsWithoutRef,
  type ForwardRefExoticComponent,
  forwardRef,
  type LegacyRef,
  type RefAttributes,
} from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

// hooks
import { usePrimaryButtonTextColor, usePrimaryColorScheme } from '@/hooks';

// types
import type { TButtonProps } from '@/types';

const Button: ForwardRefExoticComponent<
  PropsWithoutRef<TButtonProps> & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, TButtonProps>(
  ({ colorMode, ...otherProps }, ref) => {
    // hooks
    const primaryButtonTextColor = usePrimaryButtonTextColor(colorMode);
    const primaryColorScheme = usePrimaryColorScheme(colorMode);

    return (
      <ChakraButton
        color={
          otherProps.variant !== 'outline'
            ? primaryButtonTextColor
            : otherProps.color
        }
        colorScheme={primaryColorScheme}
        {...otherProps}
        borderRadius="3xl"
        ref={ref as LegacyRef<HTMLButtonElement>}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
