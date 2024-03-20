import {create} from 'zustand';
import {createJSONStorage, devtools, persist} from 'zustand/middleware';
import type {} from '@redux-devtools/extension';
import {immer} from 'zustand/middleware/immer';
import {Note} from "@/types";

interface NoteState {
    notes: Note[],
    addNote: (id: Note["id"], title: Note["title"], content: Note["content"], updatedAt: Note["updatedAt"]) => void,
    updateNote: (id: Note["id"], title: Note["title"], content: Note["content"], tags: Note["tags"], updatedAt?: Note["updatedAt"]) => void,
    deleteNote: (id: Note["id"]) => void,
}

export const useNoteStore = create(
    persist(
        immer<NoteState>(
            (set, get) => ({
                notes: [],
                addNote: (id, title, content, updatedAt) => set((state) => ({
                        notes: [
                            ...state.notes,
                            {
                                id,
                                title,
                                content,
                                createdAt: new Date().toISOString(),
                                updatedAt,
                            }
                        ],
                    })
                ),
                updateNote: (id, title, content, tags, updatedAt) => {
                    set((state) => {
                        const notes = [...state.notes];
                        const noteIndex = notes.findIndex((n) => {
                            return n.id === id;
                        });
                        const note = notes[noteIndex];
                        const updatedAt = new Date().toISOString();
                        notes.splice(
                            notes.findIndex((n) => {
                                return n.id === id;
                            }),
                            1,
                            {
                                ...note,
                                title,
                                content,
                                updatedAt,
                                tags: tags || []
                            });
                        return {notes};
                    });
                },
                deleteNote: (id) => set((state) => {
                    const notes = [...state.notes];
                    notes.splice(notes.findIndex((n)=>{
                        return n.id === id;
                    }), 1);
                    return {notes};
                }),
            })
        ),
        {
            name: 'notes-storage',
            storage: createJSONStorage(() => localStorage),
        },
    )
)
