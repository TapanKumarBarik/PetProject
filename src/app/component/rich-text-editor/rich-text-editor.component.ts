import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.css'],
  imports: [],
})
export class RichTextEditorComponent {
  content: string = '';

  // Format the selected text
  format(command: string, value: any = null) {
    document.execCommand(command, false, value);
    this.updateToolbarState();
  }

  // Update the active state of toolbar buttons
  updateToolbarState() {
    const commands = ['bold', 'italic', 'underline'];
    commands.forEach((command) => {
      const button = document.getElementById(`${command}-btn`);
      if (document.queryCommandState(command)) {
        button?.classList.add('active');
      } else {
        button?.classList.remove('active');
      }
    });
  }

  // Set Font Family
  setFontFamily(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.format('fontName', target.value);
  }

  // Set Font Size
  setFontSize(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.format('fontSize', target.value);
  }

  // Set Text Color
  setTextColor(event: Event) {
    const target = event.target as HTMLInputElement;
    this.format('foreColor', target.value);
  }

  // Insert Image
  insertImage() {
    const url = prompt('Enter image URL');
    if (url) {
      this.format('insertImage', url);
    }
  }

  onInput() {
    // Trigger save function or process content
    this.updateToolbarState();
  }
  // Call onInput whenever user makes changes in the editor
  ngAfterViewInit() {
    const editor = document.querySelector('.editor');
    editor?.addEventListener('keyup', () => this.onInput());
    editor?.addEventListener('mouseup', () => this.onInput());
  }
}
