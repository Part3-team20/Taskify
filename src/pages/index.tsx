import React from 'react';
import ExampleModal from '@/components/modal/modalExample/ExampleModal';
import Profile from '@/components/profile/Profile';

import TitleInput from '@/components/modal/modalInput/titleInput/TitleInput';
import DeadLineInput from '@/components/modal/modalInput/deadlineInput/DeadlineInput';
import CommentInput from '@/components/modal/modalInput/commentInput/CommentInput';

export default function Home() {
  return (
    <div>
      <ExampleModal />
      <Profile />
      <TitleInput />
      <DeadLineInput />
      <CommentInput />
    </div>
  );
}
