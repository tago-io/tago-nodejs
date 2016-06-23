'use strict';
const expect  = require('chai').expect;
const Account = require('../../account');
const token   = '000f0800-fc4b-11e5-b15e-f77cdcbbb9e4';

suite('Account - Actions', () => {
    const myacc      = new Account(token);
    suite('List', () => {
        test('Success', (done) => {
            myacc.actions.list()
                .then((x) => {
                    expect(x).to.exist;
                    expect(x.url).to.be.equal('/action');
                    expect(x.method).to.be.equal('GET');
                    expect(x.token).to.be.equal(token);
                    done();
                });
        });

    });

    suite('Create', () => {
        test('Success', (done) => {
            myacc.actions.create({'name':'Test'})
                .then((x) => {
                    expect(x).to.exist;
                    expect(x.url).to.be.equal('/action');
                    expect(x.method).to.be.equal('POST');
                    expect(x.token).to.be.equal(token);
                    done();
                });
        });
    });

    suite('Edit', () => {
        test('Success', (done) => {
            myacc.actions.edit('xxx', {'name':'Another Test'})
                .then((x) => {
                    expect(x).to.exist;
                    expect(x.url).to.be.equal('/action/xxx');
                    expect(x.method).to.be.equal('PUT');
                    expect(x.token).to.be.equal(token);
                    done();
                });
        });
    });

    suite('Info', () => {
        test('Success', (done) => {
            myacc.actions.info('xxx')
                .then((x) => {
                    expect(x).to.exist;
                    expect(x.url).to.be.equal('/action/xxx');
                    expect(x.method).to.be.equal('GET');
                    expect(x.token).to.be.equal(token);
                    done();
                });
        });

        test('Error', (done) => {
            myacc.actions.info('')
                .catch((x) => {
                    expect(x).to.be.equal('Action ID parameter is obrigatory.');
                    done();
                });
        });
    });

    suite('Delete', () => {
        test('Success', (done) => {
            myacc.actions.delete('xxx')
                .then((x) => {
                    expect(x).to.exist;
                    expect(x.url).to.be.equal('/action/xxx');
                    expect(x.method).to.be.equal('DELETE');
                    expect(x.token).to.be.equal(token);
                    done();
                });
        });

    });
});
