import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import Header from '../src/components/top/Header.astro';
import LanguageSwitcher from '../src/components/top/LanguageSwitcher.vue';
import { loadTranslation } from '../src/utils/loadTranslation';
import { availableLocales } from '../src/utils/availableLocales';
import vueRenderer from "@astrojs/vue/server.js";

const t = await loadTranslation('en_us');

test('Header text', async () => {
  const container = await AstroContainer.create();
  container.addServerRenderer({renderer: vueRenderer});
  container.addClientRenderer({
    name: "@astrojs/vue",
    entrypoint: "@astrojs/vue/client.js"
});
  const header = await container.renderToString(Header, {
    props: {
      t: t,
    },
  });
  expect(header).toContain('Advertiser')
  expect(header).toContain('ENGLISH')
});

test('Header language switcher', async () => {
  const languageSwitcher = mount(LanguageSwitcher, {
    props: {
      availableLocales: availableLocales,
      currentLocale: 'en_us'
    }
  })
  const dropdownButton = languageSwitcher.find('[data-testid="language-switcher-button"]');
  expect(dropdownButton.text()).toContain('ENGLISH')
});