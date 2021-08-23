db.movies.aggregate([
  { $project: {
    title_split: { $split: ["$title", " "] },
    _id: false,
  } },
  { $match: { title_split: { $size: 1 } } },
  { $sort: { title_split: 1 } },
]);
