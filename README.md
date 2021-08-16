<h1 align="center">
  <a href="https://quilljs.com/" title="Quill">Quill Rich Text Editor</a>
</h1>
<p align="center">
  <a href="https://quilljs.com/" title="Quill"><img alt="Quill Logo" src="https://quilljs.com/assets/images/logo.svg" width="180"></a>
</p>


## Releases

To make a release preform the following steps:

```shell
# Edit version in package.json
npm pack
VERSION=`cat package.json | jq -r '.version'`
gh release create $VERSION shortwave-quill-$VERSION.tgz
```

## License

BSD 3-clause
