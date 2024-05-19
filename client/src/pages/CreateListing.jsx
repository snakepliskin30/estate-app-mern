import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
  const [files, setFiles] = useState({});
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: 'rod',
    description: 'snake',
    address: 'safdsfsf',
    type: 'sale',
    bedroom: 1,
    bathroom: 2,
    regularPrice: 50,
    discountedPrice: 60,
    offer: true,
    parking: true,
    furnished: true,
  });
  const [fileUploadError, setFileUploadError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSubmitLoading, setFormSubmitLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '_' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (err) => {
          reject(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        },
      );
    });
  };

  const handleImageSubmit = () => {
    if (files.length > 0 && formData.imageUrls.length + files.length < 7) {
      const promises = [];

      setUploading(true);
      setFileUploadError('');

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setFileUploadError('');
          setUploading(false);
        })
        .catch(() => {
          setFileUploadError('Error uploading the images');
          setUploading(false);
        });
    } else {
      setFileUploadError(
        'Only 6 images are allowed to be uploaded per listing.',
      );
    }
  };

  const handleRemoveImage = (url) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((urlString) => urlString !== url),
    });
  };

  const handleChange = (e) => {
    switch (e.target.id) {
      case 'sale':
      case 'rent':
        setFormData({
          ...formData,
          type: e.target.checked ? e.target.id : '',
        });
        break;
      case 'parking':
      case 'furnished':
      case 'offer':
        setFormData({
          ...formData,
          [e.target.id]: e.target.checked,
        });
        break;
      default:
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.imageUrls.length === 0)
      return setFormError('Your listing must have at least 1 image.');
    if (+formData.regularPrice < +formData.discountedPrice)
      return setFormError(
        'Regular Price must be greater than the Discounted Price.',
      );
    try {
      setFormSubmitLoading(true);
      setFormError('');

      const res = await fetch('api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.message);
        setFormSubmitLoading(false);
      } else {
        setFormSubmitLoading(false);
        navigate(`/listing/${data._id}`);
      }
    } catch (err) {
      setFormError(err.message);
      setFormSubmitLoading(false);
    }
  };

  return (
    <main className='p-3 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Create Listing
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 sm:flex-row'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type='text'
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg'
            id='address'
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'sale'}
              />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking Spot</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                className='p-3 border border-gray-300 rounded-lg'
                type='number'
                id='bedroom'
                min='1'
                max='10'
                required
                onChange={handleChange}
                value={formData.bedroom}
              />
              <span>Beds</span>
            </div>
            <div className='flex items-center gap-2'>
              <input
                className='p-3 border border-gray-300 rounded-lg'
                type='number'
                id='bathroom'
                min='1'
                max='10'
                required
                onChange={handleChange}
                value={formData.bathroom}
              />
              <span>Baths</span>
            </div>
            <div className='flex items-center gap-2'>
              <input
                className='p-3 border border-gray-300 rounded-lg'
                type='number'
                id='regularPrice'
                min='1'
                max='1000000'
                required
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className='flex flex-col items-center'>
                <span>Regular Price</span>
                <span className='text-xs'>{`($ / Month)`}</span>
              </div>
            </div>
            {formData.offer && (
              <div className='flex items-center gap-2'>
                <input
                  className='p-3 border border-gray-300 rounded-lg'
                  type='number'
                  id='discountedPrice'
                  min='1'
                  max='2000'
                  required
                  onChange={handleChange}
                  value={formData.discountedPrice}
                />
                <div className='flex flex-col items-center'>
                  <span>Discounted Price</span>
                  <span className='text-xs'>{`($ / Month)`}</span>
                </div>
              </div>
            )}
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
              accept='image/*'
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              type='button'
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
              onClick={handleImageSubmit}
              disabled={uploading}
            >
              {uploading ? 'Uploading..' : 'Upload'}
            </button>
          </div>
          {fileUploadError && (
            <p className='text-red-700 text-sm'>{fileUploadError}</p>
          )}
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='image_listing'
                  className='w-20 h-20 object-cover rounded-lg'
                />
                <button
                  type='button'
                  onClick={handleRemoveImage.bind(null, url)}
                  className='p-3 text-red-700 rounded-lg hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={formSubmitLoading || uploading}
            className='bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-75'
          >
            {formSubmitLoading ? 'submitting...' : 'create listing'}
          </button>

          {formError ? (
            <p className='text-red-700 text-sm'>{formError}</p>
          ) : null}
        </div>
      </form>
    </main>
  );
}
