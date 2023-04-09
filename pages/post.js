import { auth, db } from '@/utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';

export default function Post() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [post, setPost] = useState({ description: '' });

  // Submit Post
  const submitPost = async (e) => {
    e.preventDefault();
    console.log(post);

    // Run checks for description
    if (!post.description) {
      toast.error('Description Field empty 😅', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }

    if (post.description.length > 300) {
      toast.error('Description too long 😅', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }

    // Make a new post
    const collectionRef = collection(db, 'posts');
    await addDoc(collectionRef, {
      ...post,
      timestamp: serverTimestamp(),
      user: user.uid,
      avatar: user.photoURL,
      username: user.displayName,
    });

    setPost({ description: '' });
    return route.push('/');
  };

  return (
    <div className='my-20 p-12 shadow-lg rounded-lg max-w-medium mx-auto'>
      <form onSubmit={submitPost}>
        <h1 className='text-2xl font-bold'>Create a new post</h1>
        <div className='py-2'>
          <h3 className='text-lg font-medium py-2'>Description</h3>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className='bg-gray-800 h-48 w-full text-white rounded-lg p-2 test-sm'
          ></textarea>
          <p
            className={`text-cyan-600 font-medium tsxt-sm ${
              post.description.length > 300 ? 'text-red-600' : ''
            }`}
          >
            {post.description.length}/300
          </p>
        </div>
        <button
          type='submit'
          className='w-full bg-cyan-600 text-white font-medium p-2 my-2 rounded-lg text-sm'
        >
          Submit
        </button>
      </form>
    </div>
  );
}
