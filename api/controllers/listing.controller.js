import Listing from '../models/listing.model.js';

export const createListing = async (req, res, next) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const listing = await Listing.create(req.body);

    return res.status(201).json(listing);
  } catch (err) {
    next(err);
  }
};
