import { create, type StateCreator } from "zustand";
import { produce } from "immer";
import { immer } from "zustand/middleware/immer";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { createSelectors } from "@/utils/createSelectors";
import { url } from "@/store/variables"; // your API base

/* ---------- Types ---------- */

export interface FileItem {
  id: string; // uuid or generated key
  file: File;
  progress: number; // 0‑100
  status: "waiting" | "uploading" | "done" | "error";
  url?: string; // URL returned by backend
  error?: string; // error message
}

export interface FileState {
  files: FileItem[];

  addFiles: (newFiles: File[]) => void;
  removeFile: (id: string) => void;
  clearAll: () => void;

  uploadFile: (id: string) => Promise<void>;
  uploadAll: () => Promise<void>;
}

/* ---------- Slice ---------- */

const createFileSlice: StateCreator<FileState, [], [], FileState> = (set, get) => ({
  files: [],

  /* ---------- Mutators ---------- */

  addFiles: (newFiles) => {
    set(
      produce((state) => {
        newFiles.forEach((f) =>
          state.files.push({
            id: crypto.randomUUID(),
            file: f,
            progress: 0,
            status: "waiting"
          })
        );
      })
    );
  },

  removeFile: (id) => {
    set(
      produce((state) => {
        state.files = state.files.filter((f: any) => f.id !== id);
      })
    );
  },

  clearAll: () => {
    set({ files: [] });
  },

  /* ---------- Upload logic ---------- */

  uploadFile: async (id) => {
    const item = get().files.find((f) => f.id === id);
    if (!item || item.status === "uploading") return;

    // mark as uploading
    set(
      produce((state) => {
        const it = state.files.find((f: any) => f.id === id);
        if (it) it.status = "uploading";
      })
    );

    const formData = new FormData();
    formData.append("file", item.file);

    try {
      const res = await fetch(`${url}/uploads`, {
        method: "POST",
        body: formData,
        credentials: "include"
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json(); // adjust to your backend response
      set(
        produce((state) => {
          const it = state.files.find((f: any) => f.id === id);
          if (it) {
            it.status = "done";
            it.progress = 100;
            it.url = data.url; // e.g. returned uploaded URL
          }
        })
      );
    } catch (err: any) {
      set(
        produce((state) => {
          const it = state.files.find((f: any) => f.id === id);
          if (it) {
            it.status = "error";
            it.error = err.message;
          }
        })
      );
    }
  },

  uploadAll: async () => {
    // sequential example; change to Promise.all for parallel
    for (const f of get().files) {
      if (f.status === "waiting") {
        await get().uploadFile(f.id);
      }
    }
  }
});

/* ---------- Hook ---------- */

export const useFileStore = createSelectors(
  create<FileState>()(
    immer(
      devtools(subscribeWithSelector(persist(createFileSlice, { name: "file-store" })), {
        name: "file-store",
        enabled: true
      })
    )
  )
);
