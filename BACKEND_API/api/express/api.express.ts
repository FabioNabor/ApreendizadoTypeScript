import { auth } from "../../middleware/auth";
import { checkPermission } from "../../middleware/permission";
import { Route } from "../../controllers/route";
import { Api } from "./api";
import express, { Express, Router } from "express";
import { logger } from "../../middleware/requestLogger";

export class ExpressApi implements Api {

    private app:Express;
    private route:Router;
    
    private constructor(routes:Route[]) {
        this.app = express();
        this.route = Router();
        this.app.use(express.json());
        this.addRoutes(routes)
        this.app.use("/api", this.route);
    }

    public static create(routes:Route[]) {
        return new ExpressApi(routes)
    }

    private addRoutes(routes: Route[]) {
        routes.forEach((route) => {
            const path = route.getPath();
            const method = route.getMethod();
            const handler = route.getHandler();
            const isauth = route.getAuth();
            const permission = route.getPermission();

            const middleware = [
                ...(isauth? [auth]:[]),
                ...(permission !== 0 ? [checkPermission(permission)]:[]),
                logger
            ];
            this.route[method](path, ...middleware, handler);
            // this.app.use("/api")[method](path, ...middleware, handler);
        });
    }

    public start(port: number) {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
            this.listRoutes();
        });
    }

    private listRoutes() {
        const routes = this.route.stack
            .filter((route: any) => route.route)
            .map((route: any) => {
                return {
                    path: route.route.path,
                    method: route.route.stack[0].method,
                };
            });

        console.log(routes);
    }
}