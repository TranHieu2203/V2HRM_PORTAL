import { ControlBase } from "./control-base";
import { EnumFormBaseContolType } from "./form.service";

export class Dropdown extends ControlBase<string> {
  override controlType = EnumFormBaseContolType.Dropdown;
}