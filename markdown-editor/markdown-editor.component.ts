import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SecurityContext, SimpleChanges, ViewChild} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {marked} from 'marked';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.css'],
  standalone: false
})
export class MarkdownEditorComponent implements OnInit, OnChanges {
  @Input() value: string = '';
  @Input() placeholder: string = 'Énoncé de la question';
  @Output() valueChange = new EventEmitter<string>();
  @ViewChild('mdTextarea') textareaRef?: ElementRef<HTMLTextAreaElement>;

  content: string = '';
  activeTab: 'edit' | 'preview' = 'edit';
  previewHtml: SafeHtml = '';

  constructor(private readonly sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.content = this.value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && this.content !== changes['value'].currentValue) {
      this.content = changes['value'].currentValue ?? '';
    }
  }

  private async renderPreview(): Promise<void> {
    const raw = await marked.parse(this.content || '');
    const safe = this.sanitizer.sanitize(SecurityContext.HTML, raw) ?? '';
    this.previewHtml = this.sanitizer.bypassSecurityTrustHtml(safe);
  }

  onContentChange(): void {
    this.valueChange.emit(this.content);
    if (this.activeTab === 'preview') {
      this.renderPreview();
    }
  }

  setTab(tab: 'edit' | 'preview'): void {
    this.activeTab = tab;
    if (tab === 'preview') {
      this.renderPreview();
    }
  }

  insertFormat(prefix: string, suffix: string = ''): void {
    const ta = this.textareaRef?.nativeElement;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = this.content.substring(start, end);
    this.content = this.content.substring(0, start) + prefix + selected + suffix + this.content.substring(end);
    this.valueChange.emit(this.content);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    });
  }

  insertLinePrefix(prefix: string): void {
    const ta = this.textareaRef?.nativeElement;
    if (!ta) return;
    const pos = ta.selectionStart;
    const lineStart = this.content.lastIndexOf('\n', pos - 1) + 1;
    this.content = this.content.substring(0, lineStart) + prefix + this.content.substring(lineStart);
    this.valueChange.emit(this.content);
    setTimeout(() => {
      const newPos = lineStart + prefix.length;
      ta.focus();
      ta.setSelectionRange(newPos, newPos);
    });
  }

  insertCodeBlock(): void {
    const ta = this.textareaRef?.nativeElement;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = this.content.substring(start, end);
    const before = start > 0 && this.content[start - 1] !== '\n' ? '\n' : '';
    const block = before + '```\n' + selected + '\n```\n';
    this.content = this.content.substring(0, start) + block + this.content.substring(end);
    this.valueChange.emit(this.content);
    setTimeout(() => {
      const cursor = start + before.length + 4;
      ta.focus();
      ta.setSelectionRange(cursor, cursor + selected.length);
    });
  }
}
