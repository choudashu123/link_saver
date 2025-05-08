import mongoose from 'mongoose';

const BookmarkSchema = new mongoose.Schema({
  url: String,
  title: String,
  favicon: String,
  summary: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

export default mongoose.models.Bookmark || mongoose.model("Bookmark", BookmarkSchema);
