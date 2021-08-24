//define the tours parameters
export interface toursparams{
  destination:string,
  uid:string,
  Name:string,
  description:string,
  attraction: string,
  services: string,
  name: string
  model: string,
  reg_no: string,
  rate: string,
  destinationSpan: any,
  attractionSpan: any
}
//Define destination parameters
// export interface Destination {
//     destination:string,
//     uid:string,
//     Name:string,
//     description:string,
//     attraction: string,
//     name: string
//     model: string,
//     reg_no: string,
//     rate: string
//   }
//
//define attraction parameters
// export interface Attraction {
//   attraction: string,
//   name: string,
//   description: string
// }
//
//define services parameters
// export interface Services{
//   services: string,
//   name: string,
//   attraction: number,
//   company: number
// }
//
//export actual services in an attraction
// export interface AtServices{
//   services: string,
//   name: string,
//   description: string,
//   model: string,
//   reg_no: string,
//   rate: string
// }