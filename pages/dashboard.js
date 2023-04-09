import { auth } from '@/utils/firebase';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Dashboard() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  // See if user id logged
  const getData = async () => {
    if (loading) return;
    if (!user) return route.push('/auth/login');
  };

  // Get users data
  useEffect(() => {
    getData();
  }, [user, loading, getData]);

  return (
    <div>
      <h1>Your Posts</h1>
      <div>posts</div>
      <button onClick={() => auth.signOut()}>Sign out</button>
    </div>
  );
}
