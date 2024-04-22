import React from 'react';
// eslint-disable-next-line import/extensions
import Task from '@/components/Modal/Task';
import mockData from '../components/Modal/Task/mock.json';

export default function Home() {
  return (
    <div>
      <Task
        title={mockData.title}
        description={mockData.description}
        tags={mockData.tags}
        dueDate={mockData.dueDate}
        assignee={mockData.assignee}
        imageUrl={mockData.imageUrl}
      />
    </div>
  );
}
