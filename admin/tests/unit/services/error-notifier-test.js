import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';

module('Unit | Service | error-notifier', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    const service = this.owner.lookup('service:error-notifier');
    assert.ok(service);
  });

  test('it notifies a non-JSONAPI error as a single notification', function(assert) {
    // given
    const service = this.owner.lookup('service:error-notifier');
    const errorStub = sinon.stub();
    service.notifications = {
      error: errorStub
    };
    const anError = new Error('a generic error');

    // when
    service.notify(anError);

    // then
    assert.ok(errorStub.calledWith(anError));
  });

  test('it notifies JSONAPI bundled errors as a several notifications', function(assert) {
    // given
    const service = this.owner.lookup('service:error-notifier');
    const errorStub = sinon.stub();
    service.notifications = {
      error: errorStub
    };
    const anError = {
      errors: [
        {
          title: 'Something went wrong',
          detail: 'the provided id is invalid'
        },
        {
          title: 'Something else went wrong too !'
        }
      ]
    };

    // when
    service.notify(anError);

    // then
    assert.ok(errorStub.calledWith(
      sinon.match.has(
        'message',
        'Something went wrong : the provided id is invalid'
      )
    ));
    assert.ok(errorStub.calledWith(
      sinon.match.has(
        'message',
        'Something else went wrong too ! : undefined'
      )
    ));
  });
});
