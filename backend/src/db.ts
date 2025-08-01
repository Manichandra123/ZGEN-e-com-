import mongoose from "mongoose";
 
const userShchema = new mongoose.Schema({
    username: {type: String , required: true , unique: true},
    email: {type: String , required: true , unique: true},
    password: {type: String , required: true , min:6 , max:20}
})
// models/Product.js
 

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  images: [
    {
      url: { type: String, required: true },
      alt: { type: String, default: '' }
    }
  ],
    

  stock: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const AdminSchema = new mongoose.Schema({
    adminName: {type: String , required: true , unique: true},
    email: {type: String , required: true , unique: true},
    password: {type: String , required: true , min:6 , max:20}
})
 export const adminmodel = mongoose.model("Admin", AdminSchema)
export const ProductModel = mongoose.model('Product', productSchema);
export const UserModel = mongoose.model("User", userShchema);
