import { createServer, Model } from "miragejs";

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,
    models: {
      users: Model,
      listItems: Model,
    },
    seeds(server) {
      server.create("user", {
        username: "test",
        password: "test",
      });
      server.create("listItem", {
        title: "test",
        description: "test",
        picture:
          "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
      });
    },
    routes() {
      this.get("/api/users", (schema) => {
        return schema.users.all();
      });
      this.post("/api/login", (schema, request) => {
        const { username, password } = JSON.parse(request.requestBody);
        const user = schema.users.findBy({ username });

        if (!user) {
          return {
            status: 401,
            body: {
              error: "Invalid username or password",
            },
          };
        }

        if (user && user.password === password) {
          return {
            status: 200,
            body: {
              user,
              token: "token",
            },
          };
        }
      });

      this.post("/api/register", (schema, request) => {
        const { username, password } = JSON.parse(request.requestBody);
        return schema.users.create({
          username,
          password,
        });
      });

      this.get("/api/list-items", (schema) => {
        return schema.listItems.all();
      });
      this.post("/api/list-items", (schema, request) => {
        const { title, description, picture } = JSON.parse(request.requestBody);
        return schema.listItems.create({
          title,
          description,
          picture,
        });
      });
    },
  });
  return server;
}
