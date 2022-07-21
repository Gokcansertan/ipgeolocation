export const sequelizeConf = {
  host: process.env.SEQUELIZE_HOST,
  port: +process.env.SEQUELIZE_PORT,
  username: process.env.SEQUELIZE_USER,
  password: process.env.SEQUELIZE_PASS,
  database: process.env.SEQUELIZE_DATABASE,
};
