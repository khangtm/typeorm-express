import * as fetch from 'isomorphic-fetch'
var base_url = "http://localhost:3000/posts"
describe("Posts API", function () {

  it("Get Posts", function (done) {
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }
    fetch(base_url, options).then(function (response) {
      expect(response).toBeDefined()
      done();
    }, function (error) {
      // handle network error
    })
  });
});