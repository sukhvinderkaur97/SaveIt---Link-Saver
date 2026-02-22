import { useEffect, useState } from "react";
import API from "./api";
import LinkForm from "./components/LinkForm";
import LinkList from "./components/LinkList";
import "./App.css";

function App() {
  const [links, setLinks] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchLinks = async () => {
    const res = await API.get("/links");
    setLinks(res.data);

    // Extract unique categories
    const uniqueCategories = [
      ...new Set(res.data.map((link) => link.category || "General")),
    ];

    setCategories(uniqueCategories);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div className="container">
      <h1>SaveIt - Link Saver</h1>

      <LinkForm
        fetchLinks={fetchLinks}
        categories={categories}
        setCategories={setCategories}
      />

      <LinkList
        links={links}
        fetchLinks={fetchLinks}
        categories={categories}
      />
    </div>
  );
}

export default App;