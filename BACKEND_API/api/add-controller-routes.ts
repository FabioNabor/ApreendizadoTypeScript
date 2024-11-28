import { BaseControllerService, Route} from "../controllers/route";

export const routes:Route[] = []

export const addRoute = (tarquet:Route) => {
    routes.push(tarquet)
}