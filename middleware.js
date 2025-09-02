const Listing = require("./Models/listing.js")
const Review = require("./Models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema,reviewSchema} = require("./schema.js");

module.exports.isLoggedIn=((req,res,next)=>{
    //console.log(req.path,"..",req.originalUrl)
    if(!req.isAuthenticated()){
        //redirectUrl save
        req.session.redirectUrl=req.originalUrl
        req.flash("error","you must be logged in  first to create listing!")
        return res.redirect("/login")
     }
     next()
}) 

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next() 
}

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  // Ensure listing exists
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  // Check if current user is the owner (listing.owner is ObjectId)
  if (!listing.owner.equals(req.user._id)) {
    req.flash("error", "You are not the owner of this listing.");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
    } else {
      next();
    }
};

module.exports.validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body)

    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400,errMsg)
    }else{
        next();
    }
}
module.exports.isReviewAuthor=async(req,res,next)=>{
   let {id,reviewId} =req.params
   let review=await Review.findById(reviewId)
    if(!review.author.equals(res.locals.currUser._id)){
      req.flash("error","you are not the create this review")
      return res.redirect(`/listings/${id}`)
    }
    next()
}