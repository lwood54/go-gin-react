export enum Actions {
  ADD = "add",
  UPDATE = "update",
  DELETE = "delete"
}

export enum UserField {
  ID_INPUT = "idInput",
  LAST_NAME = "lastName",
  FIRST_NAME = "firstName",
  EMAIL = "email",
  PHONE = "phone",
  PASSWORD = "password",
  BLANK = ""
}

export enum URLPaths {
  API_USER = "/api/user/"
}

export const DefaultUser = {
  id: 0,
  lastName: UserField.BLANK,
  firstName: UserField.BLANK,
  email: UserField.BLANK,
  phone: UserField.BLANK,
  password: UserField.BLANK,
}