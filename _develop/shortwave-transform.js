function isParchmentOrQuillDelta(importStatement) {
  switch (importStatement.source.value) {
    case "quill-delta":
    case "parchment":
      return true;
    default:
      return false;
  }
}

function addShortwaveScope(nodePath) {
    const importStatement = nodePath.node;
    const moduleName = importStatement.source.value;
    importStatement.source.value = `@shortwave/${moduleName}`;
}

/**
 * A codemod to rewrite quill-delta and parchment imports to have the @shortwave scope prefix.
 *
 * See: https://github.com/facebook/jscodeshift/
 */
module.exports = function(fileInfo, api) {
  return api.jscodeshift(fileInfo.source)
    .find('ImportDeclaration', isParchmentOrQuillDelta)
    .forEach(addShortwaveScope)
    .toSource();
}
