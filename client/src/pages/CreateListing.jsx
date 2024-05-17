import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';

export default function CreateListing() {
  const [files, setFiles] = useState({});
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [fileUploadError, setFileUploadError] = useState('');
  const [uploading, setUploading] = useState(false);

  console.log('formData', formData);

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
          <button className='bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-8-'>
            create listing
          </button>
        </div>
      </form>
    </main>
  );
}
