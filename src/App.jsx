import './App.css'
import ListTaskComponent from './components/ListTaskComponent'
import Footer from './components/Footer'
import Header from './components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Task from './components/Task'

function App() {

  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<ListTaskComponent />}/>
        <Route path='/tasks' element={<ListTaskComponent />}/>
        <Route path='/add-task' element={<Task />}/>
        <Route path='/edit-task/:id' element={<Task />}/>
        <Route path='/view-task/:id' element={<Task />}/>
        <Route path='/delete-task/:id' element={<ListTaskComponent />}/>
      
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
