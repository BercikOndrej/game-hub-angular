// src/test-setup.ts
import '@angular/compiler';
import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';

setupTestBed();
import { beforeAll, afterEach, afterAll } from 'vitest';
import { worker } from './app/testing/mock/browser';

beforeAll(() => worker.start({ onUnhandledRequest: 'error' }));
afterEach(() => worker.resetHandlers());
afterAll(() => worker.stop());
