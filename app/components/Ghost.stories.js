import Ghost from './Ghost';

export default {
  title: 'Components/Ghost',
  component: Ghost,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export const Default = {
  render: () => <Ghost />,
};

export const WithBackground = {
  render: () => (
    <div style={{ backgroundColor: '#f0f0f0' }}>
      <Ghost />
    </div>
  ),
};

export const DarkBackground = {
  render: () => (
    <div style={{ backgroundColor: '#1a1a1a' }}>
      <Ghost />
    </div>
  ),
};
