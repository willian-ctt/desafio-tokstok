import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";

const __dirname = process.cwd();
// Use JSON file for storage

interface IFornecedorRow {
    id?: number,
    nome: string;
    razao_social: string;
    cnpj: string;
    segmento: string;
    endereco: {
        cep: string;
        rua: string;
        numero: string;
        complemento?: string;
    };
    telefone_contato: string;
    email_contato: string;
}

export interface IDatabase {
  fornecedores: Array<IFornecedorRow>;
}

const file = join(__dirname, "db.json");
const adapter = new JSONFile<IDatabase>(file);

const withDb = () => {
  const db = new Low(adapter);
  db.data ||= { fornecedores: [] };
  return db;
};
export default withDb;
