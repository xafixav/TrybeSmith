export default interface IOrderCreated {
  order: {
    userId: number,
    products: number[]
  }
}