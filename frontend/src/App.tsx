import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditProduct from "components/EditProduct";
import HomePage from "components/HomePage";

import { useParams } from "react-router-dom";
import Layout from "components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="product/:id" element={<EditPageWrapper />} />
        </Route>
      </Routes>
    </Router>
  );
}
// Wrapper to extract product ID from the URL slug
const EditPageWrapper = () => {
  const params = useParams();
  return <EditProduct productId={params.id!} />;
};

export default App;
