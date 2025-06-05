import mongoose from 'mongoose';

const formatISTTimestamp = (date) => {
  return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata'
  }).format(date).replace(',', '');
};


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registerNumber: { type: String, required: true},
  department: { type: String, required: true},
  courseType: { type: String, required: true},
  programme: { type: String, required: true},
  branch: { type: String, required: true},
  createdAt: { type: Date, default: Date.now },
  createdAtFormatted: { type: String, default: formatISTTimestamp(new Date()) },
  failedLoginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date, default: null },
  lockUntilFormatted: { type: String, default: null },
});


const User = mongoose.model('User', userSchema);
export default User;
