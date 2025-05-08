import mongoose from 'mongoose';

const BookmarkSchema = new mongoose.Schema({
  url: String,
  title: String,
  favicon: String,
  summary: String,
  userId: mongoose.Types.ObjectId,
});

export default mongoose.models.Bookmark || mongoose.model("Bookmark", BookmarkSchema);
