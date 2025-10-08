# Agent OS Shared Module E2E Testing Standards

> **Version**: 1.0  
> **Last Updated**: August 2025  
> **Scope**: Global standards for shared module E2E testing in Angular v20+ Nx workspaces with Playwright  
> **Technology Stack**: Angular v20+ (Zoneless) + Nx + Playwright

This file is part of the Agent OS standards system. These global best practices are referenced by all product codebases and provide default development guidelines for **shared module E2E testing only**. Individual projects may extend or override these practices in their `.agent-os/product/dev-best-practices-shared-e2e.md` file.

## 1. Core Principles for Shared Module Testing

### 1.1 Shared Module Testing Philosophy
- **Component-Centric**: Focus on testing individual shared components in isolation
- **Integration Testing**: Verify components work correctly when integrated into host applications
- **API Contract Testing**: Ensure component inputs, outputs, and public APIs work as documented
- **Reusability Validation**: Test components across different usage scenarios and configurations

### 1.2 Zoneless Considerations
- Components use signal-based change detection instead of Zone.js
- Tests must account for manual change detection triggering
- Async operations require explicit waiting strategies
- Component state changes are immediate with signals

## 2. Nx Workspace Structure for Shared Module E2E

### 2.1 Required Directory Structure
```
workspace-root/
├── shared/
│   ├── [component-name]/                        # Shared component library
│   │   ├── src/
│   │   ├── project.json
│   │   └── README.md
│   └── [component-name]-testing/                # Testing utilities library
│       ├── src/
│       │   ├── lib/
│       │   │   ├── page-objects/
│       │   │   ├── fixtures/
│       │   │   └── test-utils/
│       └── project.json
├── apps-e2e-showcase/
│   └── [component-name]/                        # E2E tests with embedded test app
│       ├── src/
│       │   ├── fixtures/
│       │   ├── page-objects/
│       │   ├── test-utils/
│       │   ├── test-app/                        # Minimal test application
│       │   │   ├── app/
│       │   │   │   ├── pages/
│       │   │   │   │   ├── examples/
│       │   │   │   │   ├── api-demo/
│       │   │   │   │   ├── configurations/
│       │   │   │   │   └── accessibility/
│       │   │   │   ├── app.component.ts
│       │   │   │   ├── app.routes.ts
│       │   │   │   └── app.config.ts
│       │   │   ├── main.ts
│       │   │   └── index.html
│       │   └── specs/
│       │       ├── component/
│       │       ├── integration/
│       │       ├── accessibility/
│       │       ├── visual/
│       │       └── performance/
│       ├── playwright.config.ts
│       └── project.json
```

### 2.2 Nx Project Configuration
**shared/[component]/project.json:**
```json
{
  "name": "shared-button",
  "sourceRoot": "shared/button/src",
  "projectType": "library",
  "targets": {
    "build": {
      "executor": "@nx/angular:ng-packagr-lite",
      "outputs": ["{workspaceRoot}/dist/shared/button"]
    },
    "test": {
      "executor": "@nx/jest:jest"
    },
    "lint": {
      "executor": "@nx/eslint:lint"
    }
  },
  "tags": ["scope:shared", "type:ui"]
}
```

**apps-e2e-showcase/[component]/project.json:**
```json
{
  "name": "button-e2e",
  "sourceRoot": "apps-e2e-showcase/button/src",
  "projectType": "application",
  "targets": {
    "build-test-app": {
      "executor": "@nx/angular:webpack-browser",
      "outputs": ["{workspaceRoot}/dist/apps-e2e-showcase/button"],
      "options": {
        "outputPath": "dist/apps-e2e-showcase/button",
        "index": "apps-e2e-showcase/button/src/test-app/index.html",
        "main": "apps-e2e-showcase/button/src/test-app/main.ts",
        "polyfills": [],
        "tsConfig": "apps-e2e-showcase/button/tsconfig.app.json",
        "assets": [
          "apps-e2e-showcase/button/src/test-app/assets"
        ],
        "styles": [
          "apps-e2e-showcase/button/src/test-app/styles.scss"
        ]
      }
    },
    "serve-test-app": {
      "executor": "@nx/angular:webpack-dev-server",
      "defaultConfiguration": "development",
      "options": {
        "buildTarget": "button-e2e:build-test-app"
      },
      "configurations": {
        "development": {
          "buildTarget": "button-e2e:build-test-app:development"
        }
      }
    },
    "e2e": {
      "executor": "@nx/playwright:playwright",
      "outputs": ["{workspaceRoot}/dist/.playwright"],
      "options": {
        "config": "apps-e2e-showcase/button/playwright.config.ts"
      }
    },
    "e2e-dev": {
      "executor": "nx:run-commands",
      "options": {
        "commands": [
          "nx serve-test-app button-e2e --port=4200",
          "nx e2e button-e2e --ui"
        ],
        "parallel": true
      }
    }
  },
  "tags": ["scope:shared-e2e", "type:e2e"]
}
```

