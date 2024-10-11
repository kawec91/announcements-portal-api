const createAnnouncementsTable = `
  CREATE TABLE IF NOT EXISTS announcements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    salary VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    created_by VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lastmodify_by VARCHAR(255) NOT NULL,
    lastmodify_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

export default createAnnouncementsTable;
