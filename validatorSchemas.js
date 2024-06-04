const Joi = require('joi')

const htmlSanitizer = require('sanitize-html')



const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    message: {
        'string.escapeHTML': '{{#label}} must not include HTML'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = htmlSanitizer(value, {
                    allowedTags: [],
                    allowedAtributes: {},
                })
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean
            }
        }
    }
})



module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        // img: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required()

    }).required(),
    deleteImgs: Joi.array()
})

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        body: Joi.string().required(),
        rating: Joi.number().required().min(0).max(5)
    }).required()
})
