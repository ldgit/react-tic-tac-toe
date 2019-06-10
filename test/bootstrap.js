beforeEach(() => {
  global.testUtils = { changeWindowUrl };
});

function changeWindowUrl(newUrl) {
  delete global.window.location;
  global.window.location = new URL(newUrl);
}
