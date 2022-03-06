// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import joiSchemas from "../../../app/joiSchemas";
import withDb from "../../../app/withDb";

interface IResponseData {
    result?: any;
    message?: string;
    meta?: {
        page: number;
        perPage: number;
        total: number;
        totalPages: number;
    };
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IResponseData>
) {
    if (req.method == "GET") {
        const database = withDb();
        await database.read();
        let perPage = parseInt(
            req.query.perPage && typeof req.query.perPage == "string"
                ? req.query.perPage
                : "5"
        );
        let page =
            parseInt(
                req.query.page && typeof req.query.page == "string"
                    ? req.query.page
                    : "1"
            ) - 1;
        let fornecedores = database.data?.fornecedores ?? [];
        let total = database.data?.fornecedores.length ?? 0;
        return res.status(200).json({
            result: fornecedores.reverse().slice(
                page * perPage,
                page * perPage + perPage
            ),
            meta: {
                page: page + 1,
                totalPages: Math.ceil(total / perPage),
                perPage,
                total,
            },
        });
    } else {
        return res.status(405).json({
            message: "Method not allowed",
        });
    }
}
