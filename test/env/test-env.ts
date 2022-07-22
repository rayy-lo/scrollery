import { JestEnvironmentConfig, EnvironmentContext } from '@jest/environment';
import NodeEnvironment from 'jest-environment-node';
import fs from 'fs';
import { JSDOM } from 'jsdom';

class CustomEnvironment extends NodeEnvironment {
  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context);
  }

  async setup() {
    await super.setup();
    const options = {
      path: 'page',
      content: '.grid__item',
      threshold: 1
    };
    const html = fs.readFileSync('./test/env/index.html', 'utf-8');
    const { window } = new JSDOM(html);

    this.global.window = window as any;
    this.global.containerSelector = '#product-grid';
    this.global.config = options;
  }

  async teardown() {
    await super.teardown();
  }

  getVmContext() {
    return super.getVmContext();
  }
}

module.exports = CustomEnvironment;
