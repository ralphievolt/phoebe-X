import React from 'react'


const _roarCheck = () => (event) => {
    event.preventDefault()
    
    Bert.alert('Ernie has finished tubby time.', 'success', 'growl-top-right')
}

export const Page2 = () => (
    <div>
        <h3>Page 2</h3>
        <button type="button" onClick={_roarCheck(event)}>Click Me!</button>
    </div>
)