export class Product {
    productId: Number;
    title: string;
    imageUrl: string;
    description: string;
    price: Number;
    rating: Number;
    location: string;
    stockAvailable: string = 'true';
    isDeleted:boolean = false;
}