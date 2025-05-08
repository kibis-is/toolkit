import { Avatar } from '@chakra-ui/react';
import { type FC } from 'react';

// hooks
import { usePrimaryButtonTextColor, usePrimaryColor } from '@/hooks';

// types
import type { TAccountAvatarProps } from '@/types';

// utils
import { accountIcon } from '@/utilities';

const AccountAvatar: FC<TAccountAvatarProps> = ({
  color,
  colorMode,
  icon,
  size = 'md',
}) => {
  // hooks
  const primaryButtonTextColor = usePrimaryButtonTextColor(colorMode);
  const primaryColor = usePrimaryColor(colorMode);
  // misc
  let iconColor = primaryButtonTextColor;

  switch (color) {
    case 'yellow.300':
    case 'yellow.500':
    case 'orange.300':
    case 'orange.500':
    case 'red.300':
    case 'red.500':
      iconColor = 'gray.800';
      break;
    case 'black':
    case 'blue.300':
    case 'blue.500':
    case 'green.300':
    case 'green.500':
    case 'teal.300':
    case 'teal.500':
      iconColor = 'white';
      break;
    case 'primary':
    default:
      break;
  }

  return (
    <Avatar.Root
      css={{
        bg: !color || color === 'primary'
          ? primaryColor
          : color
      }}
      size={size}
    >
      {accountIcon({
        icon,
        color: iconColor,
        size,
      })}
    </Avatar.Root>
  );

  // return (
  //   <Avatar
  //     bg={
  //       !color || color === 'primary'
  //         ? primaryColor
  //         : color
  //     }
  //     icon={accountIcon({
  //       icon: icon || null,
  //       color: iconColor,
  //     })}
  //     size={size}
  //   >
  //     {children}
  //   </Avatar>
  // );
};

AccountAvatar.displayName = 'AccountAvatar';

export default AccountAvatar;
