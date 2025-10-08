# Code Style Guide

> Version: 1.0.0
> Last Updated: 2025-04-24

# Angular 20+ Project Guidelines

## 🚀 General Best Practices
- Follow **Angular 20+** best practices and the official Angular style guide
- Use **Angular Signals** for all reactive features and state management
- Leverage **Standalone Components** where appropriate
- Use **Tailwind CSS v4** exclusively for styling with PostCSS
- Follow **Nx workspace** conventions for monorepo organization
- Implement **OnPush change detection** for performance optimization

## ⚡ Angular Signals & Inputs

### Signal Inputs
```typescript
// ✅ Correct - Signal input definition
propertyName = input<Type>(defaultValue);
propertyName = input.required<Type>();

// ❌ Avoid - Don't add unnecessary modifiers
public readonly propertyName = input<Type>(defaultValue);
```

### Signal State Management
```typescript
// ✅ Use signals for component state
count = signal(0);
items = signal<Item[]>([]);
isLoading = signal(false);

// ✅ Computed signals for derived state
filteredItems = computed(() => 
  this.items().filter(item => item.active)
);
```

## 🏗️ Component Structure

### Component Decorator
```typescript
@Component({
  selector: 'lib-component-name',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './component-name.component.html'
})
```

### Access Modifiers
- **Default**: `public` (don't write explicitly)
- **Private**: For class-only variables not used in templates
- **Protected**: For template variables not needed outside the component

```typescript
// ✅ Correct access modifier usage
export class ExampleComponent {
  // Public by default - used in template
  title = signal('Hello');
  
  // Protected - used in template but not externally
  protected isVisible = signal(true);
  
  // Private - only used within class
  private apiService = inject(ApiService);
}
```

## 🎨 Template Syntax & Control Flow

### New Control Flow (Required)
```html
<!-- ✅ Use new control flow syntax -->
@if (isVisible()) {
  <div>Content is visible</div>
}

@for (item of items(); track item.id) {
  <div>{{ item.name }}</div>
}

@switch (status()) {
  @case ('loading') {
    <div>Loading...</div>
  }
  @case ('success') {
    <div>Success!</div>
  }
  @default {
    <div>Default case</div>
  }
}

<!-- ❌ Never use old syntax -->
<div *ngIf="isVisible()">...</div>
<div *ngFor="let item of items()">...</div>
```

---

## 🎯 Dependency Injection

### Use @inject Decorator
```typescript
// ✅ Preferred injection method
export class ExampleComponent {
  private readonly apiService = inject(ApiService);
  private readonly  router = inject(Router);
  private readonly  fb = inject(FormBuilder);
  
  // ❌ Avoid constructor injection
  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}
}
```

## 🌐 Internationalization

### NGX-Translate Setup
```typescript
// ✅ Use @ngx-translate/core
export class ExampleComponent {
  private translate = inject(TranslateService);
  
  translateKey(key: string): string {
    return this.translate.instant(key);
  }
}
```

```html
<!-- ✅ Template usage -->
<h1>{{ 'COMMON.TITLE' | translate }}</h1>
<p [innerHTML]="'COMMON.DESCRIPTION' | translate"></p>
```

## 🎨 Tailwind CSS v4 Styling

### PostCSS Configuration
```css
/* ✅ Use Tailwind v4 features */
@import "tailwindcss";

/* ✅ Custom utilities with v4 syntax */
@utility screen-sm {
  @media (min-width: 640px) {
    @content;
  }
}
```

### Component Styling
```html
<!-- ✅ Use only Tailwind classes -->
<div class="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md">
  <h2 class="text-xl font-semibold text-gray-800">Title</h2>
  <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
    Action
  </button>
</div>

<!-- ✅ Responsive design -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Content -->
</div>
```

---

## 📁 File Naming Conventions

### Components
```
src/
├── lib/
│   ├── components/
│   │   ├── form-input/
│   │   │   ├── form-input.component.ts
│   │   │   ├── form-input.component.html
│   │   │   └── index.ts
│   │   └── data-table/
│   │       ├── data-table.component.ts
│   │       ├── data-table.component.html
│   │       └── index.ts
```

### Services & Models
```
├── services/
│   ├── api.service.ts
│   ├── auth.service.ts
│   └── user-management.service.ts
├── models/
│   ├── user.model.ts
│   ├── api-response.model.ts
│   └── form-config.model.ts
```

### Nx Workspace Structure
```
apps/
├── web-app/
├── admin-dashboard/
└── mobile-app/

libs/
├── shared/
│   ├── ui/
│   ├── data-access/
│   └── utils/
├── feature/
│   ├── auth/
│   ├── dashboard/
│   └── user-management/
```

---

## 📝 Code Formatting Rules

### TypeScript/Angular
```typescript
// ✅ Interface naming
export interface UserData {
  id: string;
  name: string;
  email: string;
}

// ✅ Enum naming
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

// ✅ Component class naming
export class UserProfileComponent implements OnInit {
  // Signal properties first
  userData = input.required<UserData>();
  isEditing = signal(false);
  
  // Computed signals
  displayName = computed(() => this.userData().name);
  
  // Injected services
  private userService = inject(UserService);
  private router = inject(Router);
  
  // Lifecycle methods
  ngOnInit(): void {
    // Implementation
  }
  
  // Public methods
  onEditToggle(): void {
    this.isEditing.update(value => !value);
  }
  
  // Private methods
  private validateForm(): boolean {
    // Implementation
    return true;
  }
}
```

### Selector Naming
```typescript
// ✅ Library components
@Component({
  selector: 'lib-form-input'
})

@Component({
  selector: 'lib-data-table'
})

// ✅ App-specific components
@Component({
  selector: 'app-user-profile'
})

@Component({
  selector: 'app-dashboard-widget'
})
```

---

## 🔧 Nx Configuration

### Workspace Conventions
- **Apps**: Contains deployable applications
- **Libs**: Contains reusable libraries and features
- **Shared libs**: Common utilities, UI components, data access
- **Feature libs**: Business logic grouped by domain

### Import Paths
```typescript
// ✅ Use Nx path mapping
import { UserService } from '@my-workspace/shared/data-access';
import { ButtonComponent } from '@my-workspace/shared/ui';
import { AuthFeatureModule } from '@my-workspace/feature/auth';

// ❌ Avoid relative imports for cross-library dependencies
import { UserService } from '../../../shared/data-access/src/lib/user.service';
```

## 📋 Additional Preferences

### Form Handling
```typescript
// ✅ Reactive forms with signals
export class UserFormComponent {
  private fb = inject(FormBuilder);
  
  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });
  
  formData = toSignal(this.userForm.valueChanges);
}
```

### Error Handling
```typescript
// ✅ Consistent error handling
export class DataService {
  private http = inject(HttpClient);
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users').pipe(
      catchError(this.handleError)
    );
  }
  
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong'));
  }
}
```

## 🔄 State Management

### Signal-based State
```typescript
// ✅ Simple component state with signals
export class TodoListComponent {
  todos = signal<Todo[]>([]);
  filter = signal<'all' | 'active' | 'completed'>('all');
  
  filteredTodos = computed(() => {
    const todos = this.todos();
    const filter = this.filter();
    
    switch (filter) {
      case 'active': return todos.filter(t => !t.completed);
      case 'completed': return todos.filter(t => t.completed);
      default: return todos;
    }
  });
  
  addTodo(text: string): void {
    this.todos.update(todos => [...todos, { id: Date.now(), text, completed: false }]);
  }
  
  toggleTodo(id: number): void {
    this.todos.update(todos =>
      todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    );
  }
}
```

### Service-based Global State
```typescript
// ✅ Global state service with signals
@Injectable({ providedIn: 'root' })
export class AppStateService {
  private _user = signal<User | null>(null);
  private _loading = signal(false);
  
  readonly user = this._user.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);
  
  setUser(user: User | null): void {
    this._user.set(user);
  }
  
  setLoading(loading: boolean): void {
    this._loading.set(loading);
  }
}
```

## ⚡ Performance Optimization

### OnPush Strategy
```typescript
// ✅ Always use OnPush with signals
@Component({
  selector: 'lib-optimized-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (data(); as items) {
      @for (item of items; track item.id) {
        <div>{{ item.name }}</div>
      }
    }
  `
})
export class OptimizedComponent {
  data = input.required<Item[]>();
}
```

### Lazy Loading
```typescript
// ✅ Feature module lazy loading
const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('@my-workspace/feature/dashboard').then(m => m.DashboardModule)
  },
  {
    path: 'users',
    loadComponent: () => import('./user-list/user-list.component').then(c => c.UserListComponent)
  }
];
```

## 🧪 Testing Guidelines

### Component Testing
```typescript
// ✅ Signal-aware testing
describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [CommonModule]
    });
    
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
  });
  
  it('should update display name when user data changes', () => {
    // Set signal input
    fixture.componentRef.setInput('userData', { id: '1', name: 'John Doe', email: 'john@example.com' });
    fixture.detectChanges();
    
    expect(component.displayName()).toBe('John Doe');
  });
  
  it('should toggle editing state', () => {
    expect(component.isEditing()).toBe(false);
    
    component.onEditToggle();
    
    expect(component.isEditing()).toBe(true);
  });
});
```

### Service Testing
```typescript
// ✅ Service testing with signals
describe('AppStateService', () => {
  let service: AppStateService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppStateService);
  });
  
  it('should update user state', () => {
    const testUser: User = { id: '1', name: 'Test User', email: 'test@example.com' };
    
    service.setUser(testUser);
    
    expect(service.user()).toEqual(testUser);
    expect(service.isAuthenticated()).toBe(true);
  });
});
```

### E2E Testing
- Each shared library must be tested independently.
- Create a comprehnsive command which run test app from that module and run e2e tests