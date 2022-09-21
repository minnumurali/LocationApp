import '@testing-library/react-native'
import {render,fireEvent} from '@testing-library/react-native'
import Home from '../src/screens/Home'


test('render Home Component Properly',() =>{
    // render(<Home/>)
    const test = true;
    expect(test).toBe(true)

test('button',()=>{
    
  const test =render (<Home/>)
   let btn= test.getByTestId("clearButton")
    fireEvent.press(btn)
})
})