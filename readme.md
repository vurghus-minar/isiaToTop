# isiaToTop

### About

isiaToTop is a lightweight extendable scroll to top widget written in javascript.

### Get started

- Clone the repository to your dev server.
- Run `npm install` or `yarn install`
- Run `gulp` to compile scripts and start the dev server
- Load http://localhost:5500 in your browser to test
- Demo is served from `./demo/public` folder

### Example Use

Reference the following styles in your html header:

```html
<link rel="stylesheet" href="path_to_css_folder/isiaToTop.css" />
```

Reference the following script in your html footer:

```html
<script src="path_to_js_folder/isiaToTop.js" type="text/javascript"></script>
```

Initialize the script as follows in the footer

```html
<script type="text/javascript">
  isiaToTop.active(
    scrollStartPosition: 20,
    toTopElement: 'isiaToTop',
    scrollAnimationSpeed: 1000
  )
</script>
```

### API Usage

Use the API as follows to attach your custom functionality

```js
isiaToTop.onClick(function() {
  console.log("bla");
});

isiaToTop.onScroll(function() {
  console.log("scrolled");
});
```
