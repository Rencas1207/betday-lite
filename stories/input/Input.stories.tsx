import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Lock, Mail, User } from 'lucide-react';
import Input from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Nombre de Usuario',
    placeholder: 'Ej. testuser'
  }
};

export const WithIcon: Story = {
  args: {
    label: 'Usuario',
    placeholder: 'Ej. renzo.dev',
    icon: User
  }
};

export const Password: Story = {
  args: {
    label: 'Contraseña',
    type: 'password',
    placeholder: '••••••••',
    icon: Lock
  }
};

export const Email: Story = {
  args: {
    label: 'Correo Electrónico',
    type: 'email',
    placeholder: 'correo@ejemplo.com',
    icon: Mail
  }
};

export const Disabled: Story = {
  args: {
    label: 'Deshabilitado',
    placeholder: 'No editable',
    disabled: true
  }
};

export const ErrorState: Story = {
  args: {
    label: 'Nombre',
    placeholder: 'Campo requerido',
    className: 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
  }
};
