import { Center, HStack, Text, VStack } from '@chakra-ui/react';
import { type FC, useCallback, useMemo } from 'react';

// components
import { AccountAvatar } from '@/components';

// constants
import { DEFAULT_GAP } from '@/constants';

// hooks
import { useDefaultTextColor, useSubTextColor } from '@/hooks';

// types
import type { TAccountItemProps } from '@/types';

// utils
import { ellipseText } from '@/utilities';

const AccountItem: FC<TAccountItemProps> = ({ address, color, colorMode, domainName, icon, name, subTextColor, textColor }) => {
  // hooks
  const defaultSubTextColor = useSubTextColor(colorMode);
  const defaultTextColor = useDefaultTextColor(colorMode);
  // memos
  const _address = useMemo(
    () =>
      ellipseText(address, {
        end: 10,
        start: 10,
      }),
    [address]
  );
  // renders
  const renderNameAddress = useCallback(() => {
    if (name) {
      return (
        <VStack align="flex-start" flexGrow={1} gap={0} justify="space-evenly">
          <Text color={defaultTextColor} fontSize="sm" maxW={195} textAlign="left" truncate={true}>
            {name}
          </Text>

          <Text color={subTextColor || defaultSubTextColor} fontSize="xs" textAlign="left">
            {domainName ?? _address}
          </Text>
        </VStack>
      );
    }

    // if there is no name, but there is a domain name, display the domain name
    if (domainName) {
      return (
        <VStack align="flex-start" flexGrow={1} gap={0} justify="space-evenly">
          <Text color={textColor || defaultTextColor} fontSize="sm" maxW={195} textAlign="left" truncate={true}>
            {domainName}
          </Text>

          <Text color={subTextColor || defaultSubTextColor} fontSize="xs" textAlign="left">
            {_address}
          </Text>
        </VStack>
      );
    }

    return (
      <Text color={textColor || defaultTextColor} flexGrow={1} fontSize="sm" textAlign="left">
        {_address}
      </Text>
    );
  }, [_address, defaultSubTextColor, defaultTextColor, domainName, name, subTextColor, textColor]);

  return (
    <HStack gap={DEFAULT_GAP / 3} m={0} minW={300} p={0} w="full">
      {/*avatar*/}
      <Center>
        <AccountAvatar color={color} colorMode={colorMode} icon={icon} />
      </Center>

      {renderNameAddress()}
    </HStack>
  );
};

export default AccountItem;
