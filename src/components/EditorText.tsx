"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";

type ProEditorProps = {
  value?: string;
  onChange?: (html: string) => void;
  editable?: boolean;
};

export function ProEditor({ value, onChange, editable = true }: ProEditorProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const extensions = useMemo(
    () => [
      StarterKit,
      TextStyle,
      Color,
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
    ],
    [],
  );

  const editor = useEditor({
    extensions,
    content: value || "",
    editable,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "max-w-none focus:outline-none min-h-[180px] leading-relaxed",
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  // Si `value` cambia desde afuera, sincronizamos el contenido del editor.
  useEffect(() => {
    if (!editor) return;
    const next = value ?? "";
    if (next !== editor.getHTML()) {
      editor.commands.setContent(next);
    }
  }, [editor, value]);

  const COLORS = [
    "#38bdf8", // sky-400
    "#60a5fa", // blue-400
    "#a78bfa", // purple-400
    "#f472b6", // pink-400
    "#fbbf24", // amber-400
    "#f87171", // red-400
    "#ffffff", // white
  ];

  if (!editor) return null;

  return (
    <div className="">
      <div className="border border-white/10 bg-white dark:bg-zinc-900 rounded-t-2xl overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 p-2 bg-black/5 dark:bg-white/5">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "font-bold text-blue-500" : ""}
          >
            Bold
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "italic text-blue-500" : ""}
          >
            Italic
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={
              editor.isActive("strike") ? "line-through text-blue-500" : ""
            }
          >
            Strike
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive("code") ? "text-blue-500" : ""}
          >
            Code
          </button>

          <div className="w-px h-6 bg-white/10 mx-1" />

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "text-blue-500" : ""
            }
          >
            H1
          </button>
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "text-blue-500" : ""
            }
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive("paragraph") ? "text-blue-500" : ""}
          >
            P
          </button>

          <div className="w-px h-6 bg-white/10 mx-1" />

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "text-blue-500" : ""}
          >
            • Lista
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "text-blue-500" : ""}
          >
            1. Lista
          </button>
          {/* <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "text-blue-500" : ""}
          >
            “ Quote
          </button> */}

          <div className="w-px h-6 bg-white/10 mx-1" />

          {/* <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
          >
            Undo
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
          >
            Redo
          </button> */}

          <div className="w-px h-6 bg-white/10 mx-1" />

          <div className="w-px h-6 bg-white/10 mx-1" />

          <div className="flex items-center gap-1">
            {COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => editor.chain().focus().setColor(c).run()}
                className="w-5 h-5 rounded-full border border-white/10"
                style={{ backgroundColor: c }}
                aria-label={`Color ${c}`}
              />
            ))}
            <button
              type="button"
              onClick={() => editor.chain().focus().unsetColor().run()}
              className="text-xs px-2 border border-white/10 rounded-md"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <div className="p-4  max-h-96 rounded-b-2xl overflow-auto bg-zinc-100 dark:bg-zinc-900">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

// export default function EditorText() {
//   const [html, setHtml] = useState<string>("<p>Escribe aquí…</p><p>");

//   return (
//     <div className="max-w-7xl mx-auto p-6 space-y-4">
//       <h1 className="text-xl font-bold">Editor pro (TipTap)</h1>
//       <div className="">
//         <ProEditor value={html} onChange={setHtml} />
//       </div>
//     </div>
//   );
// }
