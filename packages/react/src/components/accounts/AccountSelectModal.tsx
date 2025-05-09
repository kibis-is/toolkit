import {
  Button as ChakraButton,
  Checkbox,
  Heading,
  HStack,
  Icon,
  Spacer,
  Stack,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { upsertItemsByKey } from '@kibisis/utilities';
import { randomString } from '@stablelib/random';
import { type FC, useMemo, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { IoCheckmarkOutline, IoChevronForward, IoSearchOutline } from 'react-icons/io5';

// components
import { AccountAvatar, Button, EmptyState } from '@/components';

// constants
import { DEFAULT_GAP, TAB_ITEM_HEIGHT } from '@/constants';

// hooks
import { useBackgroundColorCode, useButtonHoverBackgroundColor, useDefaultTextColor, usePrimaryColorPalette, useSubTextColor } from '@/hooks';

// theme
import { theme } from '@/theme';

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
  const backgroundColor = useBackgroundColorCode(colorMode);
  const buttonHoverBackgroundColor = useButtonHoverBackgroundColor();
  const defaultTextColor = useDefaultTextColor();
  const primaryColorPalette = usePrimaryColorPalette();
  const subTextColor = useSubTextColor();
  // memo
  const context = useMemo(() => randomString(8), []);
  // states
  const [selectedAccounts, setSelectedAccounts] = useState<IAccount[]>([]);
  // memos
  const _iconSize = useMemo(() => iconSize('md'), []);
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
    onClose && onClose();

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
      return setSelectedAccounts(allowWatchAccounts ? accounts : accounts.filter((value) => !value.watchAccount));
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
            title={t('headings.noAccountsFound')}
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
            rightIcon: multiple ? (
              <Checkbox
                colorPalette={primaryColorPalette}
                isChecked={!!selectedAccounts.find((value) => value.address === account.address)}
                pointerEvents="none"
              />
            ) : (
              <Icon as={IoChevronForward} color={defaultTextColor} h={_iconSize} w={_iconSize} />
            ),
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
        </ChakraButton>
      );
    });
  };

  return (
    <Modal isOpen={isOpen} motionPreset="slideInBottom" onClose={handleClose} size="full" scrollBehavior="inside">
      <ModalOverlay />

      <ModalContent
        alignSelf="flex-end"
        backgroundColor={BODY_BACKGROUND_COLOR}
        borderTopRadius={theme.radii['3xl']}
        borderBottomRadius={0}
        maxH="75%"
        minH={0}
      >
        {/*heading*/}
        <ModalHeader display="flex" justifyContent="center" px={DEFAULT_GAP}>
          <VStack spacing={DEFAULT_GAP - 2} w="full">
            {/*heading*/}
            <Heading color={defaultTextColor} size="md" textAlign="center" w="full">
              {title || t<string>(multiple ? 'headings.selectAccounts' : 'headings.selectAccount')}
            </Heading>

            {/*select all accounts*/}
            {multiple && (
              <Stack alignItems="flex-end" justifyContent="center" px={DEFAULT_GAP / 2} w="full">
                <Tooltip
                  aria-label={t<string>('labels.selectAllAccounts')}
                  label={t<string>('labels.selectAllAccounts')}
                >
                  <Checkbox
                    colorScheme={primaryColorScheme}
                    isChecked={selectedAccounts.length === accounts.length}
                    isIndeterminate={selectedAccounts.length > 0 && selectedAccounts.length < accounts.length}
                    onChange={handleOnSelectAllCheckChange}
                  />
                </Tooltip>
              </Stack>
            )}
          </VStack>
        </ModalHeader>

        {/*body*/}
        <ModalBody px={DEFAULT_GAP}>
          <VStack spacing={1} w="full">
            {renderContent()}
          </VStack>
        </ModalBody>

        {/*footer*/}
        <ModalFooter p={DEFAULT_GAP}>
          <HStack spacing={DEFAULT_GAP - 2} w="full">
            <Button colorMode={colorMode} onClick={handleCancelClick} size="lg" variant="outline" w="full">
              {t<string>('buttons.cancel')}
            </Button>

            {multiple && (
              <Button
                colorMode={colorMode}
                onClick={handleConfirmClick}
                rightIcon={<IoCheckmarkOutline />}
                size="lg"
                variant="solid"
                w="full"
              >
                {t<string>('buttons.confirm')}
              </Button>
            )}
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AccountSelectModal;
