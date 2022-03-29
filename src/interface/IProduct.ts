export default interface IProduct {
  id: string,
  name: string,
  amount: string,
  orderId?: number | null,
}