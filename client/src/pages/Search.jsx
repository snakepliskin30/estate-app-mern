import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const [searchFormData, setSearchFormData] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'createdAt',
    order: 'desc',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSearchFormData((prev) => {
        return { ...prev, searchTerm: e.target.value };
      });
    }

    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSearchFormData((prev) => {
        return { ...prev, type: e.target.checked ? e.target.id : 'all' };
      });
    }

    if (
      e.target.id === 'offer' ||
      e.target.id === 'parking' ||
      e.target.id === 'furnished'
    ) {
      setSearchFormData((prev) => {
        return { ...prev, [e.target.id]: e.target.checked };
      });
    }

    if (e.target.id === 'sort_order') {
      console.log(e.target.value);
      const [sort, order] = e.target.value.split('_');
      setSearchFormData((prev) => {
        return { ...prev, sort, order };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlSearchParams = new URLSearchParams(location.search);
    urlSearchParams.set('searchTerm', searchFormData.searchTerm);
    urlSearchParams.set('type', searchFormData.type);
    urlSearchParams.set('parking', searchFormData.parking ? 'true' : 'false');
    urlSearchParams.set(
      'furnished',
      searchFormData.furnished ? 'true' : 'false',
    );
    urlSearchParams.set('offer', searchFormData.offer ? 'true' : 'false');
    urlSearchParams.set('sort', searchFormData.sort);
    urlSearchParams.set('order', searchFormData.order);

    const newUrlSearchParams = urlSearchParams.toString();
    navigate(`/search?${newUrlSearchParams}`);
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const url_searchTerm = urlSearchParams.get('searchTerm');
    const url_type = urlSearchParams.get('type');
    const url_parking =
      urlSearchParams.get('parking') === 'true' ? true : false;
    const url_furnished =
      urlSearchParams.get('furnished') === 'true' ? true : false;
    const url_offer = urlSearchParams.get('offer') === 'true' ? true : false;
    const url_sort = urlSearchParams.get('sort');
    const url_order = urlSearchParams.get('order');

    setSearchFormData((prev) => {
      return {
        ...prev,
        searchTerm: url_searchTerm,
        type: url_type,
        parking: url_parking,
        furnished: url_furnished,
        offer: url_offer,
        sort: url_sort,
        order: url_order,
      };
    });
  }, [location.search]);

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:{' '}
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full'
              value={searchFormData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center '>
            <label className='font-semibold'>Type:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='all'
                className='w-5'
                onChange={handleChange}
                checked={searchFormData.type === 'all'}
              />
              <span>Rent & Sale</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                onChange={handleChange}
                checked={searchFormData.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                onChange={handleChange}
                checked={searchFormData.type === 'sale'}
              />
              <span>Sale</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                onChange={handleChange}
                checked={searchFormData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Ameneties:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={searchFormData.parking}
              />
              <span>Parking</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={searchFormData.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select
              id='sort_order'
              className='border rounded-lg p-3'
              value={`${searchFormData.sort}_${searchFormData.order}`}
              onChange={handleChange}
            >
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to high</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
      </div>
      <div className=''>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          Listing results:
        </h1>
      </div>
    </div>
  );
}
