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

export const updateListing = async (req, res, next) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) return next(errorHandler(404, 'Listing not found'));
    if (req.user.id !== listing.userRef)
      return next(errorHandler(401, 'You can only update your own listing'));

    const {
      imageUrls,
      name,
      description,
      address,
      type,
      bedroom,
      bathroom,
      regularPrice,
      discountedPrice,
      offer,
      parking,
      furnished,
    } = req.body;

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          imageUrls,
          name,
          description,
          address,
          type,
          bedroom,
          bathroom,
          regularPrice,
          discountedPrice,
          offer,
          parking,
          furnished,
        },
      },
      { new: true },
    );

    res.status(201).json(updatedListing);
  } catch (err) {
    next(err);
  }
};

export const getListing = async (req, res, next) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) return next(errorHandler(401, 'Listing not found'));

    res.status(200).json(listing);
  } catch (err) {
    next(err);
  }
};

export const searchListing = async (req, res, next) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    // Ganito sya gagana, halimbawa may 19 records
    // since ang limit ay 9 at startIndex ay 0, ang
    // babalik nya ay records 0-9. Pag ang startIndex ay 1
    // ang ibabalik nya ay 10-18. So yung startIndex ay parang
    // multiplier or page number, hindi sya yung index ng records
    // mismo. So dito kokontrolin ang pagination.
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;
    if (offer === undefined || offer === 'false') {
      offer = { $in: [true, false] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === 'false') {
      parking = { $in: [true, false] };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [true, false] };
    }

    let type = req.query.type;
    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || '';
    const name = { $regex: searchTerm, $options: 'i' };

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const listings = await Listing.find({
      name,
      offer,
      parking,
      furnished,
      type,
    })
      .sort({
        [sort]: order,
      })
      .limit(limit)
      .skip(startIndex);

    res.status(200).json(listings);
  } catch (err) {
    next(err);
  }
};
