const favArtists = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  { $addFields: { num_favs: { $cond: [
    { $isArray: ["$cast"] },
    { $size: { $setIntersection: ["$cast", favArtists] } },
    0] } } },
  { $match: { $and: [
    { countries: "USA" },
    { "tomatoes.viewer.rating": { $gte: 3 } },
  ] } },
  { $sort: {
    num_favs: -1,
    "tomatoes.viewer.rating": -1,
    title: -1,
  } },
  { $project: {
    _id: false,
    title: true,
  } },
  { $skip: 24 },
  { $limit: 1 },
]);
