import { ArgTypes, Description, Title } from '@storybook/addon-docs';
import type { Preview } from '@storybook/react';
import { useEffect } from 'react';

// theme
import theme from '@/theme';

const preview: Preview = {
  decorators: [
    (Story, context) => {
      useEffect(() => {
        const background: string | null = theme.tokens.getByName(context.globals.theme === 'light' ? 'colors.backgroundLight.500' : 'colors.backgroundDark.500')?.value || null;

        if (background) {
          document.body.style.background = background;
        }
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
