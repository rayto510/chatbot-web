import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Apps from './pages/Apps';
import Documents from './pages/Documents';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/apps" replace />} />
        <Route path="/apps" element={<Apps />} />
        <Route path="/documents" element={<Documents />} />
      </Route>
    </Routes>
  );
}
