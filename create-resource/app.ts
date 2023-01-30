import express from "express"
import {PrismaClient} from "@prisma/client";
import {
  validate,
  validationErrorMiddleware,
  planetSchema,
  PlanetData,
} from './lib/validation'

const prisma = new PrismaClient();
const app = express();
app.use(express.json())

// get all
app.get("/planets", async (request, response) => {
  const planets = await prisma.planet.findMany();
  response.json(planets);
});

// create
app.post("/planets", 
validate({body: planetSchema}), 
async (request, response) => {
  const planet: PlanetData = request.body;
  
  response.json(planet)
})

app.use(validationErrorMiddleware);

app.listen(3000, () => {
	console.log("running on port", 3000)
})