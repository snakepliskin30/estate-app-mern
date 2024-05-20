import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { register } from 'swiper/element/bundle';
import ListingCard from '../components/ListingCard';

register();

export default function Home() {
  const [offerListing, setOfferListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);
  const swiperElRef = useRef(null);

  useEffect(() => {
    const fetchSaleListing = async () => {
      const res = await fetch(`/api/listing/search?type=sale&limit=4`);
      const data = await res.json();
      setSaleListing(data);
    };
    const fetchRentListing = async () => {
      const res = await fetch(`/api/listing/search?type=rent&limit=4`);
      const data = await res.json();
      setRentListing(data);
      fetchSaleListing();
    };
    const fetchOfferListing = async () => {
      const res = await fetch(`/api/listing/search?offer=true&limit=4`);
      const data = await res.json();
      setOfferListing(data);
      fetchRentListing();
    };

    fetchOfferListing();
  }, []);

  return (
    <div>
      <div className='flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          SnakePliskin Estate is the best place to find your next perfect place
          to live.
          <br />
          We have a wind range of properties for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >{`Let's get started...`}</Link>
      </div>

      <div>
        {offerListing.length > 0 && (
          <swiper-container
            ref={swiperElRef}
            slides-per-view='1'
            navigation='true'
            pagination='true'
          >
            {offerListing.map((listing) => (
              <swiper-slide key={listing._id}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${listing.imageUrls[0]}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                />
              </swiper-slide>
            ))}
          </swiper-container>
        )}
      </div>

      <div className='max-w-7xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListing && offerListing.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>
                Recent offers
              </h2>
              <Link
                className='text-sm text-blue-800 hover:underline'
                to={`/search?offer=true`}
              >
                Show more offers
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListing.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        {rentListing && rentListing.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>
                Recent places for rent
              </h2>
              <Link
                className='text-sm text-blue-800 hover:underline'
                to={`/search?type=rent`}
              >
                Show more places for rent
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListing.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        {saleListing && saleListing.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>
                Recent places for sale
              </h2>
              <Link
                className='text-sm text-blue-800 hover:underline'
                to={`/search?type=sale`}
              >
                Show more places for sale
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListing.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
