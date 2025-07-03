import {
  Button as ChakraButton,
  Checkbox,
  Heading,
  HStack,
  Icon,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { upsertItemsByKey } from '@kibisis/utilities';
import { randomString } from '@stablelib/random';
import { type FC, useMemo, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { IoCheckmarkOutline, IoChevronForward, IoSearchOutline } from 'react-icons/io5';

// components
import { AccountAvatar, Button, EmptyState, Modal } from '@/components';

// constants
import { DEFAULT_GAP, TAB_ITEM_HEIGHT } from '@/constants';

// hooks
import { useBackgroundColor, useButtonHoverBackgroundColor, useDefaultTextColor, usePrimaryColorPalette, useSubTextColor } from '@/hooks';

// types
import type { IAccount, TAccountSelectModalProps } from '@/types';

// utils
import { ellipseText, iconSize } from '@/utilities';

const AccountSelectModal: FC<TAccountSelectModalProps> = ({
  accounts,
  allowWatchAccounts = true,
  colorMode,
  multiple,
  onClose,
  onSelect,
  open,
  title,
}) => {
  const { t } = useTranslation();
  // hooks
  const backgroundColor = useBackgroundColor(colorMode);
  const buttonHoverBackgroundColor = useButtonHoverBackgroundColor(colorMode);
  const defaultTextColor = useDefaultTextColor(colorMode);
  const primaryColorPalette = usePrimaryColorPalette(colorMode);
  const subTextColor = useSubTextColor(colorMode);
  // memo
  const context = useMemo(() => randomString(8), []);
  // states
  const [selectedAccounts, setSelectedAccounts] = useState<IAccount[]>([]);
  // memos
  const _iconSize = useMemo(() => iconSize('md'), []);
  const indeterminate = useMemo(() => selectedAccounts.length > 0 && selectedAccounts.length < accounts.length, [selectedAccounts]);
  // callbacks
  const handleOnAccountChange = useCallback((account: IAccount) => () => {
    // for a single selection, just return the account
    if (!multiple) {
      return handleConfirm([account]);
    }

    // if the account exists in the selected accounts, remove it
    if (selectedAccounts.find((value) => value.address === account.address)) {
      return setSelectedAccounts(selectedAccounts.filter((value) => value.address !== account.address));
    }

    setSelectedAccounts(upsertItemsByKey(selectedAccounts, [account], 'address'));
  }, [selectedAccounts, setSelectedAccounts]);
  const reset = useCallback(() => setSelectedAccounts([]), [setSelectedAccounts]);
  const handleClose = useCallback(() => {
    onClose?.();

    reset(); // clean up
  }, [onClose, reset]);
  const handleCancelClick = useCallback(() => handleClose(), [handleClose]);
  const handleConfirm = useCallback((_accounts: IAccount[]) => {
    onSelect(_accounts);
    handleClose();
  }, [onSelect]);
  const handleConfirmClick = useCallback(() => handleConfirm(selectedAccounts), [handleConfirm, selectedAccounts]);
  const handleOnSelectAllCheckChange = useCallback(() => {
    if (selectedAccounts.length <= 0) {
      return setSelectedAccounts(allowWatchAccounts ? accounts : accounts.filter((value) => !value.watch));
    }

    setSelectedAccounts([]);
  }, [accounts, allowWatchAccounts, setSelectedAccounts]);
  // renders
  const renderNameAddress = useCallback(
    (account: IAccount) => {
      const address = ellipseText(account.address, {
        end: 10,
        start: 10,
      });

      if (account.name) {
        return (
          <VStack align="flex-start" flexGrow={1} gap={0} justify="space-evenly">
            <Text
              color={allowWatchAccounts || !account.watch ? defaultTextColor : subTextColor}
              fontSize="md"
              maxW={400}
              truncate={true}
              textAlign="left"
            >
              {account.name}
            </Text>

            <Text color={subTextColor} fontSize="sm" textAlign="left">
              {account.domainName.primary ?? address}
            </Text>
          </VStack>
        );
      }

      // if there is no name, but there is a domain name, display it
      if (account.domainName.primary) {
        return (
          <VStack align="flex-start" flexGrow={1} gap={0} justify="space-evenly">
            <Text
              color={allowWatchAccounts || !account.watch ? defaultTextColor : subTextColor}
              fontSize="md"
              maxW={400}
              truncate={true}
              textAlign="left"
            >
              {account.domainName.primary}
            </Text>

            <Text color={subTextColor} fontSize="sm" textAlign="left">
              {address}
            </Text>
          </VStack>
        );
      }

      return (
        <Text
          color={allowWatchAccounts || !account.watch ? defaultTextColor : subTextColor}
          flexGrow={1}
          fontSize="md"
          textAlign="left"
        >
          {address}
        </Text>
      );
    },
    [allowWatchAccounts, defaultTextColor, subTextColor]
  );
  const renderContent = () => {
    if (accounts.length <= 0) {
      return (
        <>
          <Spacer />

          {/*empty state*/}
          <EmptyState
            colorMode={colorMode}
            icon={IoSearchOutline}
            title={t('kibisis_react.headings.noAccountsFound')}
          />

          <Spacer />
        </>
      );
    }

    return (
      accounts.map((account, index) => {
        return (
          <ChakraButton
            _hover={{
              bg: backgroundColor,
            }}
            borderRadius="full"
            cursor="not-allowed"
            fontSize="md"
            h={TAB_ITEM_HEIGHT}
            justifyContent="start"
            key={`${context}-account-select-modal-item-${index}`}
            px={DEFAULT_GAP / 2}
            py={0}
            sx={{
              opacity: 0.6,
            }}
            variant="ghost"
            w="full"
            {...((allowWatchAccounts || !account.watch) && {
              _hover: {
                bg: buttonHoverBackgroundColor,
              },
              cursor: 'pointer',
              onClick: handleOnAccountChange(account),
              sx: {
                opacity: 1,
              },
            })}
          >
            <HStack gap={DEFAULT_GAP - 2} py={DEFAULT_GAP - 2} w="full">
              {/*account icon*/}
              <AccountAvatar
                account={account}
                badges={{
                  watch: account.watch,
                }}
                colorMode={colorMode}
              />

              {/*name/address*/}
              {renderNameAddress(account)}
            </HStack>

            {multiple ? (
              <Checkbox.Root
                colorPalette={primaryColorPalette}
                checked={!!selectedAccounts.find((value) => value.address === account.address)}
                pointerEvents="none"
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
              </Checkbox.Root>
            ) : (
              <Icon as={IoChevronForward} color={defaultTextColor} h={_iconSize} w={_iconSize} />
            )}
          </ChakraButton>
        );
    }));
  };

  return (
    <Modal
      body={(
        <VStack gap={1} w="full">
          {renderContent()}
        </VStack>
      )}
      colorMode={colorMode}
      footer={(
        <HStack gap={DEFAULT_GAP - 2} w="full">
          <Button colorMode={colorMode} onClick={handleCancelClick} size="lg" variant="outline" w="full">
            {t('kibisis_react.buttons.cancel')}
          </Button>

          {multiple && (
            <Button
              colorMode={colorMode}
              onClick={handleConfirmClick}
              size="lg"
              variant="solid"
              w="full"
            >
              {t('kibisis_react.buttons.confirm')}
              <Icon as={IoCheckmarkOutline} color={defaultTextColor} h={_iconSize} w={_iconSize} />
            </Button>
          )}
        </HStack>
      )}
      header={(
        <VStack gap={DEFAULT_GAP - 2} p={DEFAULT_GAP} w="full">
          {/*heading*/}
          <Heading color={defaultTextColor} size="md" textAlign="center" w="full">
            {title || t(multiple ? 'kibisis_react.headings.selectAccounts' : 'kibisis_react.headings.selectAccount')}
          </Heading>

          {/*select all accounts*/}
          {multiple && (
            <Stack align="flex-end" justify="center" px={DEFAULT_GAP / 2} w="full">
              <Checkbox.Root
                checked={indeterminate ? 'indeterminate' : selectedAccounts.length === accounts.length}
                onCheckedChange={handleOnSelectAllCheckChange}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
              </Checkbox.Root>
            </Stack>
          )}
        </VStack>
      )}
      open={open}
    />
  );
};

AccountSelectModal.displayName = 'AccountSelectModal';

export default AccountSelectModal;
