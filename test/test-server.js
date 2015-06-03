var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);


describe('Shopping List', function() {
    it('should list items on GET', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('id');
                res.body[0].should.have.property('name');
                res.body[0].id.should.be.a('number');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Broad beans');
                res.body[1].name.should.equal('Tomatoes');
                res.body[2].name.should.equal('Peppers');
                done();
            });
    });

    it('should add an item on POST', function(done) {
        chai.request(app)
          .post('/items')
          .send({name: 'test-the-post'})
          .end(function(err, res) {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.name.should.equal('test-the-post');
            res.body.id.should.equal(3);
            done();
        }); // end .end
    }); // end POST test
  
    it('should edit an item on PUT', function(done){
        chai.request(app)
          .put('/items/1')
          .send({name: 'test-the-put'})
          .end(function(err, res) {
            console.log(res.body);
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.name.should.equal('test-the-put');
            res.body.id.should.equal(1);
            done();
        }); // end of .end
    }); // end of PUT Test
  
    it('should delete an item on DELETE', function(done){
        chai.request(app)
          .delete('/items/1')
          .end(function(err, res) {
            console.log("res body for delete", res.body);
            res.should.have.status(201);
            res.should.be.json;
//             res.body.should.be.a('object');
             res.body.name.should.equal('test-the-put');
            res.body.id.should.equal(1);
        
            done();
        }); // end of .end
    }); // end of Delete Test;
  
//   it('should return an message if the item to be deleted does not exist',function(done){
// 		chai.request(app)
// 			.delete('/items/99')
// 			.end(function(err,res){
// 				console.log(res);
// 			})
// 	});

// 	it('should return an message if the item to be updated does not exist (message says item is added)', function(){
// 		chai.request(app)
// 			.put('/items/99')
// 			.send({name:'test-put-non-exist',id:'99'})
// 			.end(function(err,res){
// 				res.should.have.status(200);
// 				res.should.be.json;
// 				res.should.have.property('message');
// 				done();
// 			})
// 	});
   
});