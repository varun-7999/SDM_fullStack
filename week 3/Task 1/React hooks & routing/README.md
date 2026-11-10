# Orbit UI

Orbit UI is a small, dependency-free component library demo containing reusable Button, Card, and Modal components.

## Components

### Button

Use the shared `.button` class with a variant:

```html
<button class="button button-primary">Save changes</button>
<button class="button button-secondary">Cancel</button>
```

Available variants are `button-primary`, `button-secondary`, `button-ghost`, and `button-danger`.

### Card

Cards use `.card` as the base and can add `.card-accent` for an emphasis surface:

```html
<article class="card">
  <h3>Card title</h3>
  <p>Supporting content.</p>
</article>
```

### Modal

The modal uses the native accessible `<dialog>` element:

```html
<dialog id="modal">...</dialog>
<button onclick="modal.showModal()">Open modal</button>
```

`script.js` wires open, close, cancel, and confirm actions. Open `index.html` in a browser to view the component showcase.
