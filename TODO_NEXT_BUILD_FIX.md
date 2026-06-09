# TODO_NEXT_BUILD_FIX

## Info gathered
- Next.js build fails during prerendering with message about `useSearchParams()` needing a suspense boundary and failing pages: `/ipd` and `/patients`.
- Both `src/app/(main)/ipd/page.tsx` and `src/app/(main)/patients/page.tsx` are `"use client"` pages and they call `useSearchParams()` directly in the component.
- `src/app/(main)/layout.tsx` is also `"use client"` and it has route-protection logic using `localStorage`.

## Plan (code-level)
1. Update `src/app/(main)/patients/page.tsx`:
   - Wrap the component that calls `useSearchParams()` in its own `<Suspense>` boundary (or make it a lazily loaded client component), so Next can bail out safely.
2. Update `src/app/(main)/ipd/page.tsx` similarly:
   - Ensure the `useSearchParams()` call is inside a suspense boundary.
3. Re-run `npm run build` to confirm the prerender errors are gone.

## Dependent files to edit
- `src/app/(main)/patients/page.tsx`
- `src/app/(main)/ipd/page.tsx`

## Follow-up steps
- If build still fails for other `(main)` pages, apply the same pattern to those pages using `useSearchParams()`.

