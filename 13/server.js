import express from "express";
import "express-async-errors";

const app = express()

app.get("/", (request, response) => {
  response.send("running!");
})

const port = 3000;

app.listen(port, () => {
  console.log(`[server]: isrunning at htp://localhost:${port}`)
});