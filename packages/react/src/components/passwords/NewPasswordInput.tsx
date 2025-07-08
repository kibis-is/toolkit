import { Box, Field, Input, InputGroup, Link, VStack } from '@chakra-ui/react';
import { randomString } from '@stablelib/random';
import React, {
  forwardRef,
  type ForwardRefExoticComponent,
  type PropsWithoutRef,
  type RefAttributes, useCallback, useMemo,
  useState,
} from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { IoEye, IoEyeOff, IoOpenOutline } from 'react-icons/io5';

// components
import IconButton from '@/components/buttons/IconButton';
import StrengthMeter from '@/components/passwords/StrengthMeter';
import Text from '@/components/typography/Text';

// constants
import { DEFAULT_GAP } from '@/constants';

// hooks
import { useDefaultTextColor, usePrimaryColor, usePrimaryColorPalette, useSubTextColor } from '@/hooks';

// types
import type { TNewPasswordInputProps } from '@/types';

const NewPasswordInput: ForwardRefExoticComponent<PropsWithoutRef<TNewPasswordInputProps> & RefAttributes<HTMLInputElement>> =
  forwardRef(({ colorMode, disabled, error, id, label, passwordPolicyLink, required, score, value, ...inputProps }, ref) => {
    const { t } = useTranslation('kibisis_react');
    // hooks
    const defaultTextColor = useDefaultTextColor(colorMode);
    const primaryColor = usePrimaryColor(colorMode);
    const primaryColorPalette = usePrimaryColorPalette(colorMode);
    const subTextColor = useSubTextColor(colorMode);
    // state
    const [show, setShow] = useState<boolean>(false);
    // misc
    const _id = useMemo(() => id || randomString(6), []);
    // handlers
    const handleOnShowHideClick = useCallback(() => setShow(!show), [setShow, show]);

    return (
      <VStack alignItems="flex-start" gap={DEFAULT_GAP / 3} w="full">
        <Field.Root invalid={!!error} required={required}>
          <Field.Label>
            <Text colorMode={colorMode} fontSize="sm" pl={DEFAULT_GAP - 2}>
              {label ?? t('labels.password')}
            </Text>

            <Field.RequiredIndicator />
          </Field.Label>

          <InputGroup
            endElement={(
              <IconButton
                borderRadius="full"
                color={subTextColor}
                colorMode={colorMode}
                disabled={disabled}
                icon={show ? IoEye : IoEyeOff}
                onClick={handleOnShowHideClick}
              />
            )}
          >
            <Input
              _placeholder={{
                color: subTextColor,
              }}
              autoComplete="new-password"
              borderRadius="full"
              caretColor={defaultTextColor}
              color={defaultTextColor}
              colorPalette={primaryColorPalette}
              disabled={disabled}
              focusBorderColor={primaryColor}
              placeholder={t('placeholders.enterPassword')}
              id={_id}
              ref={ref}
              size="lg"
              type={show ? 'text' : 'password'}
              value={value}
              w="full"
              {...inputProps}
            />
          </InputGroup>

          <Field.ErrorText>
            <Text color="red.500" fontSize="xs" pl={DEFAULT_GAP - 2}>
              {error}
            </Text>
          </Field.ErrorText>

          {passwordPolicyLink && (
            <Field.HelperText>
              <Text color={subTextColor} fontSize="xs" pl={DEFAULT_GAP - 2}>
                <Trans i18nKey="captions.strongPasswordInfo">
                  To conform with our{' '}
                  <Link colorPalette={primaryColorPalette} fontSize="xs" href={passwordPolicyLink} target="_blank">
                    Strong Password Policy <IoOpenOutline />
                  </Link>
                  , you are required to use a sufficiently strong password.
                </Trans>
              </Text>
            </Field.HelperText>
          )}
        </Field.Root>

        {/*strength meter*/}
        <Box px={DEFAULT_GAP - 2} w="full">
          <StrengthMeter score={score} />
        </Box>
      </VStack>
    );
  });

export default NewPasswordInput;
