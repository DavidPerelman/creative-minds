import Message from '@/components/Message';
import Head from 'next/head';

export default function Home() {
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
