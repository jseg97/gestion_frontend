import { Component, OnInit, Input } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-rich-text-input',
  templateUrl: './rich-text-input.component.html',
  styleUrls: ['./rich-text-input.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class RichTextInputComponent implements OnInit {

  @Input() formController: String = '';
  @Input() className: String = '';

  constructor() { }

  ngOnInit(): void {
  }

}
