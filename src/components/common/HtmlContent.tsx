 import React, { useState } from 'react';
 import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
 } from '@/components/ui/dialog';
 import { Button } from '@/components/ui/button';
 
 interface HtmlContentProps {
   content: string;
   maxLength?: number;
   className?: string;
   dialogTitle?: string;
 }
 
 // Strips HTML tags and returns plain text
 function stripHtml(html: string): string {
   const doc = new DOMParser().parseFromString(html, 'text/html');
   return doc.body.textContent || '';
 }
 
 // Checks if content contains HTML tags
 function containsHtml(text: string): boolean {
   return /<[^>]+>/i.test(text);
 }
 
 export function HtmlContent({
   content,
   maxLength = 150,
   className = '',
   dialogTitle = 'Details',
 }: HtmlContentProps) {
   const [isOpen, setIsOpen] = useState(false);
 
   if (!content) return null;
 
   const isHtml = containsHtml(content);
   const plainText = isHtml ? stripHtml(content) : content;
   const needsTruncation = plainText.length > maxLength;
   const truncatedText = needsTruncation 
     ? plainText.substring(0, maxLength).trim() + '...' 
     : plainText;
 
   return (
     <>
       <div className={className}>
         <span>{truncatedText}</span>
         {needsTruncation && (
           <Button
             variant="link"
             size="sm"
             onClick={() => setIsOpen(true)}
             className="text-primary p-0 h-auto ml-1 font-medium"
           >
             Read more
           </Button>
         )}
       </div>
 
       <Dialog open={isOpen} onOpenChange={setIsOpen}>
         <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
           <DialogHeader>
             <DialogTitle>{dialogTitle}</DialogTitle>
           </DialogHeader>
           <div 
             className="prose prose-sm max-w-none dark:prose-invert"
             dangerouslySetInnerHTML={{ __html: isHtml ? content : `<p>${content}</p>` }}
           />
         </DialogContent>
       </Dialog>
     </>
   );
 }
 
 // Simpler version for rendering HTML without truncation
 export function RenderHtml({
   content,
   className = '',
 }: {
   content: string;
   className?: string;
 }) {
   if (!content) return null;
 
   const isHtml = containsHtml(content);
   
   if (!isHtml) {
     return <span className={className}>{content}</span>;
   }
 
   return (
     <div 
       className={`prose prose-sm max-w-none dark:prose-invert ${className}`}
       dangerouslySetInnerHTML={{ __html: content }}
     />
   );
 }