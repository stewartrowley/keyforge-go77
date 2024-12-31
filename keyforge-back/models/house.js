module.exports = (mongoose) => {
    const house = mongoose.model(
        'house',
        mongoose.Schema(
            {
                _id: String,
                name: String,
                image: String,
                in_filters: Boolean,
                color: String,
                banner_image: String,
            },
            { timestamps: true }
        )
    );
    return house
};