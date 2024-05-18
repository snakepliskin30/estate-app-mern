import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error-handler.js';

export const createListing = async (req, res, next) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const listing = await Listing.create(req.body);

    return res.status(201).json(listing);
  } catch (err) {
    next(err);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(404, 'This listing is not found'));

    if (req.user.id !== listing.userRef)
      return next(errorHandler(401, 'You can only delete your listing'));

    const deletedListing = await Listing.findByIdAndDelete(listing._id);
    res.status(200).json('Delete successful');
  } catch (err) {
    next(err);
  }
};
