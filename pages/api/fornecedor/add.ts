// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import joiSchemas from "../../../app/joiSchemas";
import withDb from "../../../app/withDb";

interface IResponseData {
    message: string | string[];
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IResponseData>
) {
    if (req.method == "POST") {
        const database = withDb();
        await database.read();
        const contentData = req.body;
        if (database.data && typeof contentData == "object") {
            try {
                //verifica se o input é valido com o JOI
                const validation = joiSchemas.fornecedores.validate(
                    contentData,
                    { abortEarly: false }
                );

                //caso não seja valido, throw nos erros
                if (
                    validation?.error?.details &&
                    validation?.error?.details?.length > 0
                ) {
                    throw validation?.error?.details;
                }
                //caso seja, salve no banco e retorna sucesso
                database.data.fornecedores.push({
                    ...contentData,
                    id: database.data.fornecedores.length + 1,
                });
                await database.write();
                return res.status(200).json({ message: "Success" });
            } catch (e: any) {
                if (Array.isArray(e)) {
                    //Mapeia os erros do JOI para só a mensagem
					let errors = {} as any;
					e.forEach((item: any) => {
						errors[item.path.join('.')] = item.message;
                        // return item.message;
                    });
                    return res.status(406).json({ message: errors });
                } else {
                    throw e;
                }
            }
        }
        return res.status(406).json({ message: "Not acceptable" });
    } else {
        return res.status(405).json({
            message: "Method not allowed",
        });
    }
}
