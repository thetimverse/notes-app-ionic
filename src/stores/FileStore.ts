import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';
import {Note} from "@/types";
import pull from "lodash/pull";

interface NoteState {
    notes: Note[],
    addNote: (id: Note["id"], title: Note["title"], content: Note["content"]) => void,
    updateNote: (id: Note["id"], title: Note["title"], content: Note["content"], tags: Note["tags"]) => void,
    deleteNote: (id: Note["id"]) => void,
    deleteTag: (tag: string) => void,
}

export const useNoteStore = create(
    persist(
        immer<NoteState>(
            (set) => ({
                notes: [],
                addNote: (id, title, content) => set((state) => ({
                        notes: [
                            ...state.notes,
                            {
                                id,
                                title,
                                content,
                                createdAt: new Date().toISOString(),
                                updatedAt: new Date().toISOString(),
                            }
                        ],
                    })
                ),
                updateNote: (id, title, content, tags) => {
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
                                id,
                                title,
                                content,
                                updatedAt,
                                tags: tags || [],
                            }
                        );
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
                deleteTag: (tag) => set((state) => {
                    const notes = [...state.notes];
                    notes.forEach((note) => {
                        return pull(note.tags, tag);
                    });
                })
            })
        ),
        {
            name: 'notes-storage',
            storage: createJSONStorage(() => localStorage),
        },
    )
)
