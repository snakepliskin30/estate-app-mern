import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateStart,
  updateSuccess,
  updateFailure,
  userDeleteStart,
  userDeleteSuccess,
  userDeleteFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from '../redux/user/userSlice';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { currentUser, isLoading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({});
  const [filePercent, setFilePercent] = useState('');
  const [fileUploadError, setFileUploadError] = useState(false);
  const [updateSuccessful, setUpdateSuccessful] = useState(false);
  const dispatch = useDispatch();

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        const progressRounded = Math.round(progress);
        setFilePercent(progressRounded);
      },
      (err) => {
        console.log(err.message);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL }),
        );
      },
    );
  };

  const handleChangeData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateStart());

    try {
      const res = await fetch(`/api/user/userupdate/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
      } else {
        setUpdateSuccessful(true);
        dispatch(updateSuccess(data));
      }
    } catch (err) {
      dispatch(updateFailure(err.message));
    }
  };

  const handleDelete = async () => {
    dispatch(userDeleteStart());

    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(userDeleteFailure(data.message));
      } else {
        dispatch(userDeleteSuccess());
      }
    } catch (err) {
      dispatch(userDeleteFailure(err.message));
    }
  };

  const handleSignOut = async () => {
    dispatch(signOutStart());

    try {
      const res = await fetch('api/auth/signout', {
        method: 'GET',
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(signOutFailure(data.message));
      } else {
        dispatch(signOutSuccess());
      }
    } catch (err) {
      dispatch(signOutFailure(err.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={formData.avatar || currentUser.avatar}
          alt=''
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center'
          onClick={() => fileRef.current.click()}
        />
        {filePercent > 0 && filePercent < 100 ? (
          <p className='text-slate-700 self-center'>{`Upload progress ${filePercent}%`}</p>
        ) : filePercent === 100 ? (
          <p className='text-green-700 self-center'>Upload complete</p>
        ) : null}
        {fileUploadError ? (
          <p className='text-red-700 self-center'>Error uploading file</p>
        ) : null}
        <input
          type='text'
          defaultValue={currentUser.username}
          placeholder='username'
          id='username'
          className='border p-3 rounded-lg'
          onChange={handleChangeData}
        />
        <input
          type='email'
          defaultValue={currentUser.email}
          placeholder='email'
          id='email'
          className='border p-3 rounded-lg'
          onChange={handleChangeData}
        />
        <input
          type='text'
          placeholder='password'
          id='password'
          className='border p-3 rounded-lg'
          onChange={handleChangeData}
        />
        <button
          disabled={isLoading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {isLoading ? 'updating info' : 'update'}
        </button>
        <Link
          className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'
          to='/create-listing'
        >
          create listing
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDelete} className='text-red-700 cursor-pointer'>
          Delete account
        </span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>
      {error ? <p className='text-red-700'>{error}</p> : null}
      {!error && updateSuccessful ? (
        <p className='text-green-700'>Update successful!</p>
      ) : null}
    </div>
  );
}
