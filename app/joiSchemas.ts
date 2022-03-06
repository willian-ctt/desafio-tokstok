import Joi from "joi";

const joiSchemas = {
    fornecedores: Joi.object({
        nome: Joi.string().required().label("Nome"),
        razao_social: Joi.string().required().label('Razão social'),
        cnpj: Joi.string().required().label('CNPJ'),
        segmento: Joi.string().required().label("Segmento"),
        endereco: Joi.object({
            cep: Joi.string().required().label('CEP'),
            rua: Joi.string().required().label('Rua'),
            numero: Joi.string().required().label('Numero'),
            complemento: Joi.string().allow(null).label('Complemento')
        }).required().label("Endereço"),
        telefone_contato: Joi.string().required().label("Telefone de contato"),
        email_contato: Joi.string().required().label("Email de contato"),
    })
}

export default joiSchemas