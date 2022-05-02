import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection();

  const id = uuidv4();
  const password = await hash("admin", 8);

  await connection.getRepository("users").save({
    id,
    name: "Admin",
    email: "admin@rentx.com",
    driver_license: "ABC123XYZ",
    password,
    isAdmin: true,
    created_at: new Date(),
  });

  await connection.close();
}

create().then(() => console.log("User admin created"));
