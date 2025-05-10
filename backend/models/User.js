import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    userId: { 
      type: String, 
      unique: true, 
      required: true, 
      default: () => `user-${Date.now()}`, 
    },
    username: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true, 
      minlength: [3, 'Username must be at least 3 characters'], 
      maxlength: [20, 'Username must be under 20 characters']
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true, 
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    password: { 
      type: String, 
      required: true, 
      minlength: [6, 'Password must be at least 6 characters'] 
    },
    avatar: { 
      type: String, 
      default: '' 
    },
    channels: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Channel' 
    }],
    role: { 
      type: String, 
      enum: ['user', 'admin', 'moderator'], 
      default: 'user' 
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.matchPassword = function(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
