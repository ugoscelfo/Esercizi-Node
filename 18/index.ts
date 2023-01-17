import express from "express"
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();
const app = express();
app.use(express.json())

// get all
app.get("/planets", async (request, response) => {
  const planets = await prisma.planet.findMany();
  response.json(planets);
});

// get one
app.get("/planets/:id", async (request, response) => {
  const planetId = Number(request.params.id)
  const planet = await prisma.planet.findUnique({
    where: {id: planetId}
  });
  response.json(planet);
});

// create
app.post("/planets", async (request, response) => {
  const {name, diameter, moons} = request.body
  const planets = await prisma.planet.create({
    data: {
      name: name,
      diameter: diameter,
      moons: moons
    }
  })
  response.json(planets)
})

// update
app.put("/planets/:id", async (request, response) => {
  const {name, diameter, moons} = request.body
  const planet = await prisma.planet.update({
    where: {id: Number(request.params.id)},
    data: {
      name: name,
      diameter: diameter,
      moons: moons
    }
  });

  response.json(planet);
});

// delete
app.delete("/planets/:id", async (request, response) => {
  const planet = await prisma.planet.delete({
    where: {id: Number(request.params.id)}
  });
  response.json(planet);
});

app.listen(3000, () => {
	console.log("running on port", 3000)
})