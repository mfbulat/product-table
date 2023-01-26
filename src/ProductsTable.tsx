import * as React from 'react';
import {ChangeEvent, FC, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Toolbar from "@mui/material/Toolbar";
import uuid from 'react-uuid';
import {ProductsTablePropsType, ProductType} from "./types";

function getArrayRandElement<T>(arr: T[]): T {
    const rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

function createProduct(prods: ProductType[]): ProductType {
    return {...getArrayRandElement(prods), id: uuid()}
}

const ProductsTable: FC<ProductsTablePropsType> = ({products, heads}) => {
    const [prods, setProds] = useState<ProductType[]>(products)
    const [clickedProdId, setClickedProdId] = useState<ProductType["id"] | null>(null)
    const [chosenProdsIds, setChosenProdsIds] = useState<Array<ProductType["id"]>>([])

    const addProduct = () => {
        setProds((prev) => [...prev, createProduct(prods)])
    }

    const rowHandler = (id: ProductType["id"]) => {
        setClickedProdId(id)
    };

    const rowCheckboxHandler = (e: ChangeEvent<HTMLInputElement>, id: ProductType["id"]) => {
        e.currentTarget.checked
            ? setChosenProdsIds(prevState => [...prevState, id])
            : setChosenProdsIds(prevState => prevState.filter(p => p !== id))
    }

    const headCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.checked
            ? setChosenProdsIds(prods.map(p=>p.id))
            : setChosenProdsIds([])
    }

    return (
        <TableContainer component={Paper}>
            <Toolbar
                sx={{
                    pl: {sm: 2},
                    pr: {xs: 1, sm: 1},
                }}
            >
                <Button onClick={addProduct} size={"small"} variant="contained">Добавить</Button>
            </Toolbar>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {heads?.map((cell: any) => (
                            cell.type !== 'checkbox'
                                ? <TableCell align="left" key={cell.id}>{cell.value}</TableCell>
                                : <TableCell align="left" padding="checkbox" key={cell.id}>
                                    <Checkbox
                                        color="primary"
                                        onChange={headCheckboxHandler}
                                    />
                                </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {prods?.map((prod) => (
                        <TableRow
                            key={prod.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            onClick={() => rowHandler(prod.id)}
                        >
                            <TableCell padding="checkbox" align="left">
                                <Checkbox
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => rowCheckboxHandler(e, prod.id)}
                                    checked={chosenProdsIds.includes(prod.id)}
                                    color="primary"
                                />
                            </TableCell>
                            <TableCell align="left" sx={{width: '100%'}}>
                                {clickedProdId === prod.id ? prod.fullDescription : prod.shortDescription}
                            </TableCell>
                            <TableCell align="left">{prod.price} ₽</TableCell>
                            <TableCell align="left">
                                <img src={prod.image} alt={''} style={{
                                    width: '100px',
                                    height: '100px',
                                    objectPosition: 'center',
                                    objectFit: 'contain',
                                }}/>
                            </TableCell>
                            <TableCell align="right">
                                <Button onClick={(e) => e.stopPropagation()} variant="contained"
                                        color="success">Купить</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ProductsTable
