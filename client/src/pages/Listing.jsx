import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { register } from 'swiper/element/bundle';

register();

export default function Listing() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [listingInfo, setListingInfo] = useState(null);
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
        )}
    </div>
  );
}
