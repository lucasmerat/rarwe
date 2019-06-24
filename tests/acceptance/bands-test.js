import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { createBand } from 'rarwe/tests/helpers/custom-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirageTest from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | Bands', function(hooks) {
  setupApplicationTest(hooks);
  setupMirageTest(hooks);

  test('List bands', async function(assert) {
    this.server.create('band', { name: 'Spoon' });
    this.server.create('band', { name: 'Long Distance Calling' });
    await visit('/');

    assert.dom('[data-test-rr=band-link]').exists({ count: 2 }, 'All band links are rendered');
    assert.dom('[data-test-rr=band-list-item]:first-child').hasText('Spoon', 'First band link contains the band name');
  });

  test('Create a band', async function(assert) {
    this.server.logging = true;
    this.server.create('band', { name: 'U2' });

    await visit('/');
    await createBand('CRV');

    assert.dom('[data-test-rr=band-link]').exists('New band link rendered');
    assert.dom('[data-test-rr=songs-nav-item] >.active').hasText('Songs', 'The Songs tab is active');
  })
});
