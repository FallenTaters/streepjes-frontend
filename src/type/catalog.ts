import { Club } from "./member"

export function renderPrice(price: number): string {
    return `€ ${(price / 100).toFixed(2)}`
}

export interface Category {
    id: number
    name: string
}

export interface Product {
    id: number
    category: number
    name: string
    priceParabool: number
    priceGladiators: number
}

export function productPrice(p: Product, c: Club): number {
    switch (c) {
        case Club.Gladiators:
            return p.priceGladiators
        case Club.Parabool:
            return p.priceParabool
        default:
            return 0
    }
}
