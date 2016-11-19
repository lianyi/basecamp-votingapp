'use strict';

import mongoose from 'mongoose';

var PollSchema = new mongoose.Schema({
  owner: String,
  title: String,
  results: {},
  votedBy: Array
});

export default mongoose.model('Poll', PollSchema);
