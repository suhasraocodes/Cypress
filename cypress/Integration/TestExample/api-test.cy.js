describe('ReqRes API Endpoints Tests', () => {

    // Test: GET list of users
    // This test validates that a successful GET request to the /api/users endpoint 
    // returns a 200 status and that the response contains a list of users.
    it('GET /api/users - Validate list of users', () => {
      cy.request('GET', 'https://reqres.in/api/users').then((response) => {
        // Expect the status code to be 200 (success)
        expect(response.status).to.eq(200);
        // Expect the data array to have at least one user
        expect(response.body.data).to.have.length.greaterThan(0);
      });
    });
  
    // Test: GET details of a single user
    // This test checks if the details of a specific user (user with id 2) 
    // are correctly returned with a 200 status.
    it('GET /api/users/2 - Validate single user details', () => {
      cy.request('GET', 'https://reqres.in/api/users/2').then((response) => {
        // Expect the status code to be 200
        expect(response.status).to.eq(200);
        // Check if the user data includes the correct id (2)
        expect(response.body.data).to.have.property('id', 2);
      });
    });
  
    // Test: GET single user not found
    // This test verifies that when requesting a non-existent user (id 999), 
    // the server responds with a 404 status code.
    it('GET /api/users/999 - User not found', () => {
      cy.request({
        method: 'GET',
        url: 'https://reqres.in/api/users/999',
        failOnStatusCode: false  // Prevent Cypress from failing on non-200 status
      }).then((response) => {
        // Expect a 404 status for a non-existent user
        expect(response.status).to.eq(404);
      });
    });
  
    // Test: GET list of resources
    // This test checks that a successful request to the /api/unknown endpoint 
    // returns a 200 status and a list of resources.
    it('GET /api/unknown - Validate list of resources', () => {
      cy.request('GET', 'https://reqres.in/api/unknown').then((response) => {
        // Expect the status code to be 200
        expect(response.status).to.eq(200);
        // Validate that the first resource has a name property
        expect(response.body.data[0]).to.have.property('name');
      });
    });
  
    // Test: GET details of a single resource
    // This test ensures that requesting details for a specific resource (id 2)
    // returns a 200 status and the resource data contains a name property.
    it('GET /api/unknown/2 - Validate single resource', () => {
      cy.request('GET', 'https://reqres.in/api/unknown/2').then((response) => {
        // Expect the status code to be 200
        expect(response.status).to.eq(200);
        // Ensure the resource data contains a name
        expect(response.body.data).to.have.property('name');
      });
    });
  
    // Test: GET single resource not found
    // This test checks that requesting a non-existent resource (id 999) 
    // results in a 404 status code.
    it('GET /api/unknown/999 - Resource not found', () => {
      cy.request({
        method: 'GET',
        url: 'https://reqres.in/api/unknown/999',
        failOnStatusCode: false  // Prevent Cypress from failing on 404
      }).then((response) => {
        // Expect a 404 status for a non-existent resource
        expect(response.status).to.eq(404);
      });
    });
  
    // Test: POST create a new user
    // This test verifies that creating a new user via POST /api/users 
    // returns a 201 status and the user data contains an id.
    it('POST /api/users - Create a new user', () => {
      cy.request('POST', 'https://reqres.in/api/users', {
        name: 'John',
        job: 'Developer'
      }).then((response) => {
        // Expect the status code to be 201 (created)
        expect(response.status).to.eq(201);
        // Ensure the response contains a generated id for the new user
        expect(response.body).to.have.property('id');
      });
    });
  
    // Test: PUT update a user's data
    // This test checks that updating a user's data (user with id 2) 
    // using the PUT method returns a 200 status and updates the job field correctly.
    it('PUT /api/users/2 - Update user data', () => {
      cy.request('PUT', 'https://reqres.in/api/users/2', {
        name: 'John',
        job: 'Manager'
      }).then((response) => {
        // Expect the status code to be 200
        expect(response.status).to.eq(200);
        // Ensure the job field is updated to 'Manager'
        expect(response.body).to.have.property('job', 'Manager');
      });
    });
  
    // Test: PATCH update part of a user's data
    // This test ensures that partially updating a user's data (user with id 2) 
    // via the PATCH method correctly updates the job field to 'Senior Developer'.
    it('PATCH /api/users/2 - Partially update user data', () => {
      cy.request('PATCH', 'https://reqres.in/api/users/2', {
        job: 'Senior Developer'
      }).then((response) => {
        // Expect the status code to be 200
        expect(response.status).to.eq(200);
        // Ensure the job field is updated to 'Senior Developer'
        expect(response.body).to.have.property('job', 'Senior Developer');
      });
    });
  
    // Test: DELETE a user
    // This test checks that deleting a user (user with id 2) 
    // returns a 204 status (no content).
    it('DELETE /api/users/2 - Delete a user', () => {
      cy.request('DELETE', 'https://reqres.in/api/users/2').then((response) => {
        // Expect the status code to be 204 (no content)
        expect(response.status).to.eq(204);
      });
    });
  
    // Test: POST successful registration
    // This test verifies that a successful registration request 
    // returns a 200 status and includes a token in the response body.
    it('POST /api/register - Successful registration', () => {
      cy.request('POST', 'https://reqres.in/api/register', {
        email: 'eve.holt@reqres.in',
        password: 'pistol'
      }).then((response) => {
        // Expect the status code to be 200 (success)
        expect(response.status).to.eq(200);
        // Ensure the response contains a token
        expect(response.body).to.have.property('token');
      });
    });
  
    // Test: POST unsuccessful registration
    // This test checks that attempting to register without a password 
    // results in a 400 status and an error message.
    it('POST /api/register - Unsuccessful registration', () => {
      cy.request({
        method: 'POST',
        url: 'https://reqres.in/api/register',
        failOnStatusCode: false,  // Prevent Cypress from failing on 400
        body: {
          email: 'eve.holt@reqres.in'
        }
      }).then((response) => {
        // Expect a 400 status (bad request)
        expect(response.status).to.eq(400);
        // Ensure the response contains an error message
        expect(response.body).to.have.property('error');
      });
    });
  
    // Test: POST successful login
    // This test ensures that a successful login request 
    // returns a 200 status and a token in the response body.
    it('POST /api/login - Successful login', () => {
      cy.request('POST', 'https://reqres.in/api/login', {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      }).then((response) => {
        // Expect the status code to be 200
        expect(response.status).to.eq(200);
        // Ensure the response contains a token
        expect(response.body).to.have.property('token');
      });
    });
  
    // Test: POST unsuccessful login
    // This test verifies that attempting to login without a password 
    // results in a 400 status and an error message.
    it('POST /api/login - Unsuccessful login', () => {
      cy.request({
        method: 'POST',
        url: 'https://reqres.in/api/login',
        failOnStatusCode: false,  // Prevent Cypress from failing on 400
        body: {
          email: 'eve.holt@reqres.in'
        }
      }).then((response) => {
        // Expect a 400 status (bad request)
        expect(response.status).to.eq(400);
        // Ensure the response contains an error message
        expect(response.body).to.have.property('error');
      });
    });
  
    // Test: GET delayed response
    // This test ensures that the server handles delayed responses correctly 
    // by waiting for 3 seconds and then returning the user data.
    it('GET /api/users?delay=3 - Test delayed response', () => {
      cy.request('GET', 'https://reqres.in/api/users?delay=3').then((response) => {
        // Expect the status code to be 200
        expect(response.status).to.eq(200);
        // Validate that the response contains user data
        expect(response.body.data).to.have.length.greaterThan(0);
      });
    });
  
  });
  