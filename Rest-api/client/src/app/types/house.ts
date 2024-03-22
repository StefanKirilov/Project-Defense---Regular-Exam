export interface House {
    _id: string,
    name: string,
    location: string,
    phone: string,
    description: string,
    price: string,
    image: string,
    likes: string[],
    owner: string,
    commentList: any[],
}