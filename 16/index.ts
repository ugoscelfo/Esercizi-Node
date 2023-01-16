import express from "express"
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();

const app = express();

app.get("/planets", async (request, response) => {
  const planets = await prisma.planet.findMany();

  response.json(planets);
});

app.listen(3000, () => {
	console.log("running on port", 3000)
})