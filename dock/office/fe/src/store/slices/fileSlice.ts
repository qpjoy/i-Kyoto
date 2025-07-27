import { create, type StateCreator } from "zustand";
import { produce } from "immer";
import { immer } from "zustand/middleware/immer";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { createSelectors } from "@/utils/createSelectors";
import { api } from "@/store/variables"; // your API base

/* ---------- Types ---------- */

export interface FileItem {
  id: string; // uuid or generated key
  file: File;
  progress: number; // 0‑100
  status: "waiting" | "uploading" | "done" | "error";
  url?: string; // URL returned by backend
  error?: string; // error message
}

export enum Operation {
  PDF2WORD = "pdf-to-word",
  mergePDF = "merge-pdf"
}

export interface FileState {
  files: FileItem[];
  operation: Operation;
  setOperation: (operation: Operation) => void;

  addFiles: (newFiles: File[]) => void;
  removeFile: (id: string) => void;
  clearAll: () => void;

  pdf2word: (id: string) => Promise<void>;
  mergePDFs: (ids: string[]) => Promise<void>;

  // uploadAll: () => Promise<void>;
}

/* ---------- Slice ---------- */

const createFileSlice: StateCreator<FileState, [], [], FileState> = (set, get) => ({
  files: [],
  operation: Operation.PDF2WORD,

  setOperation: (operation) => {
    set({ operation });
  },

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

  pdf2word: async (id) => {
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
      const res = await fetch(`${api}/uploads/pdf2word`, {
        method: "POST",
        body: formData,
        credentials: "include"
      });
      console.log(`[file res]: `, res);

      if (!res.ok) throw new Error("转换出错，请联系管理员");
      // if (!res.ok) throw new Error(await res.text());

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

  mergePDFs: async (ids: string[]) => {
    const items = get().files.filter((f) => ids.includes(f.id));
    if (items.length < 2) return;

    // Mark all selected as uploading
    set(
      produce((state) => {
        for (const id of ids) {
          const file = state.files.find((f: any) => f.id === id);
          if (file) file.status = "uploading";
        }
      })
    );

    const formData = new FormData();
    for (const item of items) {
      formData.append("files", item.file); // assumes backend accepts multiple "files"
    }

    try {
      const res = await fetch(`${api}/uploads/merge-pdfs`, {
        method: "POST",
        body: formData,
        credentials: "include"
      });
      console.log(`[merge-pdfs res]:`, res);

      if (!res.ok) throw new Error("合并出错，请联系管理员");

      const blob = await res.blob(); // get response as Blob
      const url = window.URL.createObjectURL(blob); // create temp URL

      const a = document.createElement("a");
      a.href = url;
      a.download = "memoscard-merged.pdf"; // set desired file name
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);

      // set(
      //   produce((state) => {
      //     for (const id of ids) {
      //       const file = state.files.find((f: any) => f.id === id);
      //       if (file) {
      //         file.status = "done";
      //         file.progress = 100;
      //         file.url = data.url; // all files get same merged URL
      //       }
      //     }
      //   })
      // );
    } catch (err: any) {
      console.log(`[err mergePDFs]: `, err);
      // set(
      //   produce((state) => {
      //     for (const id of ids) {
      //       const file = state.files.find((f: any) => f.id === id);
      //       if (file) {
      //         file.status = "error";
      //         file.error = err.message;
      //       }
      //     }
      //   })
      // );
    }
  }

  // uploadAll: async () => {
  //   // sequential example; change to Promise.all for parallel
  //   // for (const f of get().files) {
  //   //   if (f.status === "waiting") {
  //   //     await get().uploadFile(f.id);
  //   //   }
  //   // }
  //   await Promise.resolve('');
  // }
});

/* ---------- Hook ---------- */

export const useFileStore = createSelectors(
  create<FileState>()(
    immer(
      devtools(subscribeWithSelector(createFileSlice), {
        name: "file-store",
        enabled: true // or false if you don’t want devtools
      })
      // devtools(subscribeWithSelector(persist(createFileSlice, { name: "file-store" })), {
      //   name: "file-store",
      //   enabled: true
      // })
    )
  )
);
