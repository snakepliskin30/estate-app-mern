import { useRef } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const MotionLink = motion(Link);

/* eslint-disable react/prop-types */
export default function ListingCard({ listing }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '1.5 1'],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <MotionLink
      to={`/listing/${listing._id}`}
      ref={ref}
      // href={`/listing/${listing._id}`}
      style={{
        // @ts-ignore
        scale: scaleProgress,
        // @ts-ignore
        opacity: opacityProgress,
      }}
    >
      <div className='group flex flex-col shadow-md hover:shadow-lg transition-shadow border rounded-lg w-full sm:w-[300px] overflow-hidden'>
        <div
          style={{
            background: `url(${listing.imageUrls[0]}) center no-repeat`,
            backgroundSize: 'cover',
          }}
          className='h-[320px] sm:h-[220px] w-full group-hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-3'>
          <p className='text-center text-lg font-semibold text-slate-700 truncate'>
            {listing.name}
          </p>
          <div className='flex items-center gap-2 text-sm'>
            <FaMapMarkerAlt className='text-green-700 h-4 w-4' />
            <p className='truncate text-gray-700'>{listing.address}</p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>
          <p className='text-slate-500 font-semibold'>{`$${
            listing.offer
              ? listing.discountedPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')
          }${listing.type === 'rent' ? ' / month' : ''}`}</p>
          <div className='flex gap-4 text-xs font-bold text-slate-700'>
            <p>
              {listing.bedroom} {listing.bedroom > 1 ? 'beds' : 'bed'}
            </p>
            <p>
              {listing.bathroom} {listing.bathroom > 1 ? 'baths' : 'bath'}
            </p>
          </div>
        </div>
      </div>
    </MotionLink>
  );
}
