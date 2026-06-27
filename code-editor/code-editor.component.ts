import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { basicSetup, EditorView } from 'codemirror';
import { EditorState, Extension } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { sql } from '@codemirror/lang-sql';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css'],
  standalone: false,
})
export class CodeEditorComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() value: string = '';
  @Input() language: string = 'javascript';
  @Input() readonly: boolean = false;
  @Output() valueChange = new EventEmitter<string>();

  @ViewChild('editorContainer') containerRef!: ElementRef<HTMLDivElement>;

  private editorView?: EditorView;

  ngAfterViewInit(): void {
    this.initEditor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['language'] && !changes['language'].firstChange) {
      this.destroyEditor();
      this.initEditor();
    } else if (changes['value'] && this.editorView) {
      const current = this.editorView.state.doc.toString();
      if (current !== changes['value'].currentValue) {
        this.editorView.dispatch({
          changes: { from: 0, to: current.length, insert: changes['value'].currentValue ?? '' },
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.destroyEditor();
  }

  private initEditor(): void {
    if (!this.containerRef) return;
    const extensions: Extension[] = [
      basicSetup,
      this.getLanguageExtension(),
      EditorView.updateListener.of((update) => {
        if (update.docChanged && !this.readonly) {
          this.valueChange.emit(update.state.doc.toString());
        }
      }),
    ];
    if (this.readonly) {
      extensions.push(EditorState.readOnly.of(true));
    }
    this.editorView = new EditorView({
      state: EditorState.create({ doc: this.value ?? '', extensions }),
      parent: this.containerRef.nativeElement,
    });
  }

  private destroyEditor(): void {
    this.editorView?.destroy();
    this.editorView = undefined;
  }

  private getLanguageExtension(): Extension {
    switch (this.language?.toLowerCase()) {
      case 'typescript': return javascript({ typescript: true });
      case 'python':     return python();
      case 'sql':        return sql();
      case 'java':       return java();
      case 'cpp':
      case 'c':          return cpp();
      case 'html':       return html();
      case 'css':        return css();
      case 'javascript':
      default:           return javascript();
    }
  }
}
