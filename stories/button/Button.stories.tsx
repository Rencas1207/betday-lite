import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Ticket } from 'lucide-react';
import Button from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'dark', 'outline', 'ghost']
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon']
    }
  }
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Entrar ahora'
  }
};

export const Dark: Story = {
  args: {
    variant: 'dark',
    children: 'Confirmar Apuesta'
  }
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Ver Detalles'
  }
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <Ticket size={18} className="mr-2" />
        Apostar
      </>
    )
  }
};
