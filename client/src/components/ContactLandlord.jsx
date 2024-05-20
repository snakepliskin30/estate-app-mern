/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ContactLandlord({ listingInfo }) {
  const [landlordInfo, setLandlordInfo] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      const res = await fetch(`/api/user/${listingInfo.userRef}`, {
        method: 'GET',
      });

      const data = await res.json();

      setLandlordInfo(data);
    };

    getUserData();
  }, [listingInfo.userRef]);

  return (
    <>
      {landlordInfo && (
        <div className='flex flex-col gap-4'>
          <p>
            Contact{' '}
            <span className='font-semibold'>{landlordInfo.username}</span> on{' '}
            <span className='font-semibold'>{listingInfo.name}</span>
          </p>
          <textarea
            name='message'
            id='message'
            value={message}
            rows='2'
            placeholder='Enter your message here...'
            className='border rounded-lg p-3'
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <Link
            className='bg-slate-700 p-3 text-white text-center rounded-lg hover:opacity-95'
            to={`mailto:${landlordInfo.email}?subject=Inquiring about ${listingInfo.name}&body=${message}`}
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
