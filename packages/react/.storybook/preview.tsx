import { ArgTypes, Description, Title } from '@storybook/addon-docs';
import type { Preview } from '@storybook/react';
import { useEffect } from 'react';

// constants
import { BACKGROUND_COLOR_DARK, BACKGROUND_COLOR_LIGHT } from '@/constants';

const preview: Preview = {
  decorators: [
    (Story, context) => {
      useEffect(() => {
        document.body.style.background =
          context.globals.theme === 'light'
            ? BACKGROUND_COLOR_LIGHT
            : BACKGROUND_COLOR_DARK;
      }, [context.globals.theme]);
      return <Story />;
    },
  ],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description />
          <ArgTypes />
        </>
      ),
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default preview;
