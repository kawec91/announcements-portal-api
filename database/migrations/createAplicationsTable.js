const createAplicationsTable = `
  CREATE TABLE IF NOT EXISTS aplications (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    aplication_status VARCHAR(255) NOT NULL,
    aplication_title VARCHAR(255) NOT NULL,
    created_by VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lastmodify_by VARCHAR(255) NOT NULL,
    lastmodify_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    testday_date VARCHAR(255),
    fdp BOOLEAN DEFAULT FALSE,
    bs BOOLEAN DEFAULT FALSE,
    student_id VARCHAR(255),
    file_path VARCHAR(255)
  );
`;

// export default createAplicationsTable;

module.exports = createAplicationsTable;
