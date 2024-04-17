import ExampleModal from '@/components/modal/modalExample/ExampleModal';
import CommentInput from '@/components/modal/modalInput/commentInput/CommentInput';
import DeadLineInput from '@/components/modal/modalInput/deadlineInput/DeadlineInput';
import TitleInput from '@/components/modal/modalInput/titleInput/TitleInput';
import Profile from '@/components/profile/Profile';
import React from 'react';

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
