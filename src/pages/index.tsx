import React from 'react';
// eslint-disable-next-line import/extensions
import LabelChip from '@/components/common/chip/LabelChip';

export default function Home() {
  return (
    <div>
      <LabelChip size="small" label="Tag Label" type="tag" />
      <LabelChip size="small" label="column Label" type="columns" />
    </div>
  );
}
