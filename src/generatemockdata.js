import { faker } from '@faker-js/faker'

// Create 1000 users
for (let i = 0; i < 1000; i++) {
  let name = faker.person.firstName()
  let lastName = faker.person.lastName()
  let email = faker.internet.email({
    firstName: name,
    lastName: lastName,
  })
  let displayName = faker.internet.displayName({
    firstName: name,
    lastName: lastName,
  })
  let userData = {
    name: name + lastName,
    email: email,
    username: `@${displayName}`,
    password: faker.internet.password(),
  }
  fetch("http://localhost:3001/users", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
