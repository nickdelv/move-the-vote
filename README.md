# Move the Vote

Canton, MA civic initiative site — movethevote.info

## About

Static HTML/CSS/JS site for the Canton Residents to Move the Vote campaign,
supporting Senate Bill S.2605 to move Canton's local elections from April to November.

## Project Structure

```
index.html          Main (and only) page
css/
  shared.css        Tokens, reset, layout primitives, reusable components
  index.css         Page-specific layout and section styles
js/
  site.js           Shared behavior: nav toggle, sticky offset sync
  index.js          Page-specific: FAQ accordion, scroll animations
assets/
  images/           Logo and media assets
```

## Architecture Notes

- Spacing uses `--sp-2xl` / `--sp-xl` / `--sp-lg` / `--sp-md` / `--sp-sm` tokens.
- `--pad-x` controls horizontal padding and scales via responsive `:root` overrides.
- All shared CSS lives in `shared.css`. Page-specific in `index.css`.
- All shared JS lives in `site.js`. Page-specific in `index.js`.
- No build step, no framework, no dependencies.

## Cache Busting

Query string versioning: `?v=1.0`

Bump the version string on all four asset references in `index.html` when deploying
CSS or JavaScript changes.

```html
<link rel="stylesheet" href="css/shared.css?v=1.0" />
<link rel="stylesheet" href="css/index.css?v=1.0" />
<script src="js/site.js?v=1.0"></script>
<script src="js/index.js?v=1.0"></script>
```

## Content Notes

- Legislator and committee email addresses should be verified against
  malegislature.gov before launch.
- Timeline step states (`is-done`, `is-active`, `is-future`) are set in HTML —
  update manually as the bill progresses.
- Alert strip content reflects the current legislative status; update when the
  committee vote occurs.
