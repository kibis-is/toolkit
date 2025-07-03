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

const AccountItem: FC<TAccountItemProps> = ({ account, colorMode, subTextColor, textColor }) => {
  // hooks
  const defaultSubTextColor = useSubTextColor(colorMode);
  const defaultTextColor = useDefaultTextColor(colorMode);
  // memos
  const _address = useMemo(
    () =>
      ellipseText(account.address, {
        end: 10,
        start: 10,
      }),
    [account.address]
  );
  // renders
  const renderNameAddress = useCallback(() => {
    if (account.name) {
      return (
        <VStack align="flex-start" flexGrow={1} gap={0} justify="space-evenly">
          <Text color={defaultTextColor} fontSize="sm" maxW={195} textAlign="left" truncate={true}>
            {account.name}
          </Text>

          <Text color={subTextColor || defaultSubTextColor} fontSize="xs" textAlign="left">
            {account.domainName.primary ?? _address}
          </Text>
        </VStack>
      );
    }

    // if there is no name, but there is a domain name, display the domain name
    if (account.domainName) {
      return (
        <VStack align="flex-start" flexGrow={1} gap={0} justify="space-evenly">
          <Text color={textColor || defaultTextColor} fontSize="sm" maxW={195} textAlign="left" truncate={true}>
            {account.domainName.primary}
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
  }, [_address, defaultSubTextColor, defaultTextColor, account.domainName.primary, account.name, subTextColor, textColor]);

  return (
    <HStack gap={DEFAULT_GAP / 3} m={0} minW={300} p={0} w="full">
      {/*avatar*/}
      <Center>
        <AccountAvatar account={account} colorMode={colorMode} />
      </Center>

      {renderNameAddress()}
    </HStack>
  );
};

export default AccountItem;
