import {
  AbsoluteCenter,
  Icon,
  ProgressCircle,
} from '@chakra-ui/react';
import { type FC, useMemo } from 'react';

// hooks
import { useColorModeValue, usePrimaryColor, useSubTextColor } from '@/hooks';

// types
import type { ICircularProgressWithIconProps } from '@/types';

// utils
import { iconSize } from '@/utilities/icons';

const CircularProgressWithIcon: FC<ICircularProgressWithIconProps> = ({
  colorMode,
  icon,
  iconColor,
  progress,
  progressColor,
}) => {
  // hooks
  const primaryColor = usePrimaryColor(colorMode);
  const subTextColor = useSubTextColor(colorMode);
  const trackColor = useColorModeValue('gray.300', 'whiteAlpha.400', colorMode);
  // misc
  const _iconSize = useMemo(() => iconSize('lg'), []);
  const value = useMemo(() => {
    if (!progress) {
      return null;
    }

    return progress[1] > 0 ? (progress[0] / progress[1]) * 100 : 0;
  }, [progress]);

  return (
    <ProgressCircle.Root value={value}>
      <ProgressCircle.Circle
        css={{
          '--size': '100px',
          '--thickness': '4px',
        }}
      >
        <ProgressCircle.Track stroke={trackColor} />

        <ProgressCircle.Range
          stroke={progressColor || primaryColor}
          strokeLinecap="round"
        />
      </ProgressCircle.Circle>

      <AbsoluteCenter>
        <ProgressCircle.ValueText>
          <Icon
            as={icon}
            color={iconColor || subTextColor}
            h={_iconSize}
            w={_iconSize}
          />
        </ProgressCircle.ValueText>
      </AbsoluteCenter>
    </ProgressCircle.Root>
  );
};

CircularProgressWithIcon.displayName = 'CircularProgressWithIcon';

export default CircularProgressWithIcon;