## 3. Angular v20+ Zoneless Configuration

### 3.1 Embedded Test App Configuration
**apps-e2e-showcase/[component]/src/test-app/app/app.config.ts:**
```typescript
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(), // Zoneless mode
    provideRouter(routes),
    // Add other providers
  ],
};
```

### 3.2 Test App Routes
**apps-e2e-showcase/[component]/src/test-app/app/app.routes.ts:**
```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/examples', pathMatch: 'full' },
  { 
    path: 'examples', 
    loadComponent: () => import('./pages/examples/examples.component').then(m => m.ExamplesComponent)
  },
  { 
    path: 'configurations', 
    loadComponent: () => import('./pages/configurations/configurations.component').then(m => m.ConfigurationsComponent)
  },
  { 
    path: 'accessibility', 
    loadComponent: () => import('./pages/accessibility/accessibility.component').then(m => m.AccessibilityComponent)
  }
];
```

### 3.3 Signal-Based Component Testing
```typescript
// Example shared component with signals (in shared/[component])
@Component({
  selector: 'shared-button',
  template: `
    <button 
      [class]="buttonClasses()"
      [disabled]="disabled()"
      (click)="handleClick()"
      data-testid="shared-button">
      {{ label() }}
    </button>
  `
})
export class SharedButtonComponent {
  label = input.required<string>();
  variant = input<'primary' | 'secondary'>('primary');
  disabled = input<boolean>(false);
  
  clicked = output<void>();
  
  protected buttonClasses = computed(() => 
    `btn btn-${this.variant()} ${this.disabled() ? 'disabled' : ''}`
  );
  
  protected handleClick(): void {
    if (!this.disabled()) {
      this.clicked.emit();
    }
  }
}
```

## 4. Playwright Configuration for Shared Modules

