interface User{
    _id: string,
    userId: string,
    firstName: string,
    lastName: string,
    age: string,
    gender:string,
    email: string,
    phone: string,
    password: string,
    postedList: string[],
    wishList: string[],
    createdDate: Date
}

export default User;