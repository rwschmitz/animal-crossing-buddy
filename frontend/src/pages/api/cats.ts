// import mongodb from 'mongodb';

export default (_: any, res: any): void => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ name: 'blah' }));
  // const { MongoClient } = mongodb;
  // const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@${process.env.DB_PATH}`;
  // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  // client.connect((err): void => {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }

  //   const collection = client.db('animals').collection('cats');
  //   collection
  //     .find({})
  //     .toArray()
  //     .then((items) => {
  //       res.status(200).json(items);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // });
};
