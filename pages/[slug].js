import Message from '@/components/Message';
import { auth, db } from '@/utils/firebase';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Details() {
  const route = useRouter();
  const routeData = route.query;
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);

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
          <button className='bg-cyan-500 text-white py-2 px-4 text-sm'>
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