### 4.1 Playwright Config Template
**apps-e2e-showcase/[component]/playwright.config.ts:**
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/specs',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['junit', { outputFile: 'dist/junit.xml' }],
    ['json', { outputFile: 'dist/test-results.json' }]
  ],
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    }
  ],
  webServer: {
    command: 'nx serve-test-app button-e2e',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
```

### 4.2 Zoneless Test Utilities
**apps-e2e-showcase/[component]/src/test-utils/zoneless-helpers.ts:**
```typescript
import { Page } from '@playwright/test';

export class ZonelessTestUtils {
  /**
   * Wait for Angular signals to stabilize in zoneless mode
   */
  static async waitForSignalsToStabilize(page: Page, timeout = 5000): Promise<void> {
    await page.waitForFunction(
      () => {
        // Check if Angular is ready and no pending change detection
        return window.ng?.getComponent && 
               !document.querySelector('[data-testid="loading"]');
      },
      { timeout }
    );
  }

  /**
   * Trigger manual change detection for zoneless components
   */
  static async triggerChangeDetection(page: Page): Promise<void> {
    await page.evaluate(() => {
      // Trigger change detection manually in zoneless mode
      const appRef = window.ng?.getApplicationRef?.();
      if (appRef) {
        appRef.tick();
      }
    });
  }

  /**
   * Wait for signal-based state changes
   */
  static async waitForSignalChange(
    page: Page, 
    selector: string, 
    expectedValue: string,
    timeout = 5000
  ): Promise<void> {
    await page.waitForFunction(
      (args) => {
        const element = document.querySelector(args.selector);
        return element?.textContent?.includes(args.expectedValue);
      },
      { selector, expectedValue },
      { timeout }
    );
  }
}
```

## 5. Page Object Model for Shared Components

### 5.1 Base Page Object Template
**apps-e2e-showcase/[component]/src/page-objects/base-component.po.ts:**
```typescript
import { Page, Locator, expect } from '@playwright/test';
import { ZonelessTestUtils } from '../test-utils/zoneless-helpers';

export abstract class BaseComponentPageObject {
  protected page: Page;
  protected componentSelector: string;

  constructor(page: Page, componentSelector: string) {
    this.page = page;
    this.componentSelector = componentSelector;
  }

  /**
   * Navigate to component test page
   */
  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
    await ZonelessTestUtils.waitForSignalsToStabilize(this.page);
  }

  /**
   * Get the main component locator
   */
  get component(): Locator {
    return this.page.locator(this.componentSelector);
  }

  /**
   * Wait for component to be ready
   */
  async waitForReady(): Promise<void> {
    await this.component.waitFor({ state: 'visible' });
    await ZonelessTestUtils.waitForSignalsToStabilize(this.page);
  }

  /**
   * Take component screenshot for visual testing
   */
  async takeScreenshot(name: string): Promise<Buffer> {
    await this.waitForReady();
    return await this.component.screenshot({ path: `screenshots/${name}.png` });
  }
}
```

### 5.2 Specific Component Page Object
**apps-e2e-showcase/button/src/page-objects/shared-button.po.ts:**
```typescript
import { Page, Locator, expect } from '@playwright/test';
import { BaseComponentPageObject } from './base-component.po';
import { ZonelessTestUtils } from '../test-utils/zoneless-helpers';

export class SharedButtonPageObject extends BaseComponentPageObject {
  // Routes
  static readonly ROUTES = {
    examples: '/examples',
    configurations: '/configurations',
    accessibility: '/accessibility'
  } as const;

  // Component selectors
  private readonly selectors = {
    button: '[data-testid="shared-button"]',
    clickCounter: '[data-testid="click-counter"]',
    variantSelector: '[data-testid="variant-selector"]',
    disabledToggle: '[data-testid="disabled-toggle"]',
    labelInput: '[data-testid="label-input"]'
  } as const;

  constructor(page: Page) {
    super(page, '[data-testid="shared-button"]');
  }

  // Navigation methods
  async navigateToExamples(): Promise<void> {
    await this.navigateTo(SharedButtonPageObject.ROUTES.examples);
  }

  async navigateToConfigurations(): Promise<void> {
    await this.navigateTo(SharedButtonPageObject.ROUTES.configurations);
  }

  // Component locators
  get button(): Locator {
    return this.page.locator(this.selectors.button);
  }

  get clickCounter(): Locator {
    return this.page.locator(this.selectors.clickCounter);
  }

  get variantSelector(): Locator {
    return this.page.locator(this.selectors.variantSelector);
  }

  get disabledToggle(): Locator {
    return this.page.locator(this.selectors.disabledToggle);
  }

  get labelInput(): Locator {
    return this.page.locator(this.selectors.labelInput);
  }

  // Action methods
  async clickButton(): Promise<void> {
    await this.button.click();
    await ZonelessTestUtils.waitForSignalsToStabilize(this.page);
  }

  async setVariant(variant: 'primary' | 'secondary'): Promise<void> {
    await this.variantSelector.selectOption(variant);
    await ZonelessTestUtils.waitForSignalsToStabilize(this.page);
  }

  async toggleDisabled(): Promise<void> {
    await this.disabledToggle.click();
    await ZonelessTestUtils.waitForSignalsToStabilize(this.page);
  }

  async setLabel(label: string): Promise<void> {
    await this.labelInput.fill(label);
    await ZonelessTestUtils.waitForSignalsToStabilize(this.page);
  }

  // Assertion methods
  async shouldHaveLabel(expectedLabel: string): Promise<void> {
    await expect(this.button).toContainText(expectedLabel);
  }

