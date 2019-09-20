const { Client } = require('pg');
const uuid = require('uuid');

const client = new Client('postgres://localhost/acme_posts_comments_db');
client.connect();

const generateIds = (...posts)=> {
  return posts.reduce((acc, post)=> {
    acc[post] = uuid.v4();
    return acc;
  }, {});
};

const ids = generateIds('node', 'express', 'react', 'fun', 'ok', 'what', 'love');

const SQL = `
  DROP TABLE IF EXISTS tags;
  DROP TABLE IF EXISTS posts;


  CREATE TABLE posts(
    id UUID PRIMARY KEY,
    topic VARCHAR(255)
  );
  CREATE TABLE tags(
    id UUID PRIMARY KEY,
    text TEXT,
    post_id UUID references posts(id)
  );
  INSERT INTO posts(id, topic) values('${ids.node}', 'Node');
  INSERT INTO posts(id, topic) values('${ids.express}', 'Express');
  INSERT INTO posts(id, topic) values('${ids.react}', 'React');
  INSERT INTO tags(id, text, post_id) values('${ids.fun}', 'Fun!', '${ids.node}');
  INSERT INTO tags(id, text, post_id) values('${ids.ok}', 'Ok!', '${ids.express}');
  INSERT INTO tags(id, text, post_id) values('${ids.what}', 'What?!', '${ids.react}');
  INSERT INTO tags(id, text, post_id) values('${ids.love}', 'Love it!', '${ids.react}');
`

const syncAndSeed = ()=> client.query(SQL);

const findAllPosts = ()=> {
  return client.query('SELECT * FROM posts')
    .then( response => response.rows );
};

const findAllTags = ()=> {
  return client.query('SELECT * FROM tags')
    .then( response => response.rows );
};


module.exports = {
  syncAndSeed,
  findAllPosts,
  findAllTags
};

