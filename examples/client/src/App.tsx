import { Hello } from './Hello'
import { Me } from './Me'
import { User } from './User'
import { MainLayout } from './layouts'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout></MainLayout>}>
          <Route
            path="/"
            element={
              <>
                <Hello></Hello>
                <Me></Me>
              </>
            }
          ></Route>
          <Route path="/user" element={<User></User>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
