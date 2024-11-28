import { BaseControllerService, HttpMethod, Route, RouteConstructor } from "../route";
import { UseCase } from "../../usecase/UseCase";
import { ListDemandUseCase } from "../../usecase/demand/list-demand/ListDemandUseCase";
import { Request, Response } from "express";

export class ListDemandController 
    extends BaseControllerService {
    private constructor (
        protected readonly data:RouteConstructor
    ){
        super(data)
    }

    public static create(service:ListDemandUseCase) {
        return new ListDemandController({
            path:"/list-demand",
            method:HttpMethod.GET,
            service:service,
            auth:true
        })
    }

    public getHandler() {
        return async (request: Request, response: Response) : Promise<void> => {
            try {
                const { infUser } = request.body;
                if (!infUser || !infUser.id) {
                    response.status(400).json({
                        status: 400,
                        message: "Dados inválidos.",
                    });
                    return;
                }
        
                const { id } = infUser;
                const demands = await this.data.service.execute(id);
        
                response.status(200).json({
                    status: 200,
                    data: { demands },
                });
            } catch (err) {
                console.error("Erro no getHandler:", err);
        
                if (err instanceof Error) {
                    response.status(400).json({
                        status: 400,
                        message: err.message,
                    });
                } else {
                    response.status(500).json({
                        status: 500,
                        message: "Erro inesperado!",
                    });
                }
            }
        }
    }
}

    // public async getHandler(request: Request, response: Response): Promise<void> {
    //     try {
    //         const { infUser } = request.body;
    //         if (!infUser || !infUser.id) {
    //             response.status(400).json({
    //                 status: 400,
    //                 message: "Dados inválidos.",
    //             });
    //         }

    //         const { id } = infUser;
    //         const demands = await this.listDemandUseCase.execute(id);
    //         response.status(200).json({
    //             status: 200,
    //             data: { demands },
    //         });
    //     } catch (err) {
    //         //Log do erro
    //         console.error("Erro no getHandler:", err);

    //         if (err instanceof Error) {
    //             response.status(400).json({
    //                 status: 400,
    //                 message: err.message,
    //             });
    //         } else {
    //             response.status(500).json({
    //                 status: 500,
    //                 message: "Erro inesperado!",
    //             });
    //         }
    //     }
    // }

