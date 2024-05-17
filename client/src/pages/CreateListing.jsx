import React from 'react';

export default function CreateListing() {
  return (
    <main className='p-3 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Create Listing
      </h1>
      <form className='flex flex-col gap-4 sm:flex-row'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62'
            minLength='10'
            required
          />
          <textarea
            type='text'
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
          />
          <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg'
            id='name'
            required
          />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input type='checkbox' id='sale' className='w-5' />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='rend' className='w-5' />
              <span>Rend</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='parking' className='w-5' />
              <span>Parking Spot</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='furnished' className='w-5' />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='Offer' className='w-5' />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                className='p-3 border border-gray-300 rounded-lg'
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                required
              />
              <span>Beds</span>
            </div>
            <div className='flex items-center gap-2'>
              <input
                className='p-3 border border-gray-300 rounded-lg'
                type='number'
                id='baths'
                min='1'
                max='10'
                required
              />
              <span>Baths</span>
            </div>
            <div className='flex items-center gap-2'>
              <input
                className='p-3 border border-gray-300 rounded-lg'
                type='number'
                id='price'
                min='1'
                max='10'
                required
              />
              <div className='flex flex-col items-center'>
                <span>Regular Price</span>
                <span className='text-xs'>{`($ / Month)`}</span>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <input
                className='p-3 border border-gray-300 rounded-lg'
                type='number'
                id='discount'
                min='1'
                max='10'
                required
              />
              <div className='flex flex-col items-center'>
                <span>Discounted Price</span>
                <span className='text-xs'>{`($ / Month)`}</span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>
            Images:
            <span className='font-normal text-gray-600 ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className='flex gap-4'>
            <input
              className='p-3 border border-gray-300 rounded w-full'
              type='file'
              id='images'
              accept='imagest/*'
              multiple
            />
            <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>
              Upload
            </button>
          </div>
          <button className='bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-8-'>
            create listing
          </button>
        </div>
      </form>
    </main>
  );
}