  async shouldBeDisabled(): Promise<void> {
    await expect(this.button).toBeDisabled();
  }

  async shouldBeEnabled(): Promise<void> {
    await expect(this.button).toBeEnabled();
  }

  async shouldHaveVariantClass(variant: string): Promise<void> {
    await expect(this.button).toHaveClass(new RegExp(`btn-${variant}`));
  }

  async shouldHaveClickCount(count: number): Promise<void> {
    await expect(this.clickCounter).toContainText(count.toString());
  }

  // Visual testing
  async compareButtonSnapshot(name: string): Promise<void> {
    await expect(this.button).toHaveScreenshot(`${name}.png`);
  }
}
```

## 6. Test Categories for Shared Components

### 6.1 Component Functionality Tests
**apps-e2e-showcase/button/src/specs/component/button-functionality.spec.ts:**
```typescript
import { test, expect } from '@playwright/test';
import { SharedButtonPageObject } from '../../page-objects/shared-button.po';

test.describe('Shared Button - Core Functionality', () => {
  let buttonPO: SharedButtonPageObject;

  test.beforeEach(async ({ page }) => {
    buttonPO = new SharedButtonPageObject(page);
    await buttonPO.navigateToExamples();
  });

  test('should render with default properties', async () => {
    await buttonPO.shouldHaveLabel('Default Button');
    await buttonPO.shouldBeEnabled();
    await buttonPO.shouldHaveVariantClass('primary');
  });

  test('should handle click events', async () => {
    await buttonPO.clickButton();
    await buttonPO.shouldHaveClickCount(1);
    
    await buttonPO.clickButton();
    await buttonPO.shouldHaveClickCount(2);
  });

  test('should update label through input signal', async () => {
    const newLabel = 'Updated Label';
    await buttonPO.setLabel(newLabel);
    await buttonPO.shouldHaveLabel(newLabel);
  });

  test('should change variant styles', async () => {
    await buttonPO.setVariant('secondary');
    await buttonPO.shouldHaveVariantClass('secondary');
    
    await buttonPO.setVariant('primary');
    await buttonPO.shouldHaveVariantClass('primary');
  });

  test('should handle disabled state', async () => {
    await buttonPO.toggleDisabled();
    await buttonPO.shouldBeDisabled();
    
    // Verify click events don't fire when disabled
    await buttonPO.clickButton();
    await buttonPO.shouldHaveClickCount(0);
  });
});
```

### 6.2 Integration Tests
**apps-e2e-showcase/button/src/specs/integration/component-integration.spec.ts:**
```typescript
import { test, expect } from '@playwright/test';
import { SharedButtonPageObject } from '../../page-objects/shared-button.po';

test.describe('Shared Button - Integration Tests', () => {
  let buttonPO: SharedButtonPageObject;

  test.beforeEach(async ({ page }) => {
    buttonPO = new SharedButtonPageObject(page);
  });

  test('should work within Angular forms', async () => {
    await buttonPO.navigateTo('/examples/form-integration');
    
    // Test form submission
    await buttonPO.page.locator('[data-testid="form-input"]').fill('test data');
    await buttonPO.clickButton();
    
    await expect(buttonPO.page.locator('[data-testid="form-result"]'))
      .toContainText('Form submitted with: test data');
  });

  test('should integrate with Angular routing', async () => {
    await buttonPO.navigateTo('/examples/navigation');
    
    await buttonPO.clickButton();
    
    await expect(buttonPO.page).toHaveURL(/\/examples\/target-page/);
  });

  test('should work with Angular services', async () => {
    await buttonPO.navigateTo('/examples/service-integration');
    
    await buttonPO.clickButton();
    
    await expect(buttonPO.page.locator('[data-testid="service-data"]'))
      .toContainText('Data loaded from service');
  });
});
```

### 6.3 Accessibility Tests
**apps-e2e-showcase/button/src/specs/accessibility/button-a11y.spec.ts:**
```typescript
import { test, expect } from '@playwright/test';
import { SharedButtonPageObject } from '../../page-objects/shared-button.po';
import AxeBuilder from '@axe-core/playwright';

