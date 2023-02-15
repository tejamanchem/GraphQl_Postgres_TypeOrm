import { dataBase } from "./database/database"
import express, { Express } from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { TaskResolver } from "./resolvers/task";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"

export const main = async () => {

    await dataBase()

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [TaskResolver],
            validate: false,
        }),
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });

    await apolloServer.start();

    const app: Express = express();
    apolloServer.applyMiddleware({ app });

    const PORT = process.env.PORT || 8000;

    app.get("/", (_req, res) => res.send("you have not screwed up!"));
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
};

main().catch((err) => console.error(err));