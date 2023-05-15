import Tour from "../models/Tour.js";
import Review from "../models/Review.js";

export const createReview = async(req, res) => {
    
    const tourId = req.params.tourId;
    const newReview = new Review({...req.body});

    try {

        const saveReview = await newReview.save();

        //after creating a new review now updatethe reviews array of the tour
        await Tour.findByIdAndUpdate(tourId, {
            $push: {reviews: saveReview._id}
        })

        res.status(200).json({success: true, message: "Review submitted", data: saveReview });
        
    } catch (err) {
        res.status(500).json({success: false, message: "failed to submit" });
    }
}