# mr-blur-in

Reusable blur-word animation utility for Webflow (and any HTML project).

## Classes

- `.js-blur-words`: runs once on page load.
- `.blur-in`: runs once when entering viewport.

## Local Files

- `blur-words.css`: minimal class styles for production use.
- `blur-words.js`: animation logic (same as `script.js`).

## Webflow Setup

1. Add GSAP and ScrollTrigger in Project Settings > Custom Code (Head or Before `</body>`):

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
```

2. After this repo is pushed to GitHub, reference the files:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/<your-github-user>/mr-blur-in@main/blur-words.css" />
<script src="https://cdn.jsdelivr.net/gh/<your-github-user>/mr-blur-in@main/blur-words.js"></script>
```

3. In the Webflow Designer, apply classes to any text element:

- `js-blur-words`
- `blur-in`

## Re-init (if content is injected dynamically)

```html
<script>
  window.MrBlurIn && window.MrBlurIn.init();
</script>
```
