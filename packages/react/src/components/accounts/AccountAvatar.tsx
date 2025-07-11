import { Avatar, Circle, Float, Icon } from '@chakra-ui/react';
import { type FC, useMemo } from 'react';
import { IoEyeOutline, IoLockClosedOutline } from 'react-icons/io5';

// hooks
import { usePrimaryButtonTextColor, usePrimaryColor } from '@/hooks';

// types
import type { TAccountAvatarProps } from '@/types';

// utils
import { accountIcon, iconSize } from '@/utilities';

const AccountAvatar: FC<TAccountAvatarProps> = ({
  account,
  badges,
  colorMode,
  size = 'md',
}) => {
  // hooks
  const primaryButtonTextColor = usePrimaryButtonTextColor(colorMode);
  const primaryColor = usePrimaryColor(colorMode);
  // memos
  const badgeIconSize = useMemo(() => iconSize('xs'), []);
  // misc
  let iconColor = primaryButtonTextColor;

  switch (account.color) {
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
        bg: !account.color || account.color === 'primary'
          ? primaryColor
          : account.color
      }}
      size={size}
    >
      {/*icon*/}
      {accountIcon({
        color: iconColor,
        size,
        ...(account.icon && {
          icon: account.icon,
        })
      })}

      {/*rekeyed badge*/}
      {badges?.rekeyed && (
        <Float placement="bottom-end" offsetX="1" offsetY="1">
          <Circle
            bg="green.500"
            size="1.1em"
          >
            <Icon boxSize={badgeIconSize} color="white">
              <IoLockClosedOutline />
            </Icon>
          </Circle>
        </Float>
      )}

      {/*watch badge*/}
      {badges?.watch && (
        <Float placement="top-end" offsetX="1" offsetY="1">
          <Circle
            bg="blue.500"
            size="1.1em"
          >
            <Icon boxSize={badgeIconSize} color="white">
              <IoEyeOutline />
            </Icon>
          </Circle>
        </Float>
      )}
    </Avatar.Root>
  );
};

AccountAvatar.displayName = 'AccountAvatar';

export default AccountAvatar;
