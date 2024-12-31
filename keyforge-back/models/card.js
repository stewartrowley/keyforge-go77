module.exports = (mongoose) => {
    const card = mongoose.model(
        'card',
        mongoose.Schema(
            {
                _id: String,
                card_title: String,
                card_title_en: String,
                card_type: String,
                front_image: String,
                card_text: String,
                traits: String,
                amber: Number,
                power: String,
                armor: Number,
                rarity: String,
                house_variant: String,
                flavor_text: String,
                card_number: String,
                expansion: Number,
                is_maverick: Boolean,
                is_anomaly: Boolean,
                is_enhanced: Boolean,
                is_non_deck: Boolean
            },
            { timestamps: true }
        )
    );
    return card
};