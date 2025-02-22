import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
{
 username: {
    type:String,
    required: true,
    unique: true,
    lowercase:true,
    trim:true,
    index:true
  },
  email: {
    type:String,
    required:true,
    unique:true,
    lowercase: true,
    trim: true,
  },
 fullname: {
    type: String,
    require: true,
    trim : true,
    index : true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  avtar:{
    type: String,
    required : true
  },
  coverImage:{
    type : String,
    required: true
  },
  watch_history:[{
    type : Schema.Types.ObjectId,
    ref: "Video",
  }],
  liked_videos:[{
    type : Schema.Types.ObjectId,
    ref :"video",
  }],
  subscription:{
    type: Schema.Types.ObjectId,
    ref:"Subscription"
  },
  subscribedTo: [{
    type: Schema.Types.ObjectId,
    ref: 'User'  // Reference to User model
}],
// Array of subscribers to the current user
subscribers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'  // Reference to User model
}],
},{timestamps: true})

userSchema.pre("save" , async function(next) {
  if(!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password , 10)
})

userSchema.method.isPasswordCorrect = async function(password) {
 return await bcrypt.compare(password , this.password)
}

userSchema.method.generateAccessToen = function(){
  return jwt.sign(
    {
      _id:this._id,
      email:this.email,
      username:this.username, 
      fullname : this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

userSchema.method.generateAccessToken = function(){
  return jwt.sign(
    {
      _id : this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}
export const User = mongoose.Schema('User', userSchema)