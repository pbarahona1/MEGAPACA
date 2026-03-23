import Reviews from "../models/reviews.js";

const reviewsController = {};

// SELECT

reviewsController.getReviews = async (req, res) => {
    const reviews = await Reviews.find()
    res.json(reviews);
};

// INSERT

reviewsController.insertReviews = async (req, res) => {

    const { rating, comment, idEmployee, idProducts } = req.body;

    const newReview = new Reviews({
        rating,
        comment,
        idEmployee,
        idProducts
    });

    await newReview.save();

    res.json({ message: "Review saved" });

};

// DELETE

reviewsController.deleteReviews = async (req, res) => {

    await Reviews.findByIdAndDelete(req.params.id);

    res.json({ message: "Review deleted" });

};

// UPDATE

reviewsController.updateReviews = async (req, res) => {

    const { rating, comment, idEmployee, idProducts } = req.body;

    await Reviews.findByIdAndUpdate(req.params.id, {

        rating,
        comment,
        idEmployee,
        idProducts
    }, { new: true });

    res.json({ message: "Review updated" });

};

export default reviewsController;
