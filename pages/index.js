import Message from '@/components/Message';
import { db } from '@/utils/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  // Create a state with all the posts
  const [allPosts, setAllPosts] = useState([]);

  const getPosts = async () => {
    const collectionRef = collection(db, 'posts');
    const q = query(collectionRef, orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data() })));
      console.log(snapshot.docs.map((doc) => ({ ...doc.data() })));
    });
    return unsubscribe;
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <Head>
        <title>Creative Minds</title>
        <meta name='description' content='Creative Minds' />
      </Head>

      <div className='my-12 text-lg font-medium'>
        <h2>See what other people are saying</h2>
        <Message />
      </div>
    </div>
  );
}
