import Message from '@/components/Message';
import { auth, db } from '@/utils/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Dashboard() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState([]);

  // Get users data
  useEffect(() => {
    // See if user is logged
    const getData = async () => {
      if (loading) return;
      if (!user) return route.push('/auth/login');
      const collectionRef = collection(db, 'posts');
      const q = query(collectionRef, where('user', '==', user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });

      return unsubscribe;
    };

    getData();
  }, [user, loading, route]);

  return (
    <div>
      <h1>Your Posts</h1>
      <div>
        {posts.map((post) => {
          return <Message key={post.id} {...post} />;
        })}
      </div>
      <button onClick={() => auth.signOut()}>Sign out</button>
    </div>
  );
}
