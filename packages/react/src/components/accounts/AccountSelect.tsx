import { Button as ChakraButton, HStack, Icon, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { type FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { IoChevronDownOutline } from 'react-icons/io5';

// components
import { AccountItem, AccountSelectModal, Label } from '@/components';

// constants
import { DEFAULT_GAP, INPUT_HEIGHT } from '@/constants';

// hooks
import { useBorderColor, useButtonHoverBackgroundColor, useColorModeValue, useDefaultTextColor, usePrimaryColor, useSubTextColor } from '@/hooks';

// theme
import defaultTheme from '@/theme';

// types
import type { IAccount, TAccountSelectProps } from '@/types';

// utilities
import { iconSize } from '@/utilities';

const AccountSelect: FC<TAccountSelectProps> = ({
  accounts,
  allowWatchAccounts,
  colorMode,
  label,
  onSelect,
  required = false,
  selectModalTitle,
  value,
}) => {
  const { t } = useTranslation();
  // hooks
  const borderColor = useBorderColor();
  const buttonHoverBackgroundColor = useButtonHoverBackgroundColor();
  const primaryColorCode = useColorModeValue(defaultTheme.tokens.colorPaletteMap.get('primaryLight.500'), defaultTheme.tokens.colorPaletteMap.get('primaryDark.500'), colorMode);
  const defaultTextColor = useDefaultTextColor();
  const primaryColor = usePrimaryColor();
  const subTextColor = useSubTextColor();
  const {
    onClose: onAccountSelectClose,
    onOpen: onAccountSelectModalOpen,
    open: isAccountSelectModalOpen,
  } = useDisclosure();
  // handlers
  const handleOnClick = useCallback(() => onAccountSelectModalOpen(), [onAccountSelectModalOpen]);
  const handleOnSelect = useCallback((_value: IAccount[]) => onSelect(_value[0]), [onSelect]);

  return (
    <>
      {/*account select modal*/}
      <AccountSelectModal
        accounts={accounts}
        allowWatchAccounts={allowWatchAccounts}
        colorMode={colorMode}
        multiple={false}
        onClose={onAccountSelectClose}
        onSelect={handleOnSelect}
        open={isAccountSelectModalOpen}
        title={selectModalTitle}
      />

      <VStack align="flex-start" gap={DEFAULT_GAP / 3} w="full">
        {/*label*/}
        {label && <Label colorMode={colorMode} label={label} px={DEFAULT_GAP - 2} required={required} />}

        <ChakraButton
          _focus={{
            borderColor: primaryColor,
            boxShadow: `0 0 0 1px ${primaryColorCode}`,
          }}
          _hover={{
            bg: buttonHoverBackgroundColor,
            borderColor: borderColor,
          }}
          alignItems="center"
          borderColor={borderColor}
          borderRadius="full"
          borderStyle="solid"
          borderWidth="1px"
          h={INPUT_HEIGHT}
          justifyContent="space-between"
          onClick={handleOnClick}
          px={DEFAULT_GAP - 2}
          py={0}
          variant="ghost"
          w="full"
        >
          <HStack flexGrow={1} justify="center" w="full">
            {value ? (
              <AccountItem account={value} colorMode={colorMode} />
            ) : (
              <Text color={defaultTextColor} flexGrow={1} fontSize="sm" textAlign="left">
                {t('kibisis_react.placeholders.selectAnAccount')}
              </Text>
            )}

            <Icon boxSize={iconSize('sm')} color={subTextColor}>
              <IoChevronDownOutline />
            </Icon>
          </HStack>
        </ChakraButton>
      </VStack>
    </>
  );
};

AccountSelect.displayName = 'AccountSelect';

export default AccountSelect;