test.describe('Shared Button - Accessibility', () => {
  let buttonPO: SharedButtonPageObject;

  test.beforeEach(async ({ page }) => {
    buttonPO = new SharedButtonPageObject(page);
    await buttonPO.navigateToAccessibility();
  });

  test('should meet WCAG 2.1 AA standards', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('[data-testid="shared-button"]')
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Tab to button
    await page.keyboard.press('Tab');
    await expect(buttonPO.button).toBeFocused();
    
    // Activate with Enter
    await page.keyboard.press('Enter');
    await buttonPO.shouldHaveClickCount(1);
    
    // Activate with Space
    await page.keyboard.press('Space');
    await buttonPO.shouldHaveClickCount(2);
  });

  test('should have proper ARIA attributes', async () => {
    await expect(buttonPO.button).toHaveAttribute('type', 'button');
    
    // Test disabled state ARIA
    await buttonPO.toggleDisabled();
    await expect(buttonPO.button).toHaveAttribute('disabled');
    await expect(buttonPO.button).toHaveAttribute('aria-disabled', 'true');
  });

  test('should have sufficient color contrast', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('[data-testid="shared-button"]')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    const colorContrastViolations = accessibilityScanResults.violations
      .filter(violation => violation.id === 'color-contrast');
    
    expect(colorContrastViolations).toHaveLength(0);
  });
});
```

### 6.4 Visual Regression Tests
**apps-e2e-showcase/button/src/specs/visual/button-visual.spec.ts:**
```typescript
import { test, expect } from '@playwright/test';
import { SharedButtonPageObject } from '../../page-objects/shared-button.po';

test.describe('Shared Button - Visual Regression', () => {
  let buttonPO: SharedButtonPageObject;

  test.beforeEach(async ({ page }) => {
    buttonPO = new SharedButtonPageObject(page);
    await buttonPO.navigateToExamples();
  });

  test('should match baseline screenshots for all variants', async () => {
    // Primary variant
    await buttonPO.setVariant('primary');
    await buttonPO.compareButtonSnapshot('button-primary');
    
    // Secondary variant
    await buttonPO.setVariant('secondary');
    await buttonPO.compareButtonSnapshot('button-secondary');
  });

  test('should match baseline screenshots for states', async () => {
    // Enabled state
    await buttonPO.compareButtonSnapshot('button-enabled');
    
    // Disabled state
    await buttonPO.toggleDisabled();
    await buttonPO.compareButtonSnapshot('button-disabled');
  });

  test('should match baseline screenshots on different viewports', async ({ page }) => {
    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await buttonPO.compareButtonSnapshot('button-mobile');
    
    // Tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await buttonPO.compareButtonSnapshot('button-tablet');
    
    // Desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await buttonPO.compareButtonSnapshot('button-desktop');
  });
});
```

## 7. Test Data Management for Shared Components

### 7.1 Component Configuration Fixtures
**apps-e2e-showcase/button/src/fixtures/button-configurations.json:**
```json
{
  "variants": {
    "primary": {
      "label": "Primary Button",
      "variant": "primary",
      "disabled": false,
      "expectedClasses": ["btn", "btn-primary"]
    },
    "secondary": {
      "label": "Secondary Button", 
      "variant": "secondary",
      "disabled": false,
      "expectedClasses": ["btn", "btn-secondary"]
    }
  },
  "states": {
    "enabled": {
      "disabled": false,
      "clickable": true
    },
    "disabled": {
      "disabled": true,
      "clickable": false
    }
  },
  "testScenarios": [
    {
      "name": "Default Configuration",
      "config": {
        "label": "Default Button",
        "variant": "primary",
        "disabled": false
      },
      "expectedBehavior": {
        "clickCount": 1,
        "classes": ["btn-primary"]
      }
    }
  ]
}
```

### 7.2 Component Test Data Factory
**apps-e2e-showcase/button/src/test-utils/button-data-factory.ts:**
```typescript
export interface ButtonTestConfig {
  label: string;
  variant: 'primary' | 'secondary';
  disabled: boolean;
}

