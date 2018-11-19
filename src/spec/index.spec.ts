// import *  as request from 'request'
// import * as fetch  from 'isomorphic-fetch'
// var base_url = "http://localhost:3000/posts"
var server = require('../index');
// var Jasmine = require('jasmine');
// var JasmineNode = require('jasmine-node');
// var server;
// beforeAll( async function(done){
//     server = await require('../index');
//     console.log('beforeAll')  
//     done()
// });
describe("Start server", function() {
    // afterEach(function(done){
    //   server.closeServer();
    //   //console.log('close index.spec')
    //   done()
    //   // console.log('server.close')
    // });

    it("start server", function() {
        console.log('Start index.spec') 
        expect(server).toBeDefined()
        // server.closeServer();
        // done()
    });
});



