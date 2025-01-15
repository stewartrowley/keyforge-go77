module.exports = (mongoose) => {
    const event = mongoose.model(
        'event',
        mongoose.Schema(
            {
                _id: String,
                deck_id: String,
                event_name: String,
                away_id: String,
                away_team: String,
                away_location: String,
                away_result: String,
                home_id: String,
                home_team: String,
                home_location: String,
                home_result: String,

            },
            { timestamps: true }
        )
    );
    return event
}