/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada Vale (Founder, The Human Pattern Lab)
   Assistant: Vesper (AI Lab Companion)
   File: Admin.tsx
   Purpose: The Shadow Fox Admin Den — protected interface for creating, editing, and deleting Lab Notes.
   =========================================================== */

/**
 * @file Admin.tsx
 * @author Ada Vale
 * @assistant Vesper
 * @lab-unit SCMS — Systems & Communication Meta-Structure
 * @status Active
 * @since 2025-12-20
 * @description The heart of the Admin Den, guarded by GitHub OAuth. Allows authorized users (the worthy)
 *              to forge new patterns, refine existing ones, or banish notes to the void. Shadow Fox
 *              watches over every edit, ensuring the chaos remains curated. Carmel squints at invalid slugs.
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [notes, setNotes] = useState<any[]>([]);
    const [form, setForm] = useState({
        id: '',
        title: '',
        slug: '',
        category: '',
        excerpt: '',
        read_time_minutes: 5,
        published_at: new Date().toISOString().split('T')[0],
    });
    const [editingId, setEditingId] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/admin/notes')
            .then(res => {
                if (!res.ok) navigate('/login');
                return res.json();
            })
            .then(setNotes)
            .catch(() => navigate('/login'));
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `/api/admin/notes/${editingId}` : '/api/admin/notes';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            setNotes(await (await fetch('/api/admin/notes')).json());
            setForm({
                id: '',
                title: '',
                slug: '',
                category: '',
                excerpt: '',
                read_time_minutes: 5,
                published_at: new Date().toISOString().split('T')[0],
            });
            setEditingId(null);
        }
    };

    const handleEdit = (note: any) => {
        setForm(note);
        setEditingId(note.id);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this note?')) return;
        const res = await fetch(`/api/admin/notes/${id}`, { method: 'DELETE' });
        if (res.ok) {
            setNotes(await (await fetch('/api/admin/notes')).json());
        }
    };

    return (
        <div className="p-8 bg-black text-cyan-300 min-h-screen">
            <h1 className="text-4xl mb-8">Shadow Fox Den</h1>

            {/* Note List */}
            <table className="w-full mb-12">
                <thead>
                <tr className="bg-gray-800">
                    <th className="p-3">Title</th>
                    <th>Slug</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {notes.map(note => (
                    <tr key={note.id} className="border-b border-gray-700">
                        <td className="p-3">{note.title}</td>
                        <td>{note.slug}</td>
                        <td>{note.category}</td>
                        <td>{note.published_at}</td>
                        <td>
                            <button onClick={() => handleEdit(note)} className="text-yellow-400 mr-2">Edit</button>
                            <button onClick={() => handleDelete(note.id)} className="text-red-400">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Add/Edit Form */}
            <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg">
                <h2 className="text-2xl mb-4">{editingId ? 'Edit Note' : 'New Note'}</h2>
                <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full mb-3 p-2 bg-gray-800 text-white" required />
                <input name="slug" value={form.slug} onChange={handleChange} placeholder="Slug" className="w-full mb-3 p-2 bg-gray-800 text-white" required />
                <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full mb-3 p-2 bg-gray-800 text-white" />
                <textarea name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="Excerpt" className="w-full mb-3 p-2 bg-gray-800 text-white" />
                <input name="read_time_minutes" type="number" value={form.read_time_minutes} onChange={handleChange} placeholder="Read time (minutes)" className="w-full mb-3 p-2 bg-gray-800 text-white" />
                <input name="published_at" type="date" value={form.published_at} onChange={handleChange} className="w-full mb-3 p-2 bg-gray-800 text-white" />
                <button type="submit" className="bg-cyan-600 px-6 py-3 rounded-lg">
                    {editingId ? 'Update' : 'Publish from the Shadows'}
                </button>
                {editingId && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditingId(null);
                            setForm({
                                id: '',
                                title: '',
                                slug: '',
                                category: '',
                                excerpt: '',
                                read_time_minutes: 5,
                                published_at: new Date().toISOString().split('T')[0],
                            });
                        }}
                        className="ml-4 text-gray-400"
                    >
                        Cancel
                    </button>
                )}
            </form>
        </div>
    );
};

export default Admin;