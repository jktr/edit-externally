browser.menus.create({
  title: 'Edit with an External Editor',
  type: 'normal',
  id: 'edit-externally',
})

function edit(elementId, tabId) {
  console.debug('targeting:', elementId)

  browser.tabs.sendMessage(tabId, {
    type: 'get',
    elem: elementId,
  }).then((v) => {

    console.debug('fetched:', v)

    browser.runtime.sendNativeMessage(
      'edit_externally.native', v
    ).then((v) => {

      console.debug('updating to:', v)

      browser.tabs.sendMessage(tabId, {
        type: 'set',
        elem: elementId,
        text: v,
      }).catch((err) => {
        console.error('err', err)
        return false
      })

    }).catch((err) => {
      console.error('err', err)
      return false
    })

  }).catch((err) => {
    console.error('err', err)
    return false
  })
}

browser.commands.onCommand.addListener((cmd) => {
  console.debug('cmd', cmd)

  if (cmd != 'edit-externally') {
    return
  }

  browser.tabs.query({
    active: true,
    currentWindow: true,
  }).then((tabs) => edit('active', tabs[0].id))
    .catch((err) => consol.error(e))
})

browser.menus.onClicked.addListener((info, tab) => {
  console.debug('menu', info.targetElementId)

  if (info.menuItemId != 'edit-externally' || !info.editable) {
    return
  }

  edit(info.targetElementId, tab.id)
})
