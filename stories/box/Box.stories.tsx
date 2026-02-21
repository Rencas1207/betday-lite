import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from './Box';

const meta: Meta<typeof Box> = {
  title: 'Layout/Box',
  component: Box,
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'aside', 'main'],
      description: 'Etiqueta HTML que renderizará el componente'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    as: 'div',
    children: 'Este es un contenedor Box básico'
  }
};

export const AsSection: Story = {
  args: {
    as: 'section',
    className: 'bg-slate-900 text-white',
    children: 'Soy una etiqueta <section> oscura'
  }
};

export const TicketStyle: Story = {
  args: {
    as: 'article',
    children: (
      <div className="text-center">
        <h3 className="font-bold">Contenido de ejemplo</h3>
        <p className="text-sm text-slate-500">
          Cualquier componente puede ir aquí dentro.
        </p>
      </div>
    )
  }
};
