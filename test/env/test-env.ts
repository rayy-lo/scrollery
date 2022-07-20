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
    const html = fs.readFileSync('./test/env/index.html', 'utf-8');
    const { window } = new JSDOM(html);

    this.global.page = window;
  }

  async teardown() {
    await super.teardown();
  }

  getVmContext() {
    return super.getVmContext();
  }
}

module.exports = CustomEnvironment;
