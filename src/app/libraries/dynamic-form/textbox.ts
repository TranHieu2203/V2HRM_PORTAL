import { EnumFormBaseContolType } from "./form.service";

import { ControlBase } from "./control-base";

export class Textbox extends ControlBase<string> {
  override controlType = EnumFormBaseContolType.Textbox;
}