import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Heading1,
  Heading2,
  Heading3,
  Minus,
  Code,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

function MenuBar({ editor }: { editor: Editor | null }) {
  const [linkUrl, setLinkUrl] = useState('');
  const [linkOpen, setLinkOpen] = useState(false);

  if (!editor) return null;

  const addLink = () => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: linkUrl })
        .run();
      setLinkUrl('');
      setLinkOpen(false);
    }
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
    setLinkOpen(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-border bg-muted/30 p-2 rounded-t-md">
      {/* Text formatting */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn('h-8 w-8', editor.isActive('bold') && 'bg-muted')}
        onClick={() => editor.chain().focus().toggleBold().run()}
        title="Bold"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn('h-8 w-8', editor.isActive('italic') && 'bg-muted')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        title="Italic"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn('h-8 w-8', editor.isActive('code') && 'bg-muted')}
        onClick={() => editor.chain().focus().toggleCode().run()}
        title="Inline Code"
      >
        <Code className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-border mx-1" />

      {/* Headings */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn('h-8 w-8', editor.isActive('heading', { level: 1 }) && 'bg-muted')}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        title="Heading 1"
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn('h-8 w-8', editor.isActive('heading', { level: 2 }) && 'bg-muted')}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        title="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn('h-8 w-8', editor.isActive('heading', { level: 3 }) && 'bg-muted')}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        title="Heading 3"
      >
        <Heading3 className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-border mx-1" />

      {/* Lists */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn('h-8 w-8', editor.isActive('bulletList') && 'bg-muted')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        title="Bullet List"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn('h-8 w-8', editor.isActive('orderedList') && 'bg-muted')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        title="Numbered List"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-border mx-1" />

      {/* Block elements */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn('h-8 w-8', editor.isActive('blockquote') && 'bg-muted')}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        title="Quote"
      >
        <Quote className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title="Horizontal Rule"
      >
        <Minus className="h-4 w-4" />
      </Button>

      {/* Link */}
      <Popover open={linkOpen} onOpenChange={setLinkOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn('h-8 w-8', editor.isActive('link') && 'bg-muted')}
            title="Add Link"
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-3">
          <div className="space-y-3">
            <Input
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addLink();
                }
              }}
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={addLink}>
                Add Link
              </Button>
              {editor.isActive('link') && (
                <Button size="sm" variant="destructive" onClick={removeLink}>
                  Remove
                </Button>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <div className="flex-1" />

      {/* Undo/Redo */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo"
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo"
      >
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Start writing...',
  className,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm dark:prose-invert max-w-none min-h-[150px] p-3 focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync external value changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div
      className={cn(
        'rounded-md border border-input bg-background ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
        className
      )}
    >
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
