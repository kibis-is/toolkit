import {
  type PropsWithoutRef,
  type ForwardRefExoticComponent,
  forwardRef,
  type LegacyRef,
  type RefAttributes,
} from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

// hooks
import { usePrimaryButtonTextColor, usePrimaryColorPalette } from '@/hooks';

// types
import type { TButtonProps } from '@/types';

const Button: ForwardRefExoticComponent<
  PropsWithoutRef<TButtonProps> & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, TButtonProps>(
  ({ colorMode, ...otherProps }, ref) => {
    // hooks
    const primaryButtonTextColor = usePrimaryButtonTextColor(colorMode);
    const primaryColorPalette = usePrimaryColorPalette(colorMode);

    return (
      <ChakraButton
        _hover={{
          color: otherProps.variant == 'outline' ? primaryButtonTextColor : otherProps.color,
        }}
        color={
          otherProps.variant !== 'outline'
            ? primaryButtonTextColor
            : otherProps.color
        }
        colorPalette={primaryColorPalette}
        borderRadius="3xl"
        {...otherProps}
        ref={ref as LegacyRef<HTMLButtonElement>}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
