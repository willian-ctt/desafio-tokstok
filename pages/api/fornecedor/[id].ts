// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import joiSchemas from "../../../app/joiSchemas";
import withDb from "../../../app/withDb";

interface IResponseData {
    result?: any;
    message?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IResponseData>
) {
    if (req.method == "GET" || req.method == "DELETE") {
        const database = withDb();
        await database.read();
        if (typeof req.query.id == "string") {
            let id = parseInt(req.query.id ?? null);
            if (id && typeof id == "number") {
                let foundFornecedores : any[] = database.data?.fornecedores.length
                    ? database.data?.fornecedores.filter(
                          (item) => item.id == id
                      )
                    : [];
                if (foundFornecedores?.length > 0) {
                    let fornecedor = foundFornecedores[0];
                    if (req.method == "DELETE") {
                        database.data?.fornecedores.splice(database.data.fornecedores.indexOf(fornecedor), 1);
                        await database.write();
                        return res.status(200).json({
                            result: "ID #" + id + " deleted successfully.",
                        });
                    } else {
                        return res.status(200).json({
                            result: fornecedor,
                        });
                    }
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
