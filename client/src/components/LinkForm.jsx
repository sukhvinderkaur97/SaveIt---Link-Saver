import { useState } from "react";
import API from "../api";

function LinkForm({ fetchLinks, categories, setCategories }) {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [category, setCategory] = useState("General");
    const [newCategory, setNewCategory] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !url) return;

        try {
            await API.post("/links", { name, url, category });

            setName("");
            setUrl("");
            fetchLinks();
        } catch (err) {
            setError(
                err.response?.data?.message || "Something went wrong"
            );

            // Auto remove error after 3 seconds
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    };

    const addCategory = () => {
        if (!newCategory.trim()) return;

        if (!categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
        }

        setCategory(newCategory);
        setNewCategory("");
    };

    return (
        <>
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Website Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Website URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <button type="submit">Add</button>
            </form>

            {/* Create New Category Section */}
            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Create New Category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                <button onClick={addCategory}>Create</button>
            </div>
        </>
    );
}

export default LinkForm;