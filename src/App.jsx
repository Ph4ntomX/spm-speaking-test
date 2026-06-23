import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Part1Practice from './pages/Part1Practice'
import Part2Practice from './pages/Part2Practice'
import Part3Practice from './pages/Part3Practice'
import FullPractice from './pages/FullPractice'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="part-1" element={<Part1Practice />} />
        <Route path="part-2" element={<Part2Practice />} />
        <Route path="part-3" element={<Part3Practice />} />
        <Route path="full" element={<FullPractice />} />
      </Route>
    </Routes>
  )
}
