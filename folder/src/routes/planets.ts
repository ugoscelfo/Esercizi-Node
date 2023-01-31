import express, { Router } from "express";
import prisma from "../lib/prisma/client";
import {
    PlanetData,
    planetSchema,
    validate,
} from "../lib/middleware/validation";
import { initMulterMiddleware } from "../lib/middleware/multer";
import { checkAuthorization } from "../lib/middleware/passport";

const upload = initMulterMiddleware();

const router = Router();

router.get("/", async (request, response) => {
    const planets = await prisma.planet.findMany();
    response.json(planets);
});

router.post(
    "/",
    checkAuthorization,
    validate({ body: planetSchema }),
    async (request, response) => {
        const planetData: PlanetData = request.body;
        const username = request.user?.username as string;

        const planet = await prisma.planet.create({
            data: {
                ...planetData,
            },
        });
        response.status(201).json(planet);
    }
);

router.put(
    "/id:(\\d+)",
    checkAuthorization,
    validate({ body: planetSchema }),
    async (request, response, next) => {
        const planetId = Number(request.params.id);
        const planetData: PlanetData = request.body;
        const username = request.user?.username as string;
        try {
            const planet = await prisma.planet.update({
                where: { id: planetId },
                data: {
                    ...planetData
                },
            });
            response.status(200).json(planet);
        } catch (error) {
            response.status(404);
            next(`cannot PUT /planets/${planetId}`);
        }
    }
);

router.delete(
    "/id:(\\d+)",
    checkAuthorization,
    async (request, response, next) => {
        const planetId = Number(request.params.id);
        try {
            await prisma.planet.delete({
                where: { id: planetId },
            });
            response.status(200).end();
        } catch (error) {
            response.status(404);
            next(`cannot DELETE /planets/${planetId}`);
        }
    }
);

router.post(
    "/:id(\\d+)/photo",
    checkAuthorization,
    upload.single("photo"),
    async (request, response, next) => {
        console.log("request.file", request.file);

        if (!request.file) {
            response.status(400);
            return next("No photo file uploaded");
        }
        const photoFileName = request.file.filename;

        response.status(201).json({ photoFileName });
    }
);

export default router;