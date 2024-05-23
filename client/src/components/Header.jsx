import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlSearchParams = new URLSearchParams(location.search);
    urlSearchParams.set('searchTerm', searchTerm);
    const newSearchParams = urlSearchParams.toString();
    navigate(`/search?${newSearchParams}`);
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlSearchParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.href]);

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto py-3 sm:py-0.5 px-3 font-semibold'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex items-center flex-nowrap'>
            <img
              src='/logo.png'
              alt=''
              className='hidden sm:inline-block sm:h-20 sm:w-20'
            />
            <span className='text-slate-500'>Rod</span>
            <span className='text-slate-700'>Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className='bg-slate-100 p-3 rounded-lg flex items-center'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        <ul className='flex gap-4'>
          <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>
            <Link to='/'>Home</Link>
          </li>
          <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer animate-pulse'>
            <Link to='/about'>About</Link>
          </li>
          <li className='text-slate-700 hover:underline cursor-pointer'>
            {currentUser ? (
              <Link to='/profile'>
                <img
                  className='h-7 w-7 rounded-full object-cover'
                  src={currentUser.avatar}
                  alt='profile_picture'
                />
              </Link>
            ) : (
              <Link to='/sign-in'>Sign In</Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
