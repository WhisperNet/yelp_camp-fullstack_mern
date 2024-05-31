const Campground = require('../models/campground')
const { cloudinary } = require('../cloudinary')

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
}

module.exports.newForm = (req, res) => {
    res.render('campgrounds/new')
}

module.exports.createNew = async (req, res) => {
    const campground = new Campground(req.body.campground)
    campground.imgs = req.files.map(f => ({ url: f.path, filename: f.filename }))
    campground.author = req.user._id
    await campground.save()
    req.flash('success', 'Successfully created new campground')
    res.redirect(`/campgrounds/${campground.id}`)
}

module.exports.show = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    })
        .populate('author')
    res.render('campgrounds/show', { campground })
}

module.exports.editForm = async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', { campground })
}

module.exports.update = async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }))
    campground.imgs.push(...imgs)
    // console.log(req.body)
    await campground.save()
    if (req.body.deleteImgs) {
        for (let filename of req.body.deleteImgs) {
            await cloudinary.uploader.destroy(filename)
        }
        await campground.updateOne({ $pull: { imgs: { filename: { $in: req.body.deleteImgs } } } })
    }
    req.flash('success', 'Successfully edited campground')
    res.redirect(`/campgrounds/${campground.id}`)
}

module.exports.delete = async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted campground')
    res.redirect(`/campgrounds`)
}