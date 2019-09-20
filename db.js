const Sequelize = require('sequelize');
const { TEXT, STRING, UUID, UUIDV4 } = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_posts_comments_db');

const uuidDefinition = {
  type: UUID,
  primaryKey: true,
  defaultValue: UUIDV4
}

const Post = conn.define('post', {
  id: uuidDefinition,
  topic: {
    type: STRING,
    allowNull: false
  }
});

const Tag = conn.define('tag', {
  id: uuidDefinition,
  text: {
    type: TEXT,
    allowNull: false
  }
});

