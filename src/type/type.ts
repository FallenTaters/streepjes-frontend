export enum Club {
    Unknown,
    Parabool,
    Gladiators,
}

interface CategoryInterface {
    id: number
    name: string
}

export class Category {
    id: number
    name: string

    constructor(obj: CategoryInterface) {
        this.id = obj.id
        this.name = obj.name
    }
}

interface ProductInterface {
    id: number
    category: number
    name: string
    price: Price
}

export class Product {
    id: number
    category: number
    name: string
    price: Price

    constructor(obj: ProductInterface) {
        this.id = obj.id
        this.category = obj.category
        this.name = obj.name
        this.price = obj.price
    }
}

export class Price {
    amount: number

    constructor(amount: number) {
        this.amount = amount
    }

    print() {
        return `€ ${(this.amount / 100).toFixed(2)}`
    }
}

interface OrderlineInterface {
    product: Product
    amount: number
}

export class Orderline {
    product: Product
    amount: number

    constructor(obj: OrderlineInterface) {
        this.product = obj.product
        this.amount = obj.amount
    }

    price(): Price {
        return new Price(this.product.price.amount * this.amount)
    }
}

export class Order {
    club: Club
    orderlines: Orderline[]

    constructor(club: Club) {
        this.club = club
        this.orderlines = new Array<Orderline>()
    }

    totalPrice(): Price {
        let total = 0
        for (const orderline of this.orderlines) {
            total += orderline.price().amount
        }
        return new Price(total)
    }

    addProduct(product: Product) {
        for (const orderline of this.orderlines) {
            if (orderline.product.id == product.id) {
                orderline.amount++
                return
            }
        }

        this.orderlines.push(new Orderline({ product: product, amount: 1 }))
    }
}

interface MemberInterface {
    id: number
    club: Club
    name: string
    debt: Price
}

export class Member {
    id: number
    club: Club
    name: string
    debt: Price

    constructor(obj: MemberInterface) {
        this.id = obj.id
        this.club = obj.club
        this.name = obj.name
        this.debt = obj.debt
    }
}

export class MemberList {
    members: Member[]

    constructor(members: Member[]) {
        this.members = members
    }

    getByClub(club: Club): Member[] {
        return this.members.filter(member => member.club == club)
    }
}
