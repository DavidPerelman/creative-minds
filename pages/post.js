import { auth, db } from '@/utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Post() {
  const [user, loading] = useAuthState(auth);

  return (
    <div className='my-20 p-12 shadow-lg rounded-lg max-w-medium mx-auto'>
      <form>
        <h1 className='text-2xl font-bold'>Create a new post</h1>
        <div className='py-2'>
          <h3 className='text-lg font-medium py-2'>Description</h3>
          <textarea className='bg-gray-800 h-48 w-full text-white rounded-lg p-2 test-sm'></textarea>
          <p>0/300</p>
        </div>
        <button className='w-full bg-cyan-600 text-white font-medium p-2 my-2 rounded-lg text-sm'>
          Submit
        </button>
      </form>
    </div>
  );
}
