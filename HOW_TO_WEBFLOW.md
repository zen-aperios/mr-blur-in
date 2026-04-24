# How To Use `mr-blur-in` In Webflow

This guide shows the exact setup to use `mr-blur-in` in Webflow.

## 1) Add Scripts And CSS In Webflow

In Webflow, open:
`Project Settings -> Custom Code`

Add this in `Head Code`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/<your-github-user>/mr-blur-in@main/blur-words.min.css" />
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
```

Add this in `Footer Code` (before `</body>`):

```html
<script src="https://cdn.jsdelivr.net/gh/<your-github-user>/mr-blur-in@main/blur-words.min.js"></script>
```

Replace `<your-github-user>` with your real GitHub username.

## 2) Add Classes To Text Elements

In Webflow Designer:

- Add class `js-blur-words` to text that should animate once on page load.
- Add class `blur-in` to text that should animate when scrolled into view.

You can use either class or both on different elements.

## 3) Publish And Test

- Publish your Webflow site.
- Hard refresh the page.
- Confirm blur animation runs as expected.

## 4) Re-Initialize (Optional)

If text is injected dynamically (CMS filters, AJAX, tabs, etc.), run:

```html
<script>
  window.MrBlurIn && window.MrBlurIn.init();
</script>
```

## Troubleshooting

- If nothing animates, confirm GSAP and ScrollTrigger load before `blur-words.min.js`.
- If CDN changes are not visible, bump the version reference from `@main` to a tag like `@v1.0.0`.
- If animations run too early, ensure classes are on final rendered text elements.
