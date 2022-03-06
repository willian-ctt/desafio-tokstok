import { any } from "joi";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import styles from "../styles/Home.module.scss";
import Button from "@mui/material/Button";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { Container } from "@mui/material";
import { withRouter } from "next/router";

const rows: GridRowsProp = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "DataGridPro", col2: "is Awesome" },
    { id: 3, col1: "MUI", col2: "is Amazing" },
];

const columns: GridColDef[] = [
    { field: "col1", headerName: "Column 1", width: 150 },
    { field: "col2", headerName: "Column 2", width: 150 },
];

class HomePage extends React.Component<any, {}> {
    public state = {
        loading: true,
        page: 2,
        perPage: 10,
        total: 0,
        rows: [],
        columns: [
            {
                field: "nome",
                headerName: "Nome",
                width: 150,
                sortable: false,
                filterable: false,
            },
            {
                field: "razao_social",
                headerName: "Razão Social",
                width: 150,
                sortable: false,
                filterable: false,
            },
            {
                field: "cnpj",
                headerName: "CNPJ",
                width: 150,
                sortable: false,
                filterable: false,
            },
            {
                field: "segmento",
                headerName: "Segmento",
                width: 150,
                sortable: false,
                filterable: false,
            },
            {
                field: "endereco",
                headerName: "CEP",
                width: 150,
                renderCell: (cell) => <div>{cell.value?.cep}</div>,
                sortable: false,
                filterable: false,
            },
            {
                field: "endereco",
                headerName: "Rua",
                width: 150,
                renderCell: (cell) => <div>{cell.value?.rua}</div>,
                sortable: false,
                filterable: false,
            },
            {
                field: "endereco",
                headerName: "Numero",
                width: 150,
                renderCell: (cell) => <div>{cell.value?.numero}</div>,
                sortable: false,
                filterable: false,
            },
            {
                field: "endereco",
                headerName: "Complemento",
                width: 150,
                renderCell: (cell) => <div>{cell.value?.complemento}</div>,
                sortable: false,
                filterable: false,
            },
            {
                field: "telefone_contato",
                headerName: "Telefone de contato",
                width: 150,
                sortable: false,
                filterable: false,
            },
            {
                field: "email_contato",
                headerName: "Email de contato",
                width: 150,
                sortable: false,
                filterable: false,
            },
            {
                field: "id",
                headerName: "Ações",
                width: 150,
                sortable: false,
                filterable: false,
                renderCell: (cell) => {
                    return (
                        <>
                            <Button onClick={() => this.viewRow(cell.value)}>
                                Visualizar
                            </Button>
                        </>
                    );
                },
            },
        ] as GridColDef[],
    };

    loadData = () => {
        this.setState({ loading: true });
        axios
            .get("/api/fornecedor/list", {
                params: {
                    page: this.state.page,
                    perPage: this.state.perPage,
                },
            })
            .then((res) => {
                this.setState({
                    rows: res.data.result,
                    total: res.data.meta.total,
                    perPage: res.data.meta.perPage,
                    page: res.data.meta.page,
                });
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    };

    componentDidMount() {
        this.loadData();
    }

    viewRow = (rowId: any) => {
        this.props.router.push("/" + rowId);
    };

    componentDidUpdate(prevProps: any, prevState: any) {}

    render() {
        return (
            <>
                <Head>
                    <title>Desafio Tok{"&"}Stok</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Container>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>Listagem de Fornecedores</strong>
                        </div>
                        <div>
                            <Button onClick={() => this.props.router.push('/add')} color="success" variant="contained">
                                Adicionar novo
                            </Button>
                        </div>
                    </div>
                    <div style={{ height: 600 }} className="w-100 mt-3">
                        <DataGrid
                            loading={this.state.loading}
                            pageSize={this.state.perPage}
                            onPageChange={(page) =>
                                this.setState({ page: page + 1 }, this.loadData)
                            }
                            onPageSizeChange={(perPage) =>
                                this.setState({ perPage }, this.loadData)
                            }
                            onRowDoubleClick={(row) => {
                                this.viewRow(row.id);
                            }}
                            className="mt-3"
                            paginationMode={"server"}
                            rowCount={this.state.total}
                            page={this.state.page - 1}
                            rowsPerPageOptions={[1, 5, 10]}
                            rows={this.state.rows}
                            columns={this.state.columns}
                        />
                    </div>
                </Container>
            </>
        );
    }
}

export default withRouter(HomePage);
