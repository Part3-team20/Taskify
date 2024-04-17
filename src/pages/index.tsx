import React from 'react';
// eslint-disable-next-line import/extensions
import LabelChip from '@/components/common/chip/LabelChip';
// eslint-disable-next-line import/extensions
import PlusChip from '@/components/common/chip/PlusChip';
// eslint-disable-next-line import/extensions
import NumberChip from '@/components/common/chip/NumberChip';
// eslint-disable-next-line import/extensions
import ColorChip from '@/components/common/chip/ColorChip';

export default function Home() {
  const handleColorSelect = (color: any) => {
    console.log('Selected color:', color);
  };

  return (
    <div>
      <LabelChip size="small" label="To Do" type="columns" />
      <LabelChip size="large" label="On Progress" type="columns" />
      <LabelChip size="small" label="프로젝트" type="tag" />
      <LabelChip size="large" label="일반" type="tag" />
      <PlusChip type="small" />
      <PlusChip type="large" />
      <NumberChip number={10} />
      <ColorChip size="large" onSelect={handleColorSelect} />
    </div>
  );
}
