import { Heading, Icon, Text, VStack } from '@chakra-ui/react';
import { type FC } from 'react';

// constants
import { DEFAULT_GAP } from '@/constants';

// hooks
import { useDefaultTextColor, useSubTextColor } from '@/hooks';

// types
import type { TEmptyStateProps } from '@/types';

const EmptyState: FC<TEmptyStateProps> = ({
  colorMode,
  description,
  icon,
  title,
  ...stackProps
}) => {
  // hooks
  const defaultTextColor = useDefaultTextColor(colorMode);
  const subTextColor = useSubTextColor(colorMode);

  return (
    <VStack
      align="center"
      gap={DEFAULT_GAP - 2}
      justify="center"
      p={DEFAULT_GAP - 2}
      w="full"
      {...stackProps}
    >
      {/*icon*/}
      {icon && (
        <Icon as={icon} boxSize={20} color={subTextColor} />
      )}

      <VStack
        align="center"
        gap={DEFAULT_GAP / 3}
        justify="center"
        w="full"
      >
        {/*title*/}
        <Heading
          color={defaultTextColor}
          size="md"
          m={0}
          p={0}
          textAlign="center"
        >
          {title}
        </Heading>

        {/*description*/}
        {description && (
          <Text
            color={subTextColor}
            fontSize="sm"
            m={0}
            p={0}
            textAlign="center"
          >
            {description}
          </Text>
        )}
      </VStack>
    </VStack>
  );
};

export default EmptyState;
