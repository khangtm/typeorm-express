import * as fetch  from 'isomorphic-fetch'
var base_url = "http://localhost:3000/posts"
describe("Account API", function() {
  // jasmine.getEnv().defaultTimeoutInterval = 50000;
 
    it("Get accounts", function(done) {
      const options = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
      fetch(base_url, options).then(function(response) {
        console.log(response.body)
        expect(response).toBeDefined()
        done();
      }, function(error) {
        // handle network error
      })
    });
});