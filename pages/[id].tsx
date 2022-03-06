import { any } from "joi";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import styles from "../styles/Home.module.scss";
import Button from "@mui/material/Button";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { Alert, Card, Container, Grid, TextField } from "@mui/material";
import { withRouter } from "next/router";
import { Box } from "@mui/system";
import _ from "lodash";

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
        data: {} as any,
        errors: {} as any,
        success: false,
    };

    loadData = () => {
        if (this.props.router.query.id !== "add") {
            this.setState({ loading: true });
            axios
                .get("/api/fornecedor/" + this.props.router.query.id)
                .then((res) => {
                    this.setState({
                        data: res.data.result,
                    });
                })
                .finally(() => {
                    this.setState({ loading: false });
                });
        } else {
            this.setState({ loading: false });
        }
    };

    componentDidUpdate(prevProps: any) {
        if (
            this.props.router.isReady !== prevProps.router.isReady &&
            this.props.router.isReady == true
        ) {
            this.loadData();
        }
    }

    componentDidMount() {
        if (this.props.router.isReady == true) {
            this.loadData();
        }
    }

    submit = () => {
        this.setState({ loading: true });
        let data = this.state.data ?? {};
        if (!data.endereco) {
            data.endereco = {};
        }
        axios
            .post("/api/fornecedor/add", data)
            .then((res) => {
                this.setState({success: true});
                this.props.router.push('/');
            })
            .catch((err) => {
                this.setState({ errors: err.response.data.message });
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    };

    onChangeField = (value: any, fieldName: string) => {
        let data = { ...this.state.data };
        data = _.set(data, fieldName, value);
        if (Object.keys(this.state.errors).includes(fieldName)) {
            let errors = { ...this.state.errors };
            delete errors[fieldName];
            this.setState({ errors });
        }
        this.setState({ data });
    };

    render() {

        let readOnly = this.props.router.query.id !== 'add';

        return (
            <>
                <Head>
                    <title>Desafio Tok{"&"}Stok - Fornecedor</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Container>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>Fornecedor</strong>
                        </div>
                        <div>
                            <Button
                                onClick={() => this.props.router.push("/")}
                                color="primary"
                                variant="contained"
                            >
                                Voltar
                            </Button>
                        </div>
                    </div>
                    <div className="w-100 mt-3">
                        <Box
                            component="form"
                            sx={{
                                "& .MuiTextField-root": {
                                    m: 1,
                                    width: "calc(25% - 16px)",
                                },
                                "& .MuiPaper-root": {
                                    p: 1,
                                    m: 1,
                                },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                size="small"
                                id="nome"
                                label="Nome"
                                error={Object.keys(this.state.errors).includes(
                                    "nome"
                                )}
                                onChange={(event) =>
                                    this.onChangeField(
                                        event.target.value,
                                        "nome"
                                    )
                                }
                                InputProps={{
                                    readOnly,
                                  }}
                                helperText={this.state.errors["nome"]}
                                variant="outlined"
                                value={this.state.data.nome || ""}
                            />
                            <TextField
                                size="small"
                                id="razao_social"
                                label="Razão Social"
                                error={Object.keys(this.state.errors).includes(
                                    "razao_social"
                                )}
                                onChange={(event) =>
                                    this.onChangeField(
                                        event.target.value,
                                        "razao_social"
                                    )
                                }
                                InputProps={{
                                    readOnly,
                                  }}
                                helperText={this.state.errors["razao_social"]}
                                variant="outlined"
                                value={this.state.data.razao_social || ""}
                            />
                            <TextField
                                size="small"
                                id="CNPJ"
                                label="CNPJ"
                                variant="outlined"
                                error={Object.keys(this.state.errors).includes(
                                    "cnpj"
                                )}
                                onChange={(event) =>
                                    this.onChangeField(
                                        event.target.value,
                                        "cnpj"
                                    )
                                }
                                InputProps={{
                                    readOnly,
                                  }}
                                helperText={this.state.errors["cnpj"]}
                                value={this.state.data.cnpj || ""}
                            />
                            <TextField
                                size="small"
                                id="segmento"
                                label="Segmento"
                                variant="outlined"
                                error={Object.keys(this.state.errors).includes(
                                    "segmento"
                                )}
                                onChange={(event) =>
                                    this.onChangeField(
                                        event.target.value,
                                        "segmento"
                                    )
                                }
                                InputProps={{
                                    readOnly,
                                  }}
                                helperText={this.state.errors["segmento"]}
                                value={this.state.data.segmento || ""}
                            />
                            <Card elevation={1}>
                                <div className="mb-3">
                                    <strong>Endereço</strong>
                                </div>
                                <TextField
                                    size="small"
                                    id="CEP"
                                    label="CEP"
                                    error={Object.keys(
                                        this.state.errors
                                    ).includes("endereco.cep")}
                                    onChange={(event) =>
                                        this.onChangeField(
                                            event.target.value,
                                            "endereco.cep"
                                        )
                                    }
                                    InputProps={{
                                        readOnly,
                                      }}
                                    helperText={
                                        this.state.errors["endereco.cep"]
                                    }
                                    variant="outlined"
                                    value={this.state.data?.endereco?.cep || ""}
                                />
                                <TextField
                                    size="small"
                                    id="rua"
                                    label="Rua"
                                    variant="outlined"
                                    error={Object.keys(
                                        this.state.errors
                                    ).includes("endereco.rua")}
                                    onChange={(event) =>
                                        this.onChangeField(
                                            event.target.value,
                                            "endereco.rua"
                                        )
                                    }
                                    InputProps={{
                                        readOnly,
                                      }}
                                    helperText={
                                        this.state.errors["endereco.rua"]
                                    }
                                    value={this.state.data?.endereco?.rua || ""}
                                />
                                <TextField
                                    size="small"
                                    id="numero"
                                    label="Numero"
                                    error={Object.keys(
                                        this.state.errors
                                    ).includes("endereco.numero")}
                                    onChange={(event) =>
                                        this.onChangeField(
                                            event.target.value,
                                            "endereco.numero"
                                        )
                                    }
                                    helperText={
                                        this.state.errors["endereco.numero"]
                                    }
                                    InputProps={{
                                        readOnly,
                                      }}
                                    variant="outlined"
                                    value={
                                        this.state.data?.endereco?.numero || ""
                                    }
                                />
                                <TextField
                                    size="small"
                                    id="complemento"
                                    label="Complemento"
                                    error={Object.keys(
                                        this.state.errors
                                    ).includes("endereco.complemento")}
                                    onChange={(event) =>
                                        this.onChangeField(
                                            event.target.value,
                                            "endereco.complemento"
                                        )
                                    }
                                    helperText={
                                        this.state.errors[
                                            "endereco.complemento"
                                        ]
                                    }
                                    InputProps={{
                                        readOnly,
                                      }}
                                    variant="outlined"
                                    value={
                                        this.state.data?.endereco
                                            ?.complemento || ""
                                    }
                                />
                            </Card>
                            <div className="mt-3">
                                <TextField
                                    size="small"
                                    id="telefone_contato"
                                    error={Object.keys(
                                        this.state.errors
                                    ).includes("telefone_contato")}
                                    onChange={(event) =>
                                        this.onChangeField(
                                            event.target.value,
                                            "telefone_contato"
                                        )
                                    }
                                    helperText={
                                        this.state.errors["telefone_contato"]
                                    }
                                    InputProps={{
                                        readOnly,
                                      }}
                                    label="Telefone de contato"
                                    variant="outlined"
                                    value={
                                        this.state.data.telefone_contato || ""
                                    }
                                />
                                <TextField
                                    size="small"
                                    id="email_contato"
                                    label="Email de contato"
                                    error={Object.keys(
                                        this.state.errors
                                    ).includes("email_contato")}
                                    onChange={(event) =>
                                        this.onChangeField(
                                            event.target.value,
                                            "email_contato"
                                        )
                                    }
                                    helperText={
                                        this.state.errors["email_contato"]
                                    }
                                    InputProps={{
                                        readOnly,
                                      }}
                                    variant="outlined"
                                    value={this.state.data.email_contato || ""}
                                />
                            </div>
                        </Box>
                        {this.props.router.query.id == "add" && (
                            <>
                                <div className="w-100 d-flex justify-content-between">
                                    <div></div>
                                    <div>
                                        <Button
                                            onClick={this.submit}
                                            color="success"
                                            variant="contained"
                                        >
                                            Gravar
                                        </Button>
                                    </div>
                                </div>
                                {this.state.success == true && (
                                    <div className="w-100 mt-3">
                                        <Alert>
                                            Fornecedor cadastrado com sucesso!
                                            aguarde.
                                        </Alert>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </Container>
            </>
        );
    }
}

export default withRouter(HomePage);
