db.movies.aggregate([
  { $match: { languages: "English" } },
  { $unwind: {
    path: "$cast",
    preserveNullAndEmptyArrays: false,
  } },
  { $group: {
    _id: "$cast",
    numeroFilmes: { $sum: 1 },
    mediaIMDB: { $avg: "$imdb.rating" },
  } },
  { $project: {
    _id: true,
    numeroFilmes: true,
    mediaIMDB: { $round: ["$mediaIMDB", 1] },
  } },
  { $sort: {
    numeroFilmes: -1,
    _id: -1,
  } },
]);
