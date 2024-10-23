const downloadedSongs = ["song1", "song2", "song3", "song4"];

const getDownloadedSongs = (req, res) => {
  res.status(201).send({ downloadedSongs });
};
// generally the songs should be get from database, since i am not creating page for uploading songs
// into the database, for simplicity i am defining it in an array. The main purpose of this route is to just demonstrate
// the access of protected route for a JWT

export default getDownloadedSongs;
