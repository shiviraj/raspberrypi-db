class RaspberrypiServerError extends Error {
  constructor(errorMessage: { message: string }) {
    super(errorMessage.message);
    Object.setPrototypeOf(this, RaspberrypiServerError.prototype)
  }
}

export default RaspberrypiServerError