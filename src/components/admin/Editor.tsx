"use client"

import { useCallback, useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Placeholder from "@tiptap/extension-placeholder"
import { cn } from "@/lib/utils"
import {
  Bold, Italic, Underline as UnderlineIcon, Heading2, Heading3,
  List, ListOrdered, Link, Pilcrow, Code, Quote,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"

interface EditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

function Editor({ value, onChange, placeholder }: EditorProps) {
  const [embedOpen, setEmbedOpen] = useState(false)
  const [embedUrl, setEmbedUrl] = useState("")

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Underline,
      Placeholder.configure({ placeholder: placeholder || "Tulis konten di sini..." }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[300px] px-4 py-3",
      },
    },
  })

  const handleEmbed = useCallback(() => {
    if (!embedUrl || !editor) return

    const url = embedUrl.trim()
    let iframeHtml = ""

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/)
      if (match) {
        iframeHtml = `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${match[1]}" frameborder="0" allowfullscreen></iframe>`
      }
    } else if (url.includes("canva.com")) {
      iframeHtml = `<iframe width="100%" height="400" src="${url}" frameborder="0" allowfullscreen></iframe>`
    } else {
      iframeHtml = `<iframe width="100%" height="400" src="${url}" frameborder="0" allowfullscreen></iframe>`
    }

    editor.chain().focus().insertContent(iframeHtml).run()
    setEmbedUrl("")
    setEmbedOpen(false)
  }, [editor, embedUrl])

  if (!editor) return null

  const ToolBtn = ({ onClick, active, children, label }: { onClick: () => void; active?: boolean; children: React.ReactNode; label: string }) => (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "rounded p-1.5 transition-colors",
        active ? "bg-primary-100 text-primary-700" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700",
      )}
    >
      {children}
    </button>
  )

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-200 bg-gray-50 px-2 py-1.5">
        <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} label="Bold">
          <Bold className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} label="Italic">
          <Italic className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} label="Underline">
          <UnderlineIcon className="h-4 w-4" />
        </ToolBtn>

        <span className="mx-1 h-5 w-px bg-gray-300" />

        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} label="Heading 2">
          <Heading2 className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} label="Heading 3">
          <Heading3 className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setParagraph().run()} active={editor.isActive("paragraph")} label="Paragraph">
          <Pilcrow className="h-4 w-4" />
        </ToolBtn>

        <span className="mx-1 h-5 w-px bg-gray-300" />

        <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} label="Bullet List">
          <List className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} label="Ordered List">
          <ListOrdered className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} label="Quote">
          <Quote className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} label="Code">
          <Code className="h-4 w-4" />
        </ToolBtn>

        <span className="mx-1 h-5 w-px bg-gray-300" />

        <ToolBtn onClick={() => {
          const url = window.prompt("Link URL:")
          if (url) editor.chain().focus().setLink({ href: url }).run()
        }} active={editor.isActive("link")} label="Link">
          <Link className="h-4 w-4" />
        </ToolBtn>

        <ToolBtn onClick={() => setEmbedOpen(true)} label="Embed">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8" />
            <path d="M12 17v4" />
          </svg>
        </ToolBtn>
      </div>

      <EditorContent editor={editor} />

      <Dialog open={embedOpen} onOpenChange={setEmbedOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Embed Media</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Tempel link Canva, YouTube, atau URL lainnya untuk diembed.
            </p>
            <Input
              value={embedUrl}
              onChange={(e) => setEmbedUrl(e.target.value)}
              placeholder="https://www.canva.com/design/..."
              autoFocus
            />
            <div className="flex justify-end gap-3">
              <Button type="button" variant="secondary" onClick={() => setEmbedOpen(false)}>Batal</Button>
              <Button type="button" onClick={handleEmbed} disabled={!embedUrl.trim()}>Embed</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { Editor }
