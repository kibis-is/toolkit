import { HStack, Text } from '@chakra-ui/react';
import { type FC } from 'react';

// hooks
import { useDefaultTextColor } from '@/hooks';

// types
import type { TLabelProps } from '@/types';

const Label: FC<TLabelProps> = ({
  colorMode,
  error,
  fontFamily,
  label,
  required = false,
  ...stackProps
}) => {
  // hooks
  const defaultTextColor = useDefaultTextColor(colorMode);

  return (
    <HStack
      align="flex-end"
      justify="space-between"
      w="full"
      {...stackProps}
    >
      {/*label*/}
      {required ? (
        <HStack align="center" gap={1}>
          <Text
            as="label"
            color={error ? 'red.300' : defaultTextColor}
            fontFamily={fontFamily}
            fontSize="xs"
            m={0}
            p={0}
            textAlign="left"
          >
            {label}
          </Text>

          {/*required asterisk*/}
          <Text
            as="span"
            color="red.300"
            fontFamily={fontFamily}
            fontSize="xs"
            m={0}
            p={0}
            textAlign="left"
          >
            {`*`}
          </Text>
        </HStack>
      ) : (
        <Text
          as="label"
          color={error ? 'red.300' : defaultTextColor}
          fontFamily={fontFamily}
          fontSize="xs"
          m={0}
          p={0}
          textAlign="left"
        >
          {label}
        </Text>
      )}

      {/*error*/}
      {error && (
        <Text
          color="red.300"
          fontFamily={fontFamily}
          fontSize="xs"
          m={0}
          p={0}
          textAlign="right"
        >
          {error}
        </Text>
      )}
    </HStack>
  );
};

export default Label;
