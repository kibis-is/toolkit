import { Field, Input, InputGroup } from '@chakra-ui/react';
import { randomString } from '@stablelib/random';
import React, { type FC, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoEye, IoEyeOff } from 'react-icons/io5';

// components
import IconButton from '@/components/buttons/IconButton';
import Text from '@/components/typography/Text';

// constants
import { DEFAULT_GAP } from '@/constants';

// hooks
import { useDefaultTextColor, usePrimaryColor, usePrimaryColorPalette, useSubTextColor } from '@/hooks';

// types
import type { TPasswordInputProps } from '@/types';

const PasswordInput: FC<TPasswordInputProps> = ({
  colorMode,
  disabled,
  error,
  hint,
  id,
  inputRef,
  label,
  onKeyUp,
  onChange,
  required = false,
  value,
}) => {
  const { t } = useTranslation('kibisis_react');
  // hooks
  const defaultTextColor = useDefaultTextColor(colorMode);
  const primaryColor = usePrimaryColor(colorMode);
  const primaryColorPalette = usePrimaryColorPalette(colorMode);
  const subTextColor = useSubTextColor(colorMode);
  // state
  const [show, setShow] = useState<boolean>(false);
  // memos
  const _id = useMemo(() => id || randomString(6), [id]);
  // callbacks
  const handleOnShowHideClick = useCallback(() => setShow(!show), [show, setShow]);

  return (
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
          autoComplete="current-password"
          borderRadius="full"
          caretColor={defaultTextColor}
          color={defaultTextColor}
          colorPalette={primaryColorPalette}
          focusBorderColor={primaryColor}
          id={_id}
          disabled={disabled}
          name="password"
          onChange={onChange}
          onKeyUp={onKeyUp}
          placeholder={t('placeholders.enterPassword')}
          size="lg"
          ref={inputRef}
          type={show ? 'text' : 'password'}
          value={value}
          w="full"
        />
      </InputGroup>

      <Field.ErrorText>
        <Text color="red.500" fontSize="xs" pl={DEFAULT_GAP - 2}>
          {error}
        </Text>
      </Field.ErrorText>

      <Field.HelperText>
        <Text color={subTextColor} fontSize="xs" pl={DEFAULT_GAP - 2}>
          {hint}
        </Text>
      </Field.HelperText>
    </Field.Root>
  );
};

export default PasswordInput;
