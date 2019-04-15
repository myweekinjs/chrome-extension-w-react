import React from 'react'
import ReactDOM from 'react-dom'

const TestComponent = () => (
  <h1>I am dynamically added!</h1>
)

window.addEventListener('load', function() {

  const watch = document.getElementById('target-test')

  const observer = new MutationObserver((mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type === 'childList') {
        const target = watch.querySelector('p')
        if (target) {
          app(observer, target)
        }
      }
    }
  })

  observer.observe(watch, {
    attributes: true,
    childList: true,
    subtree: true
  })

})

const app = (observer, target) => {
  observer.disconnect()

  if (!document.getElementById('react-root-test')) {
    const parent = target.parentNode
    const root = document.createElement('div')
    root.setAttribute('id', 'react-root-test')

    parent.insertBefore(root, target)

    ReactDOM.render(<TestComponent />, document.getElementById('react-root-test'))
  }
}
