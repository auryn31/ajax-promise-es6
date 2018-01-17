import chai from 'chai';
import Ajax from '../index.js';

chai.should();

describe('Ajax', () => {
  describe('#get', () => {
    let ajax;

    beforeEach(() => {
      ajax = new Ajax();
    });

    it('async shoud be true', () => {
      ajax.async.should.equal(true);
    });

    it('timeout shoud be 3s', () => {
      ajax.timeout.should.equal(3);
    });

    it('timeout shoud be 60s', () => {
      ajax = new Ajax(true, 60);
      ajax.timeout.should.equal(60);
    });

    it('shoud be synchron', () => {
      ajax = new Ajax(false);
      ajax.async.should.equal(false);
    });

    it('shoud be synchron', () => {
      ajax = new Ajax(false);
      ajax.get("https://jsonplaceholder.typicode.com/posts/1")
        .then(result => result.should.not.be("undefined"))
        .catch(error => error.should.be.a("error"));
    });
  });
});
