export type ProductType = {
    id: string | number,
    title: string,
    price: number,
    shortDescription: string,
    fullDescription: string,
    image: string,
}

export type HeadType = {
    type: "checkbox" | "text",
    value?: string,
    id: string | number
}

export type ProductsTablePropsType ={
    products: ProductType[]
    heads: HeadType[]
}
