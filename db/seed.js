// inside db/seed.js

// grab our client with destructuring from the export in index.js
const { client, getAllUsers } = require('./index');

async function testDB() {
  try {
    // connect the client to the database, finally
    client.connect();

    const users = await getAllUsers();
    console.log(users);
    // queries are promises, so we can await them
    // const result = await client.query(`SELECT * FROM users;`);
    // console.log(result);

    // const { rows } = await client.query(`SELECT * FROM users;`);
    // console.log(rows);

    // for now, logging is a fine way to see what's up
  } catch (error) {
    console.error(error);
  } finally {
    // it's important to close out the client connection
    client.end();
  }
}

testDB();

// this function should call a query which drops all tables from our database
async function dropTables() {
    try {
      await client.query(`
  
      `);
    } catch (error) {
      throw error; // we pass the error up to the function that calls dropTables
    }
  }
  
  // this function should call a query which creates all tables for our database 
  async function createTables() {
    try {
      await client.query(`
  
      `);
    } catch (error) {
      throw error; // we pass the error up to the function that calls createTables
    }
  }
  
  async function rebuildDB() {
    try {
      client.connect();
  
      await dropTables();
      await createTables();
    } catch (error) {
      console.error(error);
    } finally {
      client.end();
    }
  }
  
  rebuildDB();