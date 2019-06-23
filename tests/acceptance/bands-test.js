import { module, test } from 'qunit';
import { visit, click, fillIn} from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirageTest from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | Bands', function(hooks) {
  setupApplicationTest(hooks);
  setupMirageTest(hooks);

  test('List bands', async function(assert) {
    this.server.create('band', { name: 'Spoon' });
    this.server.create('band', { name: 'Long Distance Calling' });
    await visit('/');

    let bandLinks = document.querySelectorAll('[data-test-rr=band-link]');
    assert.equal(bandLinks.length, 2, 'All band links are rendered');
    assert.ok(bandLinks[0].textContent.includes('Spoon'), 'First band link contains the band name');
    assert.ok(bandLinks[1].textContent.includes('Long Distance Calling'), 'Second band link contains the band name');
  });

  test('Create a band', async function(assert) {
    this.server.create('band', { name: 'U2' });

    await visit('/');
    await click('[data-test-rr=new-band-label]');
    await fillIn('[data-test-rr=new-band-input]', 'CRV');
    await click('[data-test-rr=new-band-button]');

    let bandLinks = document.querySelectorAll('[data-test-rr=band-link]');
    assert.equal(bandLinks.length, 2, 'All band links rendered', 'New band link rendered');
    assert.ok(bandLinks[0].textContent.includes('U2'), 'First band link contains correct band name');
    assert.ok(document.querySelector('[data-test-rr=songs-nav-item] >.active').textContent.includes('Songs'), 'The Songs tab is active');
  })
});
