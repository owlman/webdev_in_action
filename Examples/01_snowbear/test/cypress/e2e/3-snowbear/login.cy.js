
describe('用户登录界面测试', function() {
    beforeEach(function() {
        cy.visit('http://localhost/login&signup.htm');
    });

    it('输入检测测试', function() {
        const inputName = cy.get('#loginForm input[name="username"]');
        const inputpwd = cy.get('#loginForm input[name="password"]');
        // 先测试输入为空的情况
        inputName.clear().should('have.value', '');
        inputName.blur();
        inputpwd.clear().should('have.value', '');
        inputpwd.blur();
        cy.wait(3000);

        // 建立三组测试用例，并进行测试
        const inputdata = [
            { username: '_man', password: '1234' },
            { username: 'owlman', password: '1234' },
            { username: 'owlman', password: '12345678' },
        ];
        inputdata.forEach(function(data) {
            inputName.clear();
            inputName.type(data.username)
            .should('have.value', data.username);
            inputName.blur();
            inputpwd.clear();
            inputpwd.type(data.password)
            .should('have.value', data.password);
            inputpwd.blur();
            cy.wait(3000);
        });
    });
    it('用户登录功能测试', function() {
        cy.get('#loginForm input[name="username"]').type('owlman');
        cy.get('#loginForm input[name="password"]').type('111111111');
        cy.get('#loginForm').submit();
        // 如果页面跳转至userinfo.htm即代表登录成功
        cy.url().should('include', '/userinfo.htm');
    });
});