import { Icon, IconButton as ChakraIconButton } from '@chakra-ui/react';
import {
  type PropsWithoutRef,
  type ForwardRefExoticComponent,
  forwardRef,
  type LegacyRef,
  type RefAttributes,
} from 'react';

// hooks
import { useButtonHoverBackgroundColor, useSubTextColor } from '@/hooks';

// types
import type { TIconButtonProps } from '@/types';

const IconButton: ForwardRefExoticComponent<
  PropsWithoutRef<TIconButtonProps> & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, TIconButtonProps>(
  ({ color, colorMode, icon, ...iconProps }, ref) => {
    // hooks
    const buttonHoverBackgroundColor = useButtonHoverBackgroundColor(colorMode);
    const subTextColor = useSubTextColor(colorMode);

    return (
      <ChakraIconButton
        {...iconProps}
        _active={{
          bg: buttonHoverBackgroundColor,
        }}
        _hover={{
          bg: buttonHoverBackgroundColor,
        }}
        ref={ref as LegacyRef<HTMLButtonElement>}
        variant="ghost"
      >
        <Icon as={icon} color={color || subTextColor} />
      </ChakraIconButton>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
