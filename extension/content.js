browser.runtime.onMessage.addListener((data, sender) => {
  if (sender.id != 'edit-externally@0x16.de') {
    return false
  }

  if (data.elem == 'active') {
    var e = document.activeElement
  } else {
    var e = browser.menus.getTargetElement(data.elem)
  }

  if (e.nodeName != 'INPUT' && e.nodeName != 'TEXTAREA') {
    console.error('rpc: no text input element found')
    return false
  }

  switch (data.type) {
    case 'get':
      console.debug('rpc get:', data.elem, e.value)
      return Promise.resolve(e.value)

    case 'set':
      console.debug('rpc set', data.text)

      if (e.nodeName == 'INPUT') {
        e.value = data.text.replace(/\n/g, ' ').trim()
      } else {
        e.value = data.text
      }

      return Promise.resolve()
  }
})
