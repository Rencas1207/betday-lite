import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Typography from './Typography';

const meta = {
  title: 'Design System/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Headings: Story = {
  args: {
    variant: 'h1',
    children: 'Ganador del Partido'
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <Typography variant="h1">Ganador del Partido</Typography>
      <Typography variant="h2" className="text-emerald-600">
        Mis Apuestas
      </Typography>
      <Typography variant="h3">Detalles de Operación</Typography>
      <Typography variant="body">
        Este es un texto de cuerpo para descripciones largas.
      </Typography>
      <Typography variant="small">ID Operación: #123456</Typography>
    </div>
  )
};

export const Playground: Story = {
  args: {
    variant: 'h2',
    children: 'Texto editable desde controls'
  }
};
