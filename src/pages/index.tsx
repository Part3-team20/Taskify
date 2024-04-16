import React from 'react';
// eslint-disable-next-line import/extensions
import LabelChip from '@/components/common/chip/LabelChip';
// eslint-disable-next-line import/extensions
import PlusChip from '@/components/common/chip/PlusChip';

export default function Home() {
  return (
    <div>
      <LabelChip size="small" label="To Do" type="columns" />
      <LabelChip size="large" label="On Progress" type="columns" />
      <LabelChip size="small" label="프로젝트" type="tag" />
      <LabelChip size="large" label="일반" type="tag" />
      <PlusChip type="small" />
      <PlusChip type="large" />
    </div>
  );
}
