import React from 'react';
import { render, screen } from '@testing-library/react';
import MasterVideo from '../lib/';

import video from './videos/1.mp4'

test('renders learn react link', () => {
  render(<MasterVideo options={{ source: video, controls: true }} />);
  const MasterElement = screen.getByRole('master-video')
  expect(MasterElement).toBeInTheDocument();
});