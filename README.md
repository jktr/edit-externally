# edit-externally

This is an experiment; it has only been tested with Firefox v100.0.2.

This repository contains a web extension that allows you to edit
the contents of `<input>` and `<textarea>` html tags with
a proper external editor. Both a right-click menu item and a
keyboard shortcut (`Alt+Shift+U`) are provided for this.

When triggered, the background script fetches the content of the
clicked (menu) or focused (shortcut) html text input element from
the content script running inside the page over RPC. The
background script then sends that content to a native messaging
component. This component creates a temporary file, fills it with
the received content, and invokes an editor on that file in a
terminal. When the editor is closed, the new content of the
temporary file is sent to the background script by the native
component and the temporary file is cleaned up. Finally, the
background script makes another RPC call to the content script
asking it to update the content of the original html element to
the new content received from the native component.

To install this, you will need to set up both the browser
extension and the native messaging component. The extension can
be temporarily loaded by pointing `about:debugging` at the
`manifest.json` file. Setting up the native messaging component
requires creating a symlink pointing to the app manifest at
`~/.mozilla/native-messaging-hosts/edit_externally.native.json`
and updating the absolute path therein to point to the `main`
script.

The terminal and editor this uses default to `xterm` and `nano`
respectively, but you can override this by setting the `TERMINAL`
and `VISUAL`/`EDITOR` environment variables for your browser's
process.
