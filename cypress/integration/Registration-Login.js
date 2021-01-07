describe('Userinfo', function() {
   it('Registration', function() {
    cy.readFile('UserInfo.csv')
    .then((data) => {
        cy.log(data);
        var userInfos = csvToJson(data);
        cy.visit(" http://automationpractice.com");
        cy.get(userInfos).each((userinfo) => {
        cy.log(userinfo.emailaddress);
        cy.get('.login').click();
        cy.get('#email_create').type(userinfo.emailaddress);
        cy.get('#SubmitCreate > span').click();
        if(userinfo.gender=='Male')
            cy.get('#id_gender1').check();
        else
        cy.get('#id_gender2').check();
        cy.get('#customer_firstname').type(userinfo.firstname);
        cy.get('#customer_lastname').type(userinfo.lastname);
        cy.get('#passwd').type(userinfo.password);
        cy.get('#days').select('1');
        cy.get('#months').select('June');
        cy.get('#years').select('1988')
        cy.get('#address1').type(userinfo.address);
        cy.get('#city').type(userinfo.city);
        cy.get('#id_state').select('Alaska');
        cy.get('#postcode').type(userinfo.postcode);
        cy.get('#phone_mobile').type(userinfo.mobile);
        cy.get('#submitAccount > span').click();
        cy.get('.logout').click();
        })       
      
    });


})
   it('Signin ', function() {
    cy.readFile('C:\\Users\\ujala\\Desktop\\UserInfo.csv')
   .then((data) => {
    cy.log(data);
    var userInfos = csvToJson(data);
    cy.visit(" http://automationpractice.com");
    cy.get('.login').click();
    cy.get(userInfos).each((userinfo) => {
    cy.get('#email').type(userinfo.emailaddress);
    cy.get('#passwd').type(userinfo.password);
    cy.get('#SubmitLogin > span').click();
    cy.get('.logout').click();
    })
    })
})

function csvToJson (data) {
    var lines=data.split("\n");
    var result = [];
    var headers=lines[0].split(",");
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    cy.log(result);
    return result
  }

})

