import Message from '@/components/Message';
import { auth, db } from '@/utils/firebase';
import { arrayUnion, doc, Timestamp, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Details() {
  const route = useRouter();
  const routeData = route.query;
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);

  // Submit a message
  const submitMessage = async () => {
    // See if the user is logged
    if (!auth.currentUser) return route.push('/auth/login');
    if (!message) {
      toast.error("Don't leave an empty message 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }

    const docRef = doc(db, 'posts', routeData.id);
    await updateDoc(docRef, {
      comments: arrayUnion({
        message,
        avatar: auth.currentUser.photoURL,
        username: auth.currentUser.displayName,
        time: Timestamp.now(),
      }),
    });

    setMessage('');
  };

  return (
    <div>
      <Message {...routeData}></Message>
      <div className='my-4'>
        <div className='flex'>
          <input
            onChange={(e) => setMessage(e.target.value)}
            type='text'
            value={message}
            placeholder='Send a message 😀'
            className='bg-gray-800 w-full p-2 text-white text-sm'
          />
          <button
            onClick={submitMessage}
            className='bg-cyan-500 text-white py-2 px-4 text-sm'
          >
            Submit
          </button>
        </div>
        <div className='py-6'>
          <h2 className='font-bold'>Comments</h2>
          {allMessages.map((message) => {
            return (
              <div key={message.id}>
                <div>
                  {/* <Image
                    src={avatar}
                    alt='avatar'
                    width={48}
                    height={48}
                    className='w-10 rounded-full'
                  /> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
