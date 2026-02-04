# Shared UI Components (Spartan NG Helm)

This folder contains all Spartan NG UI components that are shared across the FrontStudent application.

## Components Moved to Common

The following UI component libraries have been moved from `src/libs/ui/` to `src/app/common/libs/ui/`:

- **ui-accordion-helm** - Accordion components
- **ui-alert-helm** - Alert components
- **ui-button-helm** - Button directives
- **ui-card-helm** - Card components
- **ui-command-helm** - Command palette components
- **ui-core** - Core utilities (hlm, injectCustomClassSettable, etc.)
- **ui-dialog-helm** - Dialog/modal components
- **ui-formfield-helm** - Form field components
- **ui-hovercard-helm** - Hover card components
- **ui-icon-helm** - Icon directives
- **ui-input-helm** - Input directives
- **ui-label-helm** - Label directives
- **ui-pagination-helm** - Pagination components
- **ui-popover-helm** - Popover components
- **ui-select-helm** - Select dropdown components
- **ui-sheet-helm** - Sheet/drawer components
- **ui-skeleton-helm** - Skeleton loader components
- **ui-sonner-helm** - Toast notification components
- **ui-tabs-helm** - Tab components

## Import Path Changes

**Before:**
```typescript
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmDialogComponent } from '@spartan-ng/ui-dialog-helm';
```

**After:**
```typescript
import { HlmButtonDirective } from './common/libs/ui/ui-button-helm/src';
import { HlmDialogComponent } from './common/libs/ui/ui-dialog-helm/src';
```

## Internal Component Changes

All internal cross-references between UI components now use relative paths instead of `@spartan-ng` package imports. For example:

- `@spartan-ng/ui-core` → `../../../ui-core/src`
- `@spartan-ng/ui-icon-helm` → `../../../ui-icon-helm/src`

## Benefits

1. **Code Reusability** - Components can be shared across FrontStudent, FrontAdmin, and FrontTeacher
2. **Consistency** - Single source of truth for UI components
3. **Easier Maintenance** - Updates to components only need to be made once
4. **Better Organization** - Clear separation of shared vs app-specific code

## Theming

Theme-specific configurations (colors, CSS variables) remain in each app's:
- `tailwind.config.js` - For primary color definitions
- `styles.scss` - For CSS variable overrides

## Note

These components still depend on `@spartan-ng/brain/*` packages for base functionality. Only the `helm` (styled) components have been moved to common.
