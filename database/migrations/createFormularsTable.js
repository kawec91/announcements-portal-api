const createFormularsTable = `
  CREATE TABLE IF NOT EXISTS formulars (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    file_url VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_by VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lastmodify_by VARCHAR(255) NOT NULL,
    lastmodify_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

export default createFormularsTable;
