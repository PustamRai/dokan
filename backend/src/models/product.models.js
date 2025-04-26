import mongoose, { Schema } from "mongoose";
import slugify from "slugify"

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    sizes: {
      type: Array,
      required: true,
    },
    bestseller: {
      type: Boolean,
    },
    date: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-create slug before saving
productSchema.pre('save', function (next) {
  if (this.isModified('name')) { // only if name changed
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});


export const ProductModel = mongoose.model("Product", productSchema);
