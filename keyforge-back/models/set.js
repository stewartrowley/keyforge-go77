module.exports = (mongoose) => {
    const set = mongoose.model(
        'set',
        mongoose.Schema(
            {
                _id: String,
                name: String,
                houses: [mongoose.SchemaTypes.Mixed],
                image: String,
                code: String,
            },
            { timestamps: true }
        )
    );
    return set
};