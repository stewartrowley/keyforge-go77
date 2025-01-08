module.exports = (mongoose) => {
    const deck = mongoose.model(
        'deck',
        mongoose.Schema(
            {
                _id: String,
                name: String,
                link: String,
                flavor_text: String,
                expansion: Number,
                is_deck_owned: Boolean,
                is_my_deck: Boolean,
                is_my_favorite: Boolean,
                is_on_my_watchlist: Boolean,
                is_pending_transfer: Boolean,
                wins: Number,
                loses: Number,
                boxNumber: Number,
                group: String,
                bonus_icons: [mongoose.SchemaTypes.Mixed],
                set_era_cards: [mongoose.SchemaTypes.Mixed],
                cards: [mongoose.SchemaTypes.Mixed],
                houses: [mongoose.SchemaTypes.Mixed],
            },
            { timestamps: true }
        )
    );
    return deck
};