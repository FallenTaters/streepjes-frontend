export const Role = {
    NotAuthorized: "not_authorized",
    Admin: "admin",
    Bartender: "bartender",
}

export enum Club {
    Unknown,
    Parabool,
    Gladiators,
}

interface PriceObject {
    amount: number
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

interface ProductObject {
    id: number
    category: number
    name: string
    priceParabool: PriceObject
    priceGladiators: PriceObject
}

export class Product {
    id: number
    category: number
    name: string
    priceParabool: Price
    priceGladiators: Price

    constructor(obj: ProductObject) {
        this.id = 0
        this.category = 0
        this.name = ""
        this.priceParabool = new Price(0)
        this.priceGladiators = new Price(0)

        Object.assign(this, obj)

        if (obj.priceParabool) {
            this.priceParabool = new Price(obj.priceParabool.amount)
        }
        if (obj.priceGladiators) {
            this.priceGladiators = new Price(obj.priceGladiators.amount)
        }
    }

    getPrice(club: Club) {
        switch (club) {
            case Club.Parabool:
                return this.priceParabool
            case Club.Gladiators:
                return this.priceGladiators
            default:
                return new Price(0)
        }
    }
}

interface OrderlineObject {
    product: ProductObject
    amount: number
}

export class Orderline {
    product: Product
    amount: number

    constructor(obj: OrderlineObject) {
        this.product = new Product({
            id: 0,
            category: 0,
            name: "",
            priceParabool: new Price(0),
            priceGladiators: new Price(0),
        })
        this.amount = 0

        Object.assign(this, obj)

        if (obj.product) {
            console.log(obj.product)
            this.product = new Product(obj.product)
        }
    }

    price(club: Club): Price {
        return new Price(this.product.getPrice(club).amount * this.amount)
    }
}

export interface OrderObject {
    club: number
    orderlines: OrderlineObject[]
}

export class Order {
    club: Club
    orderlines: Orderline[]

    constructor(obj: OrderObject) {
        this.club = Club.Unknown
        this.orderlines = new Array<Orderline>()

        Object.assign(this, obj)

        if (obj.orderlines) {
            this.orderlines = []
            obj.orderlines.forEach(ol => {
                this.orderlines.push(new Orderline(ol))
            })
        }
    }

    totalPrice(club: Club): Price {
        let total = 0
        for (const orderline of this.orderlines) {
            total += orderline.price(club).amount
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

        this.orderlines.push(
            new Orderline({
                product: (product as unknown) as ProductObject,
                amount: 1,
            })
        )
    }
}

interface MemberObject {
    id: number
    club: Club
    name: string
    debt: PriceObject
}

export class Member {
    id!: number
    club!: Club
    name!: string
    debt!: Price

    constructor(obj: MemberObject) {
        Object.assign(this, obj)

        if (obj.debt) {
            this.debt = new Price(obj.debt.amount)
        }
    }
}

interface MemberListObject {
    members: MemberObject[]
}
export class MemberList {
    members: Member[]

    constructor(obj: MemberListObject) {
        this.members = []
        obj.members.forEach(mem => {
            this.members.push(new Member(mem))
        })
    }

    getByClub(club: Club): Member[] {
        return this.members.filter(member => member.club == club)
    }
}
