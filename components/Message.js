import Image from 'next/image';

export default function Message({ children }) {
  return (
    <div className='bg-white p-8 border-b-2 rounded-lg'>
      <div className='flex items-center'>
        {/* <Image src='' alt='' /> */}
        <h2>user</h2>
      </div>
      <div>
        <p>description</p>
      </div>
      {children}
    </div>
  );
}