export class ButtonDataFactory {
  static createDefaultConfig(): ButtonTestConfig {
    return {
      label: 'Test Button',
      variant: 'primary',
      disabled: false
    };
  }

  static createVariantConfig(variant: 'primary' | 'secondary'): ButtonTestConfig {
    return {
      ...this.createDefaultConfig(),
      variant,
      label: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Button`
    };
  }

  static createDisabledConfig(): ButtonTestConfig {
    return {
      ...this.createDefaultConfig(),
      disabled: true,
      label: 'Disabled Button'
    };
  }

  static createRandomConfig(): ButtonTestConfig {
    const variants: ('primary' | 'secondary')[] = ['primary', 'secondary'];
    const randomVariant = variants[Math.floor(Math.random() * variants.length)];
    
    return {
      label: `Random Button ${Date.now()}`,
      variant: randomVariant,
      disabled: Math.random() > 0.5
    };
  }
}
```

## 8. Performance Testing for Shared Components

### 8.1 Component Performance Tests
**apps-e2e-showcase/button/src/specs/performance/button-performance.spec.ts:**
```typescript
import { test, expect } from '@playwright/test';
import { SharedButtonPageObject } from '../../page-objects/shared-button.po';

test.describe('Shared Button - Performance', () => {
  let buttonPO: SharedButtonPageObject;

  test.beforeEach(async ({ page }) => {
    buttonPO = new SharedButtonPageObject(page);
  });

  test('should render quickly in zoneless mode', async ({ page }) => {
    const startTime = performance.now();
    
    await buttonPO.navigateToExamples();
    await buttonPO.waitForReady();
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    expect(renderTime).toBeLessThan(1000); // Should render within 1 second
  });

  test('should handle rapid signal updates efficiently', async ({ page }) => {
    await buttonPO.navigateToExamples();
    
    const startTime = performance.now();
    
    // Rapidly update the button label 100 times
    for (let i = 0; i < 100; i++) {
      await buttonPO.setLabel(`Label ${i}`);
    }
    
    const endTime = performance.now();
    const updateTime = endTime - startTime;
    
    expect(updateTime).toBeLessThan(5000); // Should complete within 5 seconds
    await buttonPO.shouldHaveLabel('Label 99');
  });

  test('should handle many click events efficiently', async ({ page }) => {
    await buttonPO.navigateToExamples();
    
    const startTime = performance.now();
    
    // Click button 50 times rapidly
    for (let i = 0; i < 50; i++) {
      await buttonPO.clickButton();
    }
    
    const endTime = performance.now();
    const clickTime = endTime - startTime;
    
    expect(clickTime).toBeLessThan(3000); // Should complete within 3 seconds
    await buttonPO.shouldHaveClickCount(50);
  });
});
```

## 9. CI/CD Integration for Shared Module E2E

### 9.1 Nx Target Configuration
**Root package.json scripts:**
```json
{
  "scripts": {
    "e2e:shared:all": "nx run-many --target=e2e --projects=*-e2e",
    "e2e:shared:critical": "nx run-many --target=e2e --projects=*-e2e --grep='@critical'",
    "e2e:shared:dev": "nx run-many --target=e2e-dev --projects=*-e2e",
    "e2e:button": "nx e2e button-e2e",
    "e2e:button:dev": "nx e2e-dev button-e2e"
  }
}
```

### 9.2 GitHub Actions Workflow
**.github/workflows/shared-modules-e2e.yml:**
```yaml
name: Shared Modules E2E Tests

on:
  pull_request:
    paths: 
      - 'shared/**'
      - 'apps-e2e-showcase/**'
  push:
    branches: [main, develop]

jobs:
  detect-changes:
    runs-on: ubuntu-latest
    outputs:
      shared-modules: ${{ steps.changes.outputs.shared-modules }}
    steps:
      - uses: actions/checkout@v4
      - uses: dorny/paths-filter@v2
        id: changes
        with:
          filters: |
            shared-modules:
              - 'shared/**'
              - 'apps-e2e-showcase/**'

  e2e-shared-modules:
    needs: detect-changes
    if: needs.detect-changes.outputs.shared-modules == 'true'
    runs-on: ubuntu-latest
    strategy:
      matrix:
        browser: [chromium, firefox, webkit]
        shard: [1/4, 2/4, 3/4, 4/4]
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
          
      - run: npm ci
      
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
        
      - name: Build shared libraries and test apps
        run: |
          nx run-many --target=build --projects=*shared* --exclude=*e2e*
          nx run-many --target=build-test-app --projects=*-e2e
        
      - name: Run E2E tests
        run: nx run-many --target=e2e --projects=*-e2e --shard=${{ matrix.shard }} --browser=${{ matrix.browser }}
        
      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report-${{ matrix.browser }}-${{ matrix.shard }}
          path: |
            apps-e2e-showcase/*/playwright-report/
            apps-e2e-showcase/*/test-results/
```

## 10. Component API Testing Standards

### 10.1 Input/Output Testing
**apps-e2e-showcase/button/src/specs/component/button-api.spec.ts:**
```typescript
import { test, expect } from '@playwright/test';
import { SharedButtonPageObject } from '../../page-objects/shared-button.po';
import { ButtonDataFactory } from '../../test-utils/button-data-factory';

test.describe('Shared Button - API Contract', () => {
  let buttonPO: SharedButtonPageObject;

  test.beforeEach(async ({ page }) => {
    buttonPO = new SharedButtonPageObject(page);
    await buttonPO.navigateToConfigurations();
  });

  test('should accept all required inputs', async () => {
    const config = ButtonDataFactory.createDefaultConfig();
    
    await buttonPO.setLabel(config.label);
    await buttonPO.setVariant(config.variant);
    
    await buttonPO.shouldHaveLabel(config.label);
    await buttonPO.shouldHaveVariantClass(config.variant);
  });

  test('should emit click events correctly', async ({ page }) => {
    let clickEventFired = false;
    
    // Listen for component output events
    await page.evaluate(() => {
      const button = document.querySelector('[data-testid="shared-button"]');
      button?.addEventListener('clicked', () => {
        window.testClickEventFired = true;
      });
    });
    
    await buttonPO.clickButton();
    
    const eventFired = await page.evaluate(() => window.testClickEventFired);
    expect(eventFired).toBe(true);
  });

  test('should handle input validation', async () => {
    // Test invalid variant (should fallback to default)
    await page.evaluate(() => {
      const component = window.ng?.getComponent(
        document.querySelector('[data-testid="shared-button"]')
      );
      if (component) {
        component.variant.set('invalid-variant' as any);
      }
    });
    
    await buttonPO.shouldHaveVariantClass('primary'); // Should fallback to default
  });
});
```

## 11. Error Handling and Debugging

### 11.1 Zoneless Error Handling
**apps-e2e-showcase/[component]/src/test-utils/error-handler.ts:**
```typescript
import { Page } from '@playwright/test';

export class ZonelessErrorHandler {
  static async setupErrorCollection(page: Page): Promise<void> {
    await page.addInitScript(() => {
      window.testErrors = [];
      
      // Capture Angular errors
      window.addEventListener('error', (event) => {
        window.testErrors.push({
          type: 'javascript',
          message: event.message,
          stack: event.error?.stack,
          timestamp: Date.now()
        });
      });
      
      // Capture unhandled promise rejections
      window.addEventListener('unhandledrejection', (event) => {
        window.testErrors.push({
          type: 'unhandled-promise',
          message: event.reason?.message || event.reason,
          timestamp: Date.now()
        });
      });
    });
  }

  static async getCollectedErrors(page: Page): Promise<any[]> {
    return await page.evaluate(() => window.testErrors || []);
  }

  static async assertNoErrors(page: Page): Promise<void> {
    const errors = await this.getCollectedErrors(page);
    if (errors.length > 0) {
      throw new Error(`Found ${errors.length} errors: ${JSON.stringify(errors, null, 2)}`);
    }
  }
}
```

### 11.2 Debug Utilities
**apps-e2e-showcase/[component]/src/test-utils/debug-helpers.ts:**
```typescript
import { Page } from '@playwright/test';

export class DebugHelpers {
  static async logComponentState(page: Page, componentSelector: string): Promise<void> {
    const state = await page.evaluate((selector) => {
      const element = document.querySelector(selector);
      const component = window.ng?.getComponent(element);
      
      if (!component) return null;
      
      return {
        inputs: {
          label: component.label?.(),
          variant: component.variant?.(),
          disabled: component.disabled?.()
        },
        classes: element?.className,
        attributes: Array.from(element?.attributes || []).reduce((acc, attr) => {
          acc[attr.name] = attr.value;
          return acc;
        }, {})
      };
    }, componentSelector);
    
    console.log('Component State:', JSON.stringify(state, null, 2));
  }

  static async takeDebugScreenshot(page: Page, name: string): Promise<void> {
    await page.screenshot({ 
      path: `debug-screenshots/${name}-${Date.now()}.png`,
      fullPage: true 
    });
  }

  static async logPageConsole(page: Page): Promise<void> {
    page.on('console', msg => {
      console.log(`Browser Console [${msg.type()}]:`, msg.text());
    });
  }
}
```

## 12. Documentation Requirements

### 12.1 Shared Module E2E README Template
**apps-e2e-showcase/[component]/README.md:**
```markdown
# Shared [Component] E2E Tests

## Overview
End-to-end tests for the shared [component] component using Playwright in Angular v20+ zoneless mode. Includes embedded test application for component demonstration and testing.

## Quick Start
\`\`\`bash
# Run E2E tests in development mode
npm run e2e:[component]:dev

# Run E2E tests in CI mode  
npm run e2e:[component]

# Run specific test category
nx e2e [component]-e2e --grep="@critical"

# Serve test app for manual testing
nx serve-test-app [component]-e2e
\`\`\`

## Test Categories
- **Component**: Core component functionality tests
- **Integration**: Integration with Angular features tests  
- **Accessibility**: WCAG compliance and keyboard navigation tests
- **Visual**: Visual regression tests
- **Performance**: Component performance tests

## Component API Coverage
- ✅ Input signals: [list inputs]
- ✅ Output events: [list outputs]  
- ✅ Configuration options: [list configs]
- ✅ State management: [list states]

## Test App Structure
The E2E project includes an embedded test application at \`src/test-app/\` that provides:
- Component examples and demonstrations
- Various configuration scenarios
- Integration testing scenarios
- Accessibility testing pages

## Zoneless Considerations
- Uses signal-based change detection
- Manual change detection triggering in tests
- Explicit waiting for signal updates
- No Zone.js dependency

## Debugging
\`\`\`bash
# Run with UI mode for debugging
nx e2e [component]-e2e --ui

# Run with debug mode
nx e2e [component]-e2e --debug

# Serve test app for manual inspection
nx serve-test-app [component]-e2e --port=4200
\`\`\`

## Adding New Tests
1. Create page objects in \`src/page-objects/\`
2. Add test data to \`src/fixtures/\`
3. Write tests in appropriate \`src/specs/\` category
4. Use zoneless test utilities for signal handling
5. Update test app pages in \`src/test-app/\` as needed
```

## 13. Overriding Guidelines

Individual projects may override these standards by creating:
`.agent-os/product/dev-best-practices-shared-e2e.md`

### 13.1 Override Format
```markdown
# Project-Specific Shared Module E2E Standards

## Overrides
- **Section X.Y**: Custom implementation due to [reason]
- **Component Categories**: Additional component types specific to project
- **Test Data Strategy**: Custom test data management for legacy integrations

## Extensions  
- **Additional Test Tags**: Adding `@mobile-specific` for mobile component variants
- **Custom Zoneless Utilities**: Project-specific signal handling patterns
- **Performance Thresholds**: Adjusted performance requirements for complex components
```

### 13.2 Common Override Scenarios
- Custom component input/output patterns
- Project-specific accessibility requirements  
- Integration with existing design systems
- Custom performance benchmarks
- Legacy browser support requirements

---

**Note**: These standards are specifically for shared module E2E testing in Angular v20+ zoneless mode with Nx and Playwright. They should be reviewed quarterly and updated based on Angular framework changes and Playwright updates.