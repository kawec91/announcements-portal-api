// import db from "../db.js";
// import createUserTable from "../migrations/createUserTable.js";
// import createAnnouncementsTable from "./createAnnouncementsTable.js";
// import createAplicationsTable from "./createAplicationsRoutes.js";
// import createFormularsTable from "./createFormularsTable.js";

// const runDbMigrations = async () => {
//   console.log("Start migration");

//   const client = await db.connect();

//   try {
//     // Begin the migration
//     await client.query("BEGIN");

//     // Create the user table
//     await client.query(createUserTable);

//     //Create announcements table
//     await client.query(createAnnouncementsTable);

//     //Create aplications table
//     await client.query(createAplicationsTable);

//     //Create formulars table
//     await client.query(createFormularsTable);

//     // Commit the changes
//     await client.query("COMMIT");

//     // Inform the user that the migration is complete
//     console.log("End of migration");
//   } catch (error) {
//     // Rollback the changes in case of an error
//     await client.query("ROLLBACK");

//     // Capture the stack trace of the error
//     Error.captureStackTrace(error);
//     console.error(error.stack);

//     // Log migration failure
//     console.log("Migration failed");

//     // Rethrow the error to stop the execution
//     throw error;
//   } finally {
//     // Release the database client
//     client.release();
//   }
// };

// export default runDbMigrations;

const db = require("../db.js");
const createUserTable = require("../migrations/createUserTable.js");
const createAnnouncementsTable = require("./createAnnouncementsTable.js");
const createAplicationsTable = require("./createAplicationsTable.js");
const createFormularsTable = require("./createFormularsTable.js");

const runDbMigrations = async () => {
  console.log("Start migration");

  const client = await db.connect();

  try {
    await client.query("BEGIN");

    await client.query(createUserTable);
    await client.query(createAnnouncementsTable);
    await client.query(createAplicationsTable);
    await client.query(createFormularsTable);

    await client.query("COMMIT");
    console.log("End of migration");
  } catch (error) {
    await client.query("ROLLBACK");
    Error.captureStackTrace(error);
    console.error(error.stack);
    console.log("Migration failed");
    throw error;
  } finally {
    client.release();
  }
};

module.exports = runDbMigrations; // Use CommonJS export
