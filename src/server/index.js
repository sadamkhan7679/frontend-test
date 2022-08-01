// @ts-ignore
import { createServer, Model } from "miragejs";
import { Response } from "miragejs";
import { User } from "../types";

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,
    models: {
      users: Model.extend<Partial<User>>({}),
      listItems: Model.extend<Partial<User>>({}),
    },
    seeds(server) {
      server.create("user", {
        username: "John Doe",
        password: "12345678",
      });
    },
    routes() {
      this.get("/api/users", (schema) => {
        // Get all users
        console.log("test", schema.users.all());

        return schema.users.all();
      });
    },
  });
  return server;
}
