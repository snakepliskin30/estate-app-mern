import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { register } from 'swiper/element/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import ContactLandlord from '../components/ContactLandlord';

register();

export default function Listing() {
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [listingInfo, setListingInfo] = useState(null);
  const [copied, setCopied] = useState(false);
  const [contactLandlord, setContactLandlord] = useState(false);
  const params = useParams();

  const swiperElRef = useRef(null);

  useEffect(() => {
    const getListingInfo = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(`/api/listing/get/${params.listingId}`, {
          method: 'GET',
        });

        const data = await res.json();

        if (!res.ok) {
          return setError(data.message);
        }
        setListingInfo(data);
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getListingInfo();
  }, [params.listingId]);

  // useEffect(() => {
  //   if (listingInfo) {
  //     // listen for Swiper events using addEventListener
  //     swiperElRef.current.addEventListener('swiperprogress', (e) => {
  //       const [swiper, progress] = e.detail;
  //       console.log(progress);
  //     });

  //     swiperElRef.current.addEventListener('swiperslidechange', (e) => {
  //       console.log('slide changed');
  //     });
  //   }
  // }, [listingInfo]);

  return (
    <div>
      {loading && <p className='text-2xl text-center my-7'>Loading...</p>}
      {error && <p className='text-sm text-red-700'>{error}</p>}
      {listingInfo &&
        listingInfo?.imageUrls?.length > 0 &&
        !loading &&
        !error && (
          <>
            <swiper-container
              ref={swiperElRef}
              slides-per-view='1'
              navigation='true'
              pagination='true'
            >
              {listingInfo.imageUrls.map((url) => (
                <swiper-slide key={url}>
                  <div
                    className='h-[550px]'
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: 'cover',
                    }}
                  />
                </swiper-slide>
              ))}
            </swiper-container>
            <div
              className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            >
              <FaShare className='text-slate-500' />
            </div>
            {copied && (
              <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
                Link copied!
              </p>
            )}
            <div className='max-w-4xl mx-auto p-3 flex flex-col gap-4'>
              <div className='text-3xl font-semibold my-4 text-center'>
                {listingInfo.name} - ${' '}
                {listingInfo.offer
                  ? listingInfo.discountedPrice.toLocaleString('en-US')
                  : listingInfo.regularPrice.toLocaleString('en-US')}
                {listingInfo.type === 'rent' ? ' / month' : ''}
              </div>

              <div className='flex items-center gap-2 text-slate-600'>
                <FaMapMarkerAlt className='text-green-700' />{' '}
                {listingInfo.address}
              </div>

              <div className='flex gap-4'>
                <div className='bg-red-900 p-1 rounded-lg text-white text-center w-full max-w-[200px]'>
                  <p>{listingInfo.type === 'sale' ? 'For-Sale' : 'For-Rent'}</p>
                </div>
                {listingInfo.offer && (
                  <p className='bg-green-900 p-1 rounded-lg text-white text-center w-full max-w-[200px]'>
                    {`$
                    ${(
                      +listingInfo.regularPrice - +listingInfo.discountedPrice
                    ).toLocaleString('en-US')} OFF`}
                  </p>
                )}
              </div>
              <p className='text-slate-800'>
                <span className='font-semibold text-black'>Description - </span>
                {listingInfo.description}
              </p>

              <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaBed className='text-lg' />
                  {listingInfo.bedroom > 1
                    ? `${listingInfo.bedroom} beds`
                    : `${listingInfo.bedroom} bed`}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaBath className='text-lg' />
                  {listingInfo.bathroom > 1
                    ? `${listingInfo.bathroom} baths`
                    : `${listingInfo.bathroom} bath`}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaParking className='text-lg' />
                  {listingInfo.parking ? `Parking spot` : `No Parking`}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaChair className='text-lg' />
                  {listingInfo.furnished ? `Furnished` : `Unfurnished`}
                </li>
              </ul>

              {currentUser &&
                currentUser?._id !== listingInfo.userRef &&
                !contactLandlord && (
                  <button
                    className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
                    onClick={() => setContactLandlord(true)}
                  >
                    Contact Landlord
                  </button>
                )}
              {contactLandlord && <ContactLandlord listingInfo={listingInfo} />}
            </div>
          </>
        )}
    </div>
  );
}
