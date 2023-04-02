import prisma from "../prisma"
const createScheduleMsg = async (
  contactNo: string,
  vehicleNo: string,
  expiryDate: Date,
  createdDate: Date
) => {
  try {
    const customerFound = await prisma.customer.findFirst({
      where: {
        contactNo,
        vehicleNo,
      },
    })
    let customer = customerFound
    if (!customerFound) {
      customer = await prisma.customer.create({
        data: {
          contactNo,
          vehicleNo,
        },
      })
    }

    const response = await prisma.schedule_msg.create({
      data: {
        expiryDate,
        createdDate,
        customerId: customer?.id,
      },
    })
    return response
  } catch (error) {
    console.log(error)
    return null
  }
}

export { createScheduleMsg }
export default { createScheduleMsg }
