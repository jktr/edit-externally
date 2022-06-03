browser.menus.create({
  title: 'Edit with an External Editor',
  type: 'normal',
  id: 'edit-externally',
})

browser.menus.onClicked.addListener((info, tab) => {

  console.debug('targeting:', info.targetElementId)

  if (info.menuItemId != 'edit-externally' || !info.editable) {
    return
  }

  browser.tabs.sendMessage(tab.id, {
    type: 'get',
    elem: info.targetElementId,
  }).then((v) => {

    console.debug('fetched:', v)

    browser.runtime.sendNativeMessage(
      'edit_externally.native', v
    ).then((v) => {

      console.debug('updating to:', v)

      browser.tabs.sendMessage(tab.id, {
        type: 'set',
        elem: info.targetElementId,
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
})
