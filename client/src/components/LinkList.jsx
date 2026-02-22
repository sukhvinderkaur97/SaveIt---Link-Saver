import { useState } from "react";
import API from "../api";

function LinkList({ links, fetchLinks, categories }) {
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editUrl, setEditUrl] = useState("");
    const [editCategory, setEditCategory] = useState("General");
    const [expandedCategories, setExpandedCategories] = useState({});

    const deleteLink = async (id) => {
        await API.delete(`/links/${id}`);
        fetchLinks();
    };

    const startEdit = (link) => {
        setEditId(link._id);
        setEditName(link.name);
        setEditUrl(link.url);
        setEditCategory(link.category || "General");
    };

    const saveEdit = async (id) => {
        try {
            await API.put(`/links/${id}`, {
                name: editName,
                url: editUrl,
                category: editCategory,
            });

            setEditId(null);
            fetchLinks();

        } catch (err) {
            alert(
                err.response?.data?.message || "Update failed"
            );
        }
    };

    // ✅ GROUP LINKS BY CATEGORY
    const groupedLinks = links.reduce((acc, link) => {
        const category = link.category || "General";
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(link);
        return acc;
    }, {});

    return (
        <div>
            {Object.entries(groupedLinks).map(
                ([categoryName, categoryLinks]) => {

                    const isExpanded = expandedCategories[categoryName];
                    const visibleLinks = isExpanded
                        ? categoryLinks
                        : categoryLinks.slice(0, 2);

                    return (
                        <div key={categoryName}>
                            <h2 style={{ color: "#c2185b", marginTop: "30px" }}>
                                {categoryName}
                            </h2>

                            {visibleLinks.map((link) => (
                                <div key={link._id} className="link-card">

                                    {editId === link._id ? (
                                        <>
                                            <input
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                            />

                                            <input
                                                value={editUrl}
                                                onChange={(e) => setEditUrl(e.target.value)}
                                            />

                                            <select
                                                value={editCategory}
                                                onChange={(e) => setEditCategory(e.target.value)}
                                            >
                                                {categories.map((cat, index) => (
                                                    <option key={index} value={cat}>
                                                        {cat}
                                                    </option>
                                                ))}
                                            </select>

                                            <div className="actions">
                                                <button onClick={() => saveEdit(link._id)}>
                                                    Save
                                                </button>

                                                <button onClick={() => setEditId(null)}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <h3>{link.name}</h3>

                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {link.url}
                                            </a>

                                            <div className="actions">
                                                <button onClick={() => startEdit(link)}>
                                                    Edit
                                                </button>

                                                <button onClick={() => deleteLink(link._id)}>
                                                    Delete
                                                </button>
                                            </div>
                                        </>
                                    )}

                                </div>
                            ))}

                            {categoryLinks.length > 2 && (
                                <button
                                    style={{ marginTop: "10px" }}
                                    onClick={() =>
                                        setExpandedCategories((prev) => ({
                                            ...prev,
                                            [categoryName]: !prev[categoryName],
                                        }))
                                    }
                                >
                                    {isExpanded ? "View Less" : "View All"}
                                </button>
                            )}
                        </div>
                    );
                }
            )}
        </div>
    );

}

export default LinkList;