const chai = require('chai')
const {server} = require('../index')
const chaiHttp = require('chai-http')

chai.should();

chai.use(chaiHttp); 

describe( "Testing API's", () => {

    let finalScore = 1;

    describe("GET /user/users",()=>{
        it("should get all users",(done)=>{
            chai.request(server)
           .get("/user/users")
           .end((err,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.be.a('array');
                response.body.data.length.should.be.eql(5);
                finalScore += 2
                console.log("Final Score :",finalScore)
                done();
            })
        })
    })





    describe("POST /user/create",()=>{
        it("should create a new user",(done)=>{
            const newUser = {
                name: "John Doe",
                email: "john@example.com",
            };
            chai.request(server)
                .post("/user/create")
                .send(newUser)
                .end((err, response) => {
                    response.should.have.status(201); 
                    response.body.should.be.a('object');
                    response.body.should.have.property('id');
                    finalScore += 2;
                    console.log("Final Score :", finalScore);
                    done();
                });
        });
    });

    // Test for PATCH /user/update/:id
    describe("PATCH /user/update/:id",()=>{
        it("should update an existing user",(done)=>{
            const userId = 'exampleUserId'; 
            const updatedUserData = {
                name: "Updated Name",
            };
            chai.request(server)
                .patch(`/user/update/${userId}`)
                .send(updatedUserData)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    finalScore += 2;
                    console.log("Final Score :", finalScore);
                    done();
                });
        });
    });

    // Test for DELETE /user/delete/:id
    describe("DELETE /user/delete/:id",()=>{
        it("should delete an existing user",(done)=>{
            const userId = 'exampleUserId'; 
            chai.request(server)
                .delete(`/user/delete/${userId}`)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    finalScore += 2;
                    console.log("Final Score :", finalScore);
                    done();
                });
        });
    });

});
